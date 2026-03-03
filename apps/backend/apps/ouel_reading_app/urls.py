from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

r = DefaultRouter()
r.register("parts", views.PartViewSet, basename="part")
r.register("questions", views.QuestionViewSet, basename="question")
r.register("part-histories", views.PartHistoryViewSet, basename="part-history")

urlpatterns = [
    path("", include(r.urls)),
]
