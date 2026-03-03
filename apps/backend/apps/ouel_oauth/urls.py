from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.contrib.auth.views import LogoutView
from apps.ouel_oauth import views

r = DefaultRouter()
r.register("users", views.UserView, "users")
r.register("user", views.UserFollowView, "user")

urlpatterns = [
    path("", include(r.urls)),
    path("allauth/", include("allauth.urls")),
    path("logout", LogoutView.as_view()),
]
