from rest_framework import serializers


class GrammarInputSerializer(serializers.Serializer):
    input = serializers.CharField(required=True, allow_blank=False, max_length=10000)


class HighlightInputSerializer(serializers.Serializer):
    passage = serializers.CharField(required=True, allow_blank=False)
    question = serializers.CharField(required=True, allow_blank=False)
