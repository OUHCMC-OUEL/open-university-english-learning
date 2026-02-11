from django.db import transaction
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import User, Profile, LoginHistory, Hobby
from .managers import ProfileManager


class LoginHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = LoginHistory
<<<<<<< HEAD
        fields = ["login_date", "description"]
        read_only_fields = ["login_date"]

=======
        fields = ['login_date','description']
        read_only_fields = ['login_date']
>>>>>>> e644c4a50a726e74720f3844f5a30c79a5583100

class ProfileSerializer(serializers.ModelSerializer):
    hobbies = serializers.SlugRelatedField(
        many=True, slug_field="name", queryset=Hobby.objects.all()
    )

    def update(self, user, validated_data):
        profile_keys = {"biography", "about", "level", "hobbies"}
        ProfileManager.update_profile(
            user=user, profile_keys=profile_keys, **validated_data
        )
        return user

    class Meta:
        model = Profile
        fields = ["biography", "about", "level", "hobbies"]


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)
    login_history = serializers.SerializerMethodField()

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.avatar:
            data["avatar"] = instance.avatar.url

        return data

    def get_login_history(self, obj: User):
        history = getattr(obj, "prefetched_login_history", [])
        if not history:
            return LoginHistorySerializer(obj.login_history.all()[:5], many=True).data
        return LoginHistorySerializer(history, many=True).data

    @transaction.atomic
    def create(self, validated_data) -> User:
        try:
            with transaction.atomic():
                user = User(**validated_data)
                user.set_password(user.password)
                user.save()
                ProfileManager.create_profile(user=user)
                return user
        except:
            raise ValidationError({"detail": "Có lỗi trong việc tạo người dùng"})

    @transaction.atomic
    def update(self, instance, validated_data) -> User:
        keys = set(validated_data.keys())
        if keys - {"first_name", "last_name", "email", "avatar"}:
            raise ValidationError({"error": "Chỉnh sửa không hợp lệ"})

        return super().update(instance, validated_data)

    class Meta:
        model = User
<<<<<<< HEAD
        fields = [
            "first_name",
            "last_name",
            "email",
            "username",
            "password",
            "avatar",
            "profile",
            "login_history",
        ]
=======
        fields = ['first_name', 'last_name','email','username', 'password', 'avatar', 'profile', 'login_history']
>>>>>>> e644c4a50a726e74720f3844f5a30c79a5583100
        extra_kwargs = {
            "password": {"write_only": True},
        }
