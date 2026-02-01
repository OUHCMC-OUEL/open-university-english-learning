from rest_framework import serializers

class GrammarInputSerializer(serializers.Serializer):
    input = serializers.CharField(required=True, allow_blank=False)
