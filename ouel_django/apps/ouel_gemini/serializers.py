from rest_framework import serializers

class GrammarInputSerializer(serializers.Serializer):
    text = serializers.CharField(required=True, allow_blank=False)
