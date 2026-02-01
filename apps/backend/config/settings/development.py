from .base import *

DEBUG = True
CSRF_COOKIE_SECURE = False
SESSION_COOKIE_SECURE = False
ALLOWED_HOSTS = ['*']
INTERNAL_IPS = ['127.0.0.1']
CORS_ALLOWED_ORIGINS = ['http://127.0.0.1:8000', 'http://localhost:5173']

INSTALLED_APPS += [
    "debug_toolbar",
    "drf_yasg",
]

MIDDLEWARE += [
    "debug_toolbar.middleware.DebugToolbarMiddleware",
]

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": os.getenv('DB_NAME_DEV'),
        "USER": os.getenv('DB_USER_DEV'),
        "PASSWORD": os.getenv('DB_PASSWORD_DEV'),
        "HOST": os.getenv('DB_HOST_DEV')
    }
}
