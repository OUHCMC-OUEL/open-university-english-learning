from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import User

class UserSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.avatar:
            data['avatar'] = instance.avatar.url

        return data

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(user.password)
        user.save()

        return user

    def update(self, instance, validated_data):
        keys = set(validated_data.keys())
        if keys - {'first_name', 'last_name', 'email', 'avatar'}:
            raise ValidationError({'error': 'Chỉnh sửa không hợp lệ'})

        return super().update(instance, validated_data)

    class Meta:
        model = User
        fields = ['first_name', 'last_name','email','username', 'password', 'avatar']
        extra_kwargs = {
            "password":{
                "write_only": True
            },
        }
