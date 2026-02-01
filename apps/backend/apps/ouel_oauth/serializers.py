from django.db import transaction
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import User, Profile, LoginHistory, Hobby
from .managers import ProfileManager

class LoginHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = LoginHistory
        fields = ['login_date','description']
        read_only_fields = ['login_date', 'description']

class ProfileSerializer(serializers.ModelSerializer):
    hobbies = serializers.SlugRelatedField(
        many=True,
        slug_field='name',
        queryset=Hobby.objects.all()
    )

    def update(self, user, validated_data):
        profile_keys = {'biography', 'about', 'level', 'hobbies'}
        ProfileManager.update_profile(user=user, profile_keys=profile_keys, **validated_data)
        return user

    class Meta:
        model = Profile
        fields = ['biography','about','level','hobbies']

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.avatar:
            data['avatar'] = instance.avatar.url
        if instance.login_history:
            history = instance.login_history.all()[:5]
            data['profile']['login_history'] = LoginHistorySerializer(history, many=True).data

        return data

    def create(self, validated_data):
        try:
            with transaction.atomic():
                user = User(**validated_data)
                user.set_password(user.password)
                user.save()
                ProfileManager.create_profile(user=user)
                return user
        except:
            raise ValidationError({"detail": "Có lỗi trong việc tạo người dùng"})

    def update(self, instance, validated_data):
        keys = set(validated_data.keys())
        if keys - {'first_name', 'last_name', 'email', 'avatar'}:
            raise ValidationError({'error': 'Chỉnh sửa không hợp lệ'})

        return super().update(instance, validated_data)

    class Meta:
        model = User
        fields = ['first_name', 'last_name','email','username', 'password', 'avatar', 'profile']
        extra_kwargs = {
            "password":{
                "write_only": True
            },
        }
