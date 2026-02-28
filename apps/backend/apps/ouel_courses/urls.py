from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

r = DefaultRouter()
r.register(r'courses', views.CourseViewSet, basename='courses')
r.register(r'posts', views.ForumPostViewSet, basename='posts')
r.register(r'replies', views.ReplyViewSet, basename='replies')
r.register(r'lessons', views.LessonInteractionViewSet, basename='lessons')

urlpatterns = [
    path("", include(r.urls)),
]