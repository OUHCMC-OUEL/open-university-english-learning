from rest_framework import viewsets, generics
from GeminiAPI import serializers, paginations
from GeminiAPI.models import OUELApp, Prompt

class OUELAppView(viewsets.ViewSet, generics.ListAPIView):
    queryset = OUELApp.objects.all()
    serializer_class = serializers.AppSerializer

class PromptView(viewsets.ViewSet, generics.ListAPIView):
    queryset = Prompt.objects.all()
    serializer_class = serializers.PromptSerializer
    pagination_class =  paginations.ItemPaginator