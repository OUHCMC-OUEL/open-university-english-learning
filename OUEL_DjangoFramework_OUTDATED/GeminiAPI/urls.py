from django.urls import path, include
from rest_framework.routers import DefaultRouter
from GeminiAPI import views
from GeminiAPI.services import GeminiApp

r = DefaultRouter()
# r.register('apps', views.OUELAppView, basename='Apps')
# r.register('prompts', views.PromptView, basename='Prompt')


urlpatterns = [
    path('', include(r.urls)),
    path('geminiAPICall/', GeminiApp.GeminiContentAPI().as_view(), name='generate_content'),
]