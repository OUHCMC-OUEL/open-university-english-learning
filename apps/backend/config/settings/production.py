from .base import *

DEBUG = False
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True
ALLOWED_HOSTS = [
    'juniort.pythonanywhere.com',
    '127.0.0.1',
    'localhost'
]
INTERNAL_IPS = ['127.0.0.1']
CORS_ALLOWED_ORIGINS = [
    'https://ouel-vite.vercel.app',
    'http://127.0.0.1:8000',
    'http://localhost:8000'
]

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": os.getenv('DB_NAME'),
        "USER": os.getenv('DB_USER'),
        "PASSWORD": os.getenv('DB_PASSWORD'),
        "HOST": os.getenv('DB_HOST'),
        'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
        },
    }
}

