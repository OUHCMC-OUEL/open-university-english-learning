from rest_framework import viewsets, generics, permissions, status, parsers
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from . import serializers, services, selectors
from django.db.models import Prefetch
from .models import User, LoginHistory, RoleEnum


class UserView(viewsets.ViewSet, generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = serializers.UserSerializer
    parser_classes = [
        parsers.MultiPartParser,
        parsers.JSONParser,
        parsers.FormParser,
    ]

    def get_permissions(self):
        if self.action in ["create"]:
            return [permissions.AllowAny()]

        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        return User.objects.filter(is_active=True).prefetch_related(
            "studentprofile",
            "studentprofile__interests",
            "instructorprofile",
            Prefetch(
                "login_history",
                queryset=LoginHistory.objects.order_by("-login_date")[:5],
                to_attr="prefetched_login_history",
            ),
        )

    @action(
        methods=["get", "patch"],
        url_path="current-user",
        detail=False,
        permission_classes=[permissions.IsAuthenticated],
    )
    def get_current_user(self, request):
        user = request.user
        user_fields = {"first_name", "last_name", "email", "avatar"}
        student_profile_fields = {"biography", "about", "goal", "hobbies", "proficiency"}
        instructor_profile_fields = {"biography", "about", "title", "experience"}

        if request.method == "GET":
            user = self.get_queryset().filter(pk=user.pk).first()

        if request.method.__eq__("PATCH"):
            user_data = {k: v for k, v in request.data.items() if k in user_fields}

            s = serializers.UserSerializer(user, data=user_data, partial=True)
            s.is_valid(raise_exception=True)
            s.save()

            if user.role == RoleEnum.STUDENT:
                profile_data = {
                    k: v for k, v in request.data.items() if k in student_profile_fields
                }
                if profile_data:
                    p = serializers.StudentProfileSerializer(user, data=profile_data, partial=True)
                    p.is_valid(raise_exception=True)
                    p.save()

            elif user.role == RoleEnum.INSTRUCTOR:
                profile_data = {
                    k: v for k, v in request.data.items() if k in instructor_profile_fields
                }
                if profile_data:
                    p = serializers.InstructorProfileSerializer(user, data=profile_data, partial=True)
                    p.is_valid(raise_exception=True)
                    p.save()

        return Response(
            serializers.UserSerializer(user).data, status=status.HTTP_200_OK
        )

class UserFollowView(viewsets.ViewSet, generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = serializers.UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [
        parsers.JSONParser,
        parsers.FormParser,
    ]

    def get_queryset(self):
        return User.objects.filter(is_active=True).prefetch_related("following", "followers")

    @action(methods=['post'], detail=True, url_path='follow-user')
    def follow(self, request, pk=None):
        target_user = self.get_object()
        try:
            services.follow_user(user_source=request.user, user_target=target_user)
            return Response({"detail": f"Đã theo dõi {target_user.username}"}, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            return Response({"error": e.detail}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['post'], detail=True, url_path='unfollow-user')
    def unfollow(self, request, pk=None):
        target_user = self.get_object()
        services.unfollow_user(user_source=request.user, user_target=target_user)
        return Response({"detail": f"Đã hủy theo dõi {target_user.username}"}, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=True, url_path='followers')
    def followers(self, request, pk=None):
        user = self.get_object()
        followers_qs = selectors.get_followers(user)

        page = self.paginate_queryset(followers_qs)
        if page is not None:
            serializer = serializers.UserSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = serializers.UserSerializer(followers_qs, many=True)
        return Response(serializer.data)

    @action(methods=['get'], detail=True, url_path='following')
    def following(self, request, pk=None):
        user = self.get_object()
        following_qs = selectors.get_following(user)

        page = self.paginate_queryset(following_qs)
        if page is not None:
            serializer = serializers.UserSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = serializers.UserSerializer(following_qs, many=True)
        return Response(serializer.data)
