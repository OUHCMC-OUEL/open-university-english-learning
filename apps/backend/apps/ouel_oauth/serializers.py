from django.db import transaction
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import User, StudentProfile, InstructorProfile, LoginHistory, Hobby, RoleEnum
from .managers import ProfileManager
from . import selectors

class LoginHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = LoginHistory
        fields = ["login_date", "description", "ip_address", "user_agent"]
        read_only_fields = ["login_date"]


class ProfileSerializer(serializers.ModelSerializer):
    def update(self, user, validated_data):
        if user.role == RoleEnum.STUDENT:
            profile_keys = {"biography", "about", "goal", "interests", "proficiency"}
        else:
            profile_keys = {"biography", "about", "title", "experience"}

        ProfileManager.update_profile(
            user=user, profile_keys=profile_keys, **validated_data
        )
        return user

class StudentProfileSerializer(ProfileSerializer):
    hobbies = serializers.SlugRelatedField(
        source='interests',
        many=True,
        slug_field="name",
        queryset=Hobby.objects.all(),
        required=False
    )

    class Meta:
        model = StudentProfile
        fields = ["proficiency", "goal", "hobbies", "biography", "about"]

class InstructorProfileSerializer(ProfileSerializer):
    class Meta:
        model = InstructorProfile
        fields = ["title", "experience", "biography", "about"]

class UserSerializer(serializers.ModelSerializer):
    login_history = serializers.SerializerMethodField()
    followers_count = serializers.IntegerField(read_only=True)
    following_count = serializers.IntegerField(read_only=True)
    is_following = serializers.BooleanField(read_only=True)
    profile = serializers.DictField(read_only=True)

    def to_representation(self, instance):
        data = super().to_representation(instance)

        if instance.avatar:
            data["avatar"] = instance.avatar.url

        profile_data = None
        if instance.role == RoleEnum.STUDENT and hasattr(instance, 'studentprofile'):
            profile_data = StudentProfileSerializer(instance.studentprofile).data
        elif instance.role == RoleEnum.INSTRUCTOR and hasattr(instance, 'instructorprofile'):
            profile_data = InstructorProfileSerializer(instance.instructorprofile).data

        data['profile'] = profile_data

        if 'followers_count' not in data:
            stats = selectors.get_follow_stats(instance)
            data['followers_count'] = stats['followers_count']
            data['following_count'] = stats['following_count']

        return data

    def get_login_history(self, obj: User):
        history = getattr(obj, "prefetched_login_history", [])
        if not history:
            return LoginHistorySerializer(obj.login_history.all().order_by('-login_date')[:5], many=True).data
        return LoginHistorySerializer(history, many=True).data

    @transaction.atomic
    def create(self, validated_data) -> User:
        try:
            with transaction.atomic():
                user = User(**validated_data)
                user.set_password(user.password)
                user.save()
                if user.role == RoleEnum.STUDENT:
                    ProfileManager.create_student_profile(user=user)
                elif user.role == RoleEnum.INSTRUCTOR:
                    ProfileManager.create_instructor_profile(user=user)
                return user
        except Exception as e:
            raise ValidationError({"detail": "Có lỗi trong việc tạo người dùng"})

    @transaction.atomic
    def update(self, instance, validated_data) -> User:
        keys = set(validated_data.keys())
        if keys - {"first_name", "last_name", "email", "avatar"}:
            raise ValidationError({"error": "Chỉnh sửa không hợp lệ"})

        return super().update(instance, validated_data)

    class Meta:
        model = User
        fields = [
            "id", "first_name", "last_name", "email", "username", "password",
            "avatar", "role", "social_provider",
            "profile", "login_history",
            "followers_count", "following_count", "is_following"
        ]
        extra_kwargs = {
            "password": {"write_only": True},
        }
