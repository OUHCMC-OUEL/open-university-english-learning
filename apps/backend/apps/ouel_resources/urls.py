from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from . import views

r = DefaultRouter()
# r.register("users", views.UserView, "users")

urlpatterns = [
    path('', include(r.urls)),
    re_path(r'^ckeditor/', include('ckeditor_uploader.urls')),
]
