import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", os.getenv("CONFIG_MODE"))

application = get_wsgi_application()