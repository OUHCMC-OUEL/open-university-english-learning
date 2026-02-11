from rest_framework import viewsets, generics, permissions, status, parsers
from rest_framework.decorators import action
from rest_framework.response import Response
from . import serializers
from django.db.models import Prefetch
from .models import User, LoginHistory


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
            "profile",
            "profile__hobbies",
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
        profile_fields = {"biography", "about", "level", "hobbies"}

        if request.method == "GET":
            user = self.get_queryset().filter(pk=user.pk).first()

        if request.method.__eq__("PATCH"):
            user_data = {k: v for k, v in request.data.items() if k in user_fields}
            profile_data = {
                k: v for k, v in request.data.items() if k in profile_fields
            }

            s = serializers.UserSerializer(user, data=user_data, partial=True)
            s.is_valid(raise_exception=True)
            s.save()

            if profile_data:
                p = serializers.ProfileSerializer(user, data=profile_data, partial=True)
                p.is_valid(raise_exception=True)
                p.save()

        return Response(
            serializers.UserSerializer(user).data, status=status.HTTP_200_OK
        )
