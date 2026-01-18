import pymysql
from pathlib import Path
import cloudinary.api, os

BASE_DIR = Path(__file__).resolve().parent.parent
MEDIA_ROOT = '%s/media/' % BASE_DIR
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
CKEDITOR_UPLOAD_PATH = "images/ckeditors"

cloudinary.config(
  	cloud_name = os.getenv('CLOUDINARY_NAME'),
  	api_key = os.getenv('CLOUDINARY_API_KEY'),
  	api_secret = os.getenv('CLOUDINARY_API_SECRET')
)

SECRET_KEY = os.getenv('SECRET_KEY')
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "apps.ouel_gemini",
    "apps.ouel_oauth",
    "apps.ouel_quizapp",
    "apps.ouel_writingapp",
    "rest_framework",
    "oauth2_provider",
    "corsheaders",
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': ('oauth2_provider.contrib.rest_framework.OAuth2Authentication',)
}


MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

AUTH_USER_MODEL = 'ouel_oauth.User'
ROOT_URLCONF = "config.urls"
WSGI_APPLICATION = "config.wsgi.application"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

pymysql.version_info = (2, 2, 2, "final", 0)
pymysql.install_as_MySQLdb()

LANGUAGE_CODE = "en-us"
TIME_ZONE = "Asia/Ho_Chi_Minh"
USE_I18N = True
USE_TZ = True

STATIC_URL = "static/"
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

SILENCED_SYSTEM_CHECKS = ["ckeditor.W001"]