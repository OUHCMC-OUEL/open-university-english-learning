from rest_framework.exceptions import ValidationError
from GeminiAPI.models import OUELApp, Prompt
from rest_framework import serializers

class AppSerializer(serializers.ModelSerializer):
    class Meta:
        model = OUELApp
        fields = ['id', 'app_name']

class PromptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prompt
        fields = ['id', 'prompt_name','prompt_role','prompt_instructions','prompt_constraints','prompt_output','created_date']
