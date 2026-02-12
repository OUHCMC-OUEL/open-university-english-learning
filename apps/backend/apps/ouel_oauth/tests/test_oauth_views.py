import pytest
from unittest.mock import patch
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate
from model_bakery import baker
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError
from apps.ouel_oauth.views import UserView, UserFollowView
from apps.ouel_oauth.models import (
    StudentProfile, InstructorProfile, Hobby, LoginHistory, RoleEnum
)

User = get_user_model()
pytestmark = pytest.mark.django_db


@pytest.fixture
def factory():
    return APIRequestFactory()

class TestUserView:
    def test_register_student_user(self, factory):
        view = UserView.as_view({"post": "create"})
        data = {
            "username": "new_student",
            "password": "password123",
            "email": "student@ou.edu.vn",
            "first_name": "Nguyen",
            "last_name": "Van A",
            "role": RoleEnum.STUDENT
        }
        request = factory.post("/users/", data, format="json")
        response = view(request)

        assert response.status_code == status.HTTP_201_CREATED
        user = User.objects.get(username="new_student")
        assert StudentProfile.objects.filter(user=user).exists()
        assert not InstructorProfile.objects.filter(user=user).exists()

    def test_get_current_user_success(self, factory):
        user = baker.make(User, username="tester", role=RoleEnum.STUDENT)
        baker.make(StudentProfile, user=user)
        baker.make(LoginHistory, user=user, _quantity=10)

        view = UserView.as_view({"get": "get_current_user"})
        request = factory.get("/users/current-user/")
        force_authenticate(request, user=user)

        response = view(request)

        assert response.status_code == status.HTTP_200_OK
        assert response.data["username"] == "tester"
        assert len(response.data["login_history"]) <= 5
        assert "proficiency" in response.data["profile"]

    def test_patch_student_profile_fields(self, factory):
        user = baker.make(User, role=RoleEnum.STUDENT)
        profile = baker.make(StudentProfile, user=user)
        baker.make(Hobby, name="Coding")

        view = UserView.as_view({"patch": "get_current_user"})
        data = {
            "first_name": "New Name",
            "biography": "New Bio",
            "hobbies": ["Coding"]
        }
        request = factory.patch("/users/current-user/", data, format="json")
        force_authenticate(request, user=user)
        response = view(request)

        assert response.status_code == status.HTTP_200_OK

        user.refresh_from_db()
        profile.refresh_from_db()

        assert user.first_name == "New Name"
        assert profile.biography == "New Bio"
        assert profile.interests.filter(name="Coding").exists()

    def test_patch_instructor_profile_fields(self, factory):
        user = baker.make(User, role=RoleEnum.INSTRUCTOR)
        profile = baker.make(InstructorProfile, user=user)

        view = UserView.as_view({"patch": "get_current_user"})
        data = {
            "first_name": "Dr. Tuan",
            "title": "Professor",
            "experience": "20 years"
        }
        request = factory.patch("/users/current-user/", data, format="json")
        force_authenticate(request, user=user)
        response = view(request)

        assert response.status_code == status.HTTP_200_OK

        profile.refresh_from_db()
        assert profile.title == "Professor"
        assert profile.experience == "20 years"

    def test_patch_ignore_restricted_fields(self, factory):
        user = baker.make(User, username="original", is_superuser=False)
        baker.make(StudentProfile, user=user)

        view = UserView.as_view({"patch": "get_current_user"})
        data = {
            "username": "hacker",
            "is_superuser": True
        }
        request = factory.patch("/users/current-user/", data, format="json")
        force_authenticate(request, user=user)
        view(request)

        user.refresh_from_db()
        assert user.username == "original"
        assert user.is_superuser is False

class TestUserFollowView:
    @patch("apps.ouel_oauth.services.follow_user")
    def test_follow_user_success(self, mock_service_follow, factory):
        source_user = baker.make(User)
        target_user = baker.make(User)

        view = UserFollowView.as_view({"post": "follow"})
        request = factory.post(f"/users/{target_user.pk}/follow/")
        force_authenticate(request, user=source_user)

        response = view(request, pk=target_user.pk)

        assert response.status_code == status.HTTP_201_CREATED
        assert "Đã theo dõi" in response.data["detail"]
        mock_service_follow.assert_called_once_with(user_source=source_user, user_target=target_user)

    @patch("apps.ouel_oauth.services.follow_user")
    def test_follow_user_validation_error(self, mock_service_follow, factory):
        user = baker.make(User)
        mock_service_follow.side_effect = ValidationError("Không thể tự follow")

        view = UserFollowView.as_view({"post": "follow"})
        request = factory.post(f"/users/{user.pk}/follow/")
        force_authenticate(request, user=user)

        response = view(request, pk=user.pk)

        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "error" in response.data

    @patch("apps.ouel_oauth.services.unfollow_user")
    def test_unfollow_user(self, mock_service_unfollow, factory):
        source = baker.make(User)
        target = baker.make(User)

        view = UserFollowView.as_view({"post": "unfollow"})
        request = factory.post(f"/users/{target.pk}/unfollow/")
        force_authenticate(request, user=source)

        response = view(request, pk=target.pk)

        assert response.status_code == status.HTTP_200_OK
        mock_service_unfollow.assert_called_once_with(user_source=source, user_target=target)

    def test_list_followers(self, factory):
        user = baker.make(User)
        follower_1 = baker.make(User)
        follower_2 = baker.make(User)

        with patch("apps.ouel_oauth.selectors.get_followers") as mock_get:
            mock_get.return_value = [follower_1, follower_2]

            view = UserFollowView.as_view({"get": "followers"})
            request = factory.get(f"/users/{user.pk}/followers/")
            force_authenticate(request, user=user)

            response = view(request, pk=user.pk)

            assert response.status_code == status.HTTP_200_OK
            data = response.data['results'] if 'results' in response.data else response.data
            assert len(data) == 2