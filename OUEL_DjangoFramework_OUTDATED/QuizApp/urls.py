from django.urls import path, include
from rest_framework.routers import DefaultRouter
from QuizApp import views

router = DefaultRouter()
router.register('passages', views.PassageViewSet, basename='passage')
router.register('questions', views.QuestionViewSet, basename='question')

urlpatterns = [
    path('', include(router.urls)),
]