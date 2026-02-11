import pytest
from unittest.mock import patch, MagicMock
from rest_framework.exceptions import ValidationError
from model_bakery import baker
from apps.ouel_oauth.models import User, Profile, LoginHistory, Hobby
<<<<<<< HEAD
from apps.ouel_oauth.serializers import (
    UserSerializer,
    ProfileSerializer,
    LoginHistorySerializer,
)

pytestmark = pytest.mark.django_db


=======
from apps.ouel_oauth.serializers import UserSerializer, ProfileSerializer, LoginHistorySerializer

pytestmark = pytest.mark.django_db

>>>>>>> e644c4a50a726e74720f3844f5a30c79a5583100
class TestLoginHistorySerializer:
    def test_serialization(self):
        history = baker.make(LoginHistory, description="Login via Google")
        serializer = LoginHistorySerializer(history)
        data = serializer.data
<<<<<<< HEAD

        assert "login_date" in data
        assert data["description"] == "Login via Google"

=======
        
        assert 'login_date' in data
        assert data['description'] == "Login via Google"
>>>>>>> e644c4a50a726e74720f3844f5a30c79a5583100

class TestProfileSerializer:
    def test_hobbies_slug_field(self):
        hobby = baker.make(Hobby, name="Coding")
        profile = baker.make(Profile)
        profile.hobbies.add(hobby)

        serializer = ProfileSerializer(profile)

<<<<<<< HEAD
        assert serializer.data["hobbies"] == ["Coding"]
=======
        assert serializer.data['hobbies'] == ['Coding']
>>>>>>> e644c4a50a726e74720f3844f5a30c79a5583100

    @patch("apps.ouel_oauth.serializers.ProfileManager.update_profile")
    def test_update_profile_calls_manager(self, mock_manager_update):
        user = baker.make(User)
        profile = baker.make(Profile, user=user)
        hobby = baker.make(Hobby, name="Reading")

<<<<<<< HEAD
        data = {"biography": "New Bio", "hobbies": ["Reading"]}

        serializer = ProfileSerializer(instance=profile, data=data, partial=True)
        assert serializer.is_valid(), serializer.errors

=======
        data = {
            "biography": "New Bio",
            "hobbies": ["Reading"] 
        }

        serializer = ProfileSerializer(instance=profile, data=data, partial=True)
        assert serializer.is_valid(), serializer.errors
        
>>>>>>> e644c4a50a726e74720f3844f5a30c79a5583100
        serializer.update(user, serializer.validated_data)

        mock_manager_update.assert_called_once()
        args, kwargs = mock_manager_update.call_args
<<<<<<< HEAD
        assert kwargs["user"] == user
        assert kwargs["biography"] == "New Bio"
        assert hobby in kwargs["hobbies"]

=======
        assert kwargs['user'] == user
        assert kwargs['biography'] == "New Bio"
        assert hobby in kwargs['hobbies']
>>>>>>> e644c4a50a726e74720f3844f5a30c79a5583100

class TestUserSerializer:
    @patch("apps.ouel_oauth.serializers.ProfileManager.create_profile")
    def test_create_user_path(self, mock_create_profile):
        data = {
            "username": "newuser",
            "email": "new@test.com",
            "password": "plain_password_123",
            "first_name": "New",
<<<<<<< HEAD
            "last_name": "User",
        }

=======
            "last_name": "User"
        }
        
>>>>>>> e644c4a50a726e74720f3844f5a30c79a5583100
        serializer = UserSerializer(data=data)
        assert serializer.is_valid()

        initial_count = User.objects.count()

        user = serializer.save()

        assert User.objects.count() == initial_count + 1
        assert user.username == "newuser"

        assert user.check_password("plain_password_123")
        assert user.password != "plain_password_123"

        mock_create_profile.assert_called_once_with(user=user)

    @patch("apps.ouel_oauth.serializers.User.save")
    def test_create_user_transaction_error(self, mock_save):
        mock_save.side_effect = Exception("DB Error")
<<<<<<< HEAD

        data = {"username": "failuser", "password": "123"}
=======
        
        data = {
            "username": "failuser",
            "password": "123"
        }
>>>>>>> e644c4a50a726e74720f3844f5a30c79a5583100
        serializer = UserSerializer(data=data)
        serializer.is_valid()

        with pytest.raises(ValidationError) as exc:
            serializer.save()
<<<<<<< HEAD

=======
        
>>>>>>> e644c4a50a726e74720f3844f5a30c79a5583100
        assert "Có lỗi trong việc tạo người dùng" in str(exc.value)

    def test_update_allowed_fields(self):
        user = baker.make(User, first_name="Old")
        data = {"first_name": "New"}
<<<<<<< HEAD

        serializer = UserSerializer(instance=user, data=data, partial=True)
        assert serializer.is_valid()
        updated_user = serializer.save()

=======
        
        serializer = UserSerializer(instance=user, data=data, partial=True)
        assert serializer.is_valid()
        updated_user = serializer.save()
        
>>>>>>> e644c4a50a726e74720f3844f5a30c79a5583100
        assert updated_user.first_name == "New"

    def test_update_restricted_fields(self):
        user = baker.make(User, username="old_name")
        data = {"username": "hacker_name"}
<<<<<<< HEAD

        serializer = UserSerializer(instance=user, data=data, partial=True)

        assert serializer.is_valid()

        with pytest.raises(ValidationError) as exc:
            serializer.save()

=======
        
        serializer = UserSerializer(instance=user, data=data, partial=True)
        
        assert serializer.is_valid()
        
        with pytest.raises(ValidationError) as exc:
            serializer.save()
            
>>>>>>> e644c4a50a726e74720f3844f5a30c79a5583100
        assert "Chỉnh sửa không hợp lệ" in str(exc.value)

    def test_to_representation_avatar(self):
        user = baker.make(User)

        mock_avatar = MagicMock()
        mock_avatar.url = "http://cloudinary.com/pic.jpg"
        user.avatar = mock_avatar

        serializer = UserSerializer(user)
        data = serializer.data

<<<<<<< HEAD
        assert data["avatar"] == "http://cloudinary.com/pic.jpg"
        assert "password" not in data
=======
        assert data['avatar'] == "http://cloudinary.com/pic.jpg"
        assert 'password' not in data  
>>>>>>> e644c4a50a726e74720f3844f5a30c79a5583100

    def test_get_login_history_limit(self):
        user = baker.make(User)

        baker.make(LoginHistory, user=user, _quantity=6)

        serializer = UserSerializer(user)
        data = serializer.data
<<<<<<< HEAD

        assert len(data["login_history"]) == 5
=======
        
        assert len(data['login_history']) == 5 
>>>>>>> e644c4a50a726e74720f3844f5a30c79a5583100

    def test_get_login_history_prefetched(self):
        user = baker.make(User)

        fake_history = [baker.make(LoginHistory, description="Prefetched")]
        user.prefetched_login_history = fake_history

        serializer = UserSerializer(user)
        data = serializer.data

<<<<<<< HEAD
        assert len(data["login_history"]) == 1
        assert data["login_history"][0]["description"] == "Prefetched"
=======
        assert len(data['login_history']) == 1
        assert data['login_history'][0]['description'] == "Prefetched"
>>>>>>> e644c4a50a726e74720f3844f5a30c79a5583100
