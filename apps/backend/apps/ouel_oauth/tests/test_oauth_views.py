import pytest
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate
from model_bakery import baker
from django.contrib.auth import get_user_model
from apps.ouel_oauth.views import UserView
from apps.ouel_oauth.models import Profile, Hobby, LoginHistory

User = get_user_model()
pytestmark = pytest.mark.django_db

@pytest.fixture
def factory():
    return APIRequestFactory()

class TestUserView:
    def test_register_user(self, factory):
        view = UserView.as_view({'post': 'create'})
        
        data = {
            "username": "new_student",
            "password": "password123",
            "email": "student@ou.edu.vn",
            "first_name": "Nguyen",
            "last_name": "Van A"
        }

        request = factory.post('/fake-url/', data, format='json')

        response = view(request)

        assert response.status_code == status.HTTP_201_CREATED
        assert User.objects.filter(username="new_student").exists()
        assert Profile.objects.filter(user__username="new_student").exists()

    def test_get_current_user_unauthenticated(self, factory):
        view = UserView.as_view({'get': 'get_current_user'})
        request = factory.get('/fake-url/')
        
        response = view(request)
        
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_get_current_user_success(self, factory):
        user = baker.make(User, username="tester")
        baker.make(Profile, user=user)
        baker.make(LoginHistory, user=user, _quantity=10)

        view = UserView.as_view({'get': 'get_current_user'})
        request = factory.get('/fake-url/')
        
        force_authenticate(request, user=user)
        
        response = view(request)

        assert response.status_code == status.HTTP_200_OK
        assert response.data['username'] == "tester"
        assert len(response.data['login_history']) <= 5

    def test_patch_current_user_separate_fields(self, factory):
        user = baker.make(User, first_name="Old Name")
        baker.make(Profile, user=user, biography="Old Bio")
        
        view = UserView.as_view({'patch': 'get_current_user'})
        
        data = {
            "first_name": "New Name",
            "biography": "New Bio",
            "about": "New About"
        }
        
        request = factory.patch('/fake-url/', data, format='json')
        force_authenticate(request, user=user)
        
        response = view(request)

        assert response.status_code == status.HTTP_200_OK
        
        user.refresh_from_db()
        assert user.first_name == "New Name"
        assert user.profile.biography == "New Bio"

    def test_patch_ignore_restricted_fields(self, factory):
        user = baker.make(User, username="original_user", is_superuser=False)
        baker.make(Profile, user=user)
        
        view = UserView.as_view({'patch': 'get_current_user'})

        data = {
            "first_name": "Changed",
            "username": "hacker_user",
            "is_superuser": True
        }

        request = factory.patch('/fake-url/', data, format='json')
        force_authenticate(request, user=user)
        
        response = view(request)

        assert response.status_code == status.HTTP_200_OK
        
        user.refresh_from_db()
        assert user.first_name == "Changed"
        assert user.username == "original_user"
        assert user.is_superuser is False

    def test_patch_update_hobbies(self, factory):
        user = baker.make(User)
        profile = baker.make(Profile, user=user)
        h1 = baker.make(Hobby, name="Coding")
        h2 = baker.make(Hobby, name="Music")

        view = UserView.as_view({'patch': 'get_current_user'})

        data = {"hobbies": ["Coding", "Music"]}

        request = factory.patch('/fake-url/', data, format='json')
        force_authenticate(request, user=user)
        
        response = view(request)

        assert response.status_code == status.HTTP_200_OK
        assert profile.hobbies.count() == 2