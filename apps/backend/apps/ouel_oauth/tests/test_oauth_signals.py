import pytest
from unittest.mock import MagicMock
from model_bakery import baker
from apps.ouel_oauth.models import User
from django.contrib.auth.signals import user_logged_in
from oauth2_provider.signals import app_authorized
from apps.ouel_oauth.models import LoginHistory
from apps.ouel_oauth.signals import get_client_ip

pytestmark = pytest.mark.django_db

<<<<<<< HEAD

class TestHelperFunctions:
    def test_get_client_ip_from_x_forwarded_for(self):
        request = MagicMock()
        request.META = {"HTTP_X_FORWARDED_FOR": "10.0.0.1, 192.168.1.1"}

        ip = get_client_ip(request)
        assert ip == "10.0.0.1"

    def test_get_client_ip_from_remote_addr(self):
        request = MagicMock()
        request.META = {"REMOTE_ADDR": "127.0.0.1"}

        ip = get_client_ip(request)
        assert ip == "127.0.0.1"


class TestSignals:

    def test_user_logged_in_signal(self):
        user = baker.make(User)
        request = MagicMock()
        request.META = {"REMOTE_ADDR": "8.8.8.8"}
=======
class TestHelperFunctions:
    def test_get_client_ip_from_x_forwarded_for(self):
        request = MagicMock()
        request.META = {'HTTP_X_FORWARDED_FOR': '10.0.0.1, 192.168.1.1'}
        
        ip = get_client_ip(request)
        assert ip == '10.0.0.1'

    def test_get_client_ip_from_remote_addr(self):
        request = MagicMock()
        request.META = {'REMOTE_ADDR': '127.0.0.1'}
        
        ip = get_client_ip(request)
        assert ip == '127.0.0.1'

class TestSignals:
   
    def test_user_logged_in_signal(self):
        user = baker.make(User)
        request = MagicMock()
        request.META = {'REMOTE_ADDR': '8.8.8.8'} 
>>>>>>> e644c4a50a726e74720f3844f5a30c79a5583100

        user_logged_in.send(sender=User, request=request, user=user)

        assert LoginHistory.objects.count() == 1
        history = LoginHistory.objects.first()
<<<<<<< HEAD

=======
        
>>>>>>> e644c4a50a726e74720f3844f5a30c79a5583100
        assert history.user == user
        assert "8.8.8.8" in history.description
        assert "Đăng nhập qua google" in history.description

    def test_app_authorized_signal(self):

        user = baker.make(User)
        request = MagicMock()
<<<<<<< HEAD

=======
        
>>>>>>> e644c4a50a726e74720f3844f5a30c79a5583100
        mock_token = MagicMock()
        mock_token.user = user

        app_authorized.send(sender=None, request=request, token=mock_token)

        assert LoginHistory.objects.count() == 1
        history = LoginHistory.objects.first()
<<<<<<< HEAD

        assert history.user == user
        assert "Đăng nhập qua mật khẩu o/token/" in history.description
=======
        
        assert history.user == user
        assert "Đăng nhập qua mật khẩu o/token/" in history.description
>>>>>>> e644c4a50a726e74720f3844f5a30c79a5583100
