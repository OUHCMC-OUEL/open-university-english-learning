import pytest
from unittest.mock import MagicMock, patch
from model_bakery import baker
from django.contrib.auth import get_user_model
from django.contrib.auth.signals import user_logged_in
from oauth2_provider.signals import app_authorized
from apps.ouel_oauth.models import LoginHistory
from apps.ouel_oauth.signals import get_client_ip, create_login_history

User = get_user_model()
pytestmark = pytest.mark.django_db


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

    def test_get_client_ip_none(self):
        request = MagicMock()
        request.META = {}
        ip = get_client_ip(request)
        assert ip is None

    def test_create_login_history_success(self):
        user = baker.make(User)
        data = {"description": "Test manual creation"}

        create_login_history(user, data)

        assert LoginHistory.objects.count() == 1
        history = LoginHistory.objects.first()
        assert history.user == user
        assert history.description == "Test manual creation"

    def test_create_login_history_validation_error(self):
        user = baker.make(User)

        with patch("apps.ouel_oauth.signals.LoginHistorySerializer") as MockSerializer:
            mock_instance = MockSerializer.return_value
            mock_instance.is_valid.side_effect = Exception("Validation Error")

            with pytest.raises(Exception) as exc:
                create_login_history(user, {})

            assert "Validation Error" in str(exc.value)


class TestSignals:
    def test_user_logged_in_signal(self):
        user = baker.make(User)
        request = MagicMock()
        request.META = {"REMOTE_ADDR": "8.8.8.8"}

        user_logged_in.send(sender=User, request=request, user=user)

        assert LoginHistory.objects.count() == 1
        history = LoginHistory.objects.first()

        assert history.user == user
        assert "8.8.8.8" in history.description
        assert "Đăng nhập qua google" in history.description

    def test_app_authorized_signal(self):
        user = baker.make(User)
        request = MagicMock()

        mock_token = MagicMock()
        mock_token.user = user

        app_authorized.send(sender=None, request=request, token=mock_token)

        assert LoginHistory.objects.count() == 1
        history = LoginHistory.objects.first()

        assert history.user == user
        assert "Đăng nhập qua mật khẩu o/token/" in history.description