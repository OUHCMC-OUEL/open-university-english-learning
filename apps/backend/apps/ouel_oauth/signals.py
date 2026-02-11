from django.contrib.auth.signals import user_logged_in
from oauth2_provider.signals import app_authorized
from django.dispatch import receiver
from .serializers import LoginHistorySerializer


def get_client_ip(request):
    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if x_forwarded_for:
        ip = x_forwarded_for.split(",")[0]
    else:
        ip = request.META.get("REMOTE_ADDR")
    return ip


def create_login_history(user, data):
    h = LoginHistorySerializer(data=data)
    h.is_valid(raise_exception=True)
    h.save(user=user)


@receiver(user_logged_in)
def log_user_login(sender, request, user, **kwargs):
    ip = get_client_ip(request)

    data = {
        "description": f"Đăng nhập qua google với IP: {ip}",
    }

    create_login_history(user, data)


@receiver(app_authorized)
def log_oauth_login(sender, request, token, **kwargs):
    user = token.user
    data = {
        "description": "Đăng nhập qua mật khẩu o/token/",
    }
    create_login_history(user, data)
