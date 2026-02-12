import pytest
from unittest.mock import patch, MagicMock
from rest_framework.exceptions import ValidationError
from model_bakery import baker
from apps.ouel_oauth.models import (
    User, StudentProfile, InstructorProfile, LoginHistory, Hobby, RoleEnum
)
from apps.ouel_oauth.serializers import (
    UserSerializer,
    StudentProfileSerializer,
    InstructorProfileSerializer,
    LoginHistorySerializer,
)

pytestmark = pytest.mark.django_db


class TestLoginHistorySerializer:
    def test_serialization(self):
        history = baker.make(LoginHistory, description="Login via Google")
        serializer = LoginHistorySerializer(history)
        data = serializer.data

        assert "login_date" in data
        assert data["description"] == "Login via Google"


class TestStudentProfileSerializer:
    def test_hobbies_slug_field(self):
        hobby = baker.make(Hobby, name="Coding")
        user = baker.make(User, role=RoleEnum.STUDENT)
        profile = baker.make(StudentProfile, user=user)
        profile.interests.add(hobby)

        serializer = StudentProfileSerializer(profile)
        data = serializer.data

        assert "Coding" in data["hobbies"]
        assert data["proficiency"] is not None

    @patch("apps.ouel_oauth.managers.ProfileManager.update_profile")
    def test_update_student_profile_calls_manager(self, mock_manager_update):
        user = baker.make(User, role=RoleEnum.STUDENT)
        profile = baker.make(StudentProfile, user=user)

        data = {"biography": "New Bio", "hobbies": ["Reading"]}

        baker.make(Hobby, name="Reading")

        serializer = StudentProfileSerializer(instance=profile, data=data, partial=True)
        assert serializer.is_valid(), serializer.errors

        serializer.update(user, serializer.validated_data)

        mock_manager_update.assert_called_once()
        args, kwargs = mock_manager_update.call_args

        assert kwargs["user"] == user
        assert kwargs["biography"] == "New Bio"
        assert "interests" in kwargs["profile_keys"]


class TestInstructorProfileSerializer:
    def test_serialization(self):
        user = baker.make(User, role=RoleEnum.INSTRUCTOR)
        profile = baker.make(InstructorProfile, user=user, title="Dr.", experience="10 years")

        serializer = InstructorProfileSerializer(profile)
        data = serializer.data

        assert data["title"] == "Dr."
        assert data["experience"] == "10 years"
        assert "hobbies" not in data


class TestUserSerializer:
    @patch("apps.ouel_oauth.managers.ProfileManager.create_student_profile")
    def test_create_student_user(self, mock_create_student_profile):
        initial_count = User.objects.count()
        data = {
            "username": "student_user",
            "email": "student@test.com",
            "password": "plain_password_123",
            "first_name": "New",
            "last_name": "User",
            "role": RoleEnum.STUDENT
        }

        serializer = UserSerializer(data=data)
        assert serializer.is_valid(), serializer.errors

        user = serializer.save()

        assert User.objects.count() == initial_count + 1
        assert user.role == RoleEnum.STUDENT
        assert user.check_password("plain_password_123")

        mock_create_student_profile.assert_called_once_with(user=user)

    @patch("apps.ouel_oauth.managers.ProfileManager.create_instructor_profile")
    def test_create_instructor_user(self, mock_create_instructor_profile):
        data = {
            "username": "instructor_user",
            "email": "teacher@test.com",
            "password": "password",
            "role": RoleEnum.INSTRUCTOR
        }
        serializer = UserSerializer(data=data)
        serializer.is_valid()
        user = serializer.save()

        assert user.role == RoleEnum.INSTRUCTOR
        mock_create_instructor_profile.assert_called_once_with(user=user)

    def test_create_user_transaction_error(self):
        data = {"username": "failuser", "password": "123"}

        with patch("apps.ouel_oauth.models.User.save", side_effect=Exception("DB Error")):
            serializer = UserSerializer(data=data)
            serializer.is_valid()

            with pytest.raises(ValidationError) as exc:
                serializer.save()

            assert "Có lỗi trong việc tạo người dùng" in str(exc.value)

    def test_update_allowed_fields(self):
        user = baker.make(User, first_name="Old")
        data = {"first_name": "New"}

        serializer = UserSerializer(instance=user, data=data, partial=True)
        assert serializer.is_valid()
        updated_user = serializer.save()

        assert updated_user.first_name == "New"

    def test_update_restricted_fields(self):
        user = baker.make(User, username="old_name", role=RoleEnum.STUDENT)
        data = {"username": "hacker_name"}

        serializer = UserSerializer(instance=user, data=data, partial=True)
        assert serializer.is_valid()

        with pytest.raises(ValidationError) as exc:
            serializer.update(user, {"username": "hacker"})

        assert "Chỉnh sửa không hợp lệ" in str(exc.value)

    def test_to_representation_avatar(self):
        user = baker.make(User)
        mock_avatar = MagicMock()
        mock_avatar.url = "http://cloudinary.com/pic.jpg"
        user.avatar = mock_avatar

        serializer = UserSerializer(user)
        data = serializer.data

        assert data["avatar"] == "http://cloudinary.com/pic.jpg"
        assert "password" not in data

    def test_to_representation_profile_data(self):
        student = baker.make(User, role=RoleEnum.STUDENT)
        baker.make(StudentProfile, user=student, proficiency="A1")
        data_s = UserSerializer(student).data
        assert "proficiency" in data_s["profile"]

        instructor = baker.make(User, role=RoleEnum.INSTRUCTOR)
        baker.make(InstructorProfile, user=instructor, title="PhD")
        data_i = UserSerializer(instructor).data
        assert "title" in data_i["profile"]
        assert data_i["profile"]["title"] == "PhD"

    def test_get_login_history_limit(self):
        user = baker.make(User)
        baker.make(LoginHistory, user=user, _quantity=6)

        serializer = UserSerializer(user)
        data = serializer.data

        assert len(data["login_history"]) == 5

    def test_get_login_history_prefetched(self):
        user = baker.make(User)
        fake_history = [baker.make(LoginHistory, description="Prefetched")]
        user.prefetched_login_history = fake_history

        serializer = UserSerializer(user)
        data = serializer.data

        assert len(data["login_history"]) == 1
        assert data["login_history"][0]["description"] == "Prefetched"