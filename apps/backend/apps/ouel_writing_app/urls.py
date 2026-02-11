from django.urls import path, include
from rest_framework.routers import DefaultRouter

r = DefaultRouter()

urlpatterns = [
    path("", include(r.urls)),
]
