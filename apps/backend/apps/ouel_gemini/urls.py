from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
r = DefaultRouter()

r.register('writing-app', views.WritingAppView, basename='writing-app')
r.register('reading-app', views.ReadingAppView, basename='reading-app')

urlpatterns = [
    path('', include(r.urls)),
]
