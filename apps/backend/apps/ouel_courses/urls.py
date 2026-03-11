from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

r = DefaultRouter()
r.register(r'courses', views.CourseViewSet, basename='courses')
r.register(r'subjects', views.SubjectViewSet, basename='subjects')
r.register(r'enrollments', views.EnrollmentViewSet, basename='enrollments')
r.register(r'lesson-attempt', views.LessonAttemptViewSet, basename='lesson-attempt')
r.register(r'posts', views.ForumPostViewSet, basename='posts')
r.register(r'replies', views.ReplyViewSet, basename='replies')
r.register(r'lessons', views.LessonInteractionViewSet, basename='lessons')

urlpatterns = [
    path("", include(r.urls)),
]