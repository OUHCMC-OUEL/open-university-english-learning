from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from . import serializers, selectors, services

class WritingAppView(viewsets.ViewSet):
    # permission_classes = [permissions.IsAuthenticated]

    @action(methods=['post'], url_path='grammar', detail=False)
    def correct_grammar(self, request):
        serializer = serializers.GrammarInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user_input = serializer.validated_data['input']                

        try:
            prompt = selectors.get_active_prompt(name="check-grammar")

            result = services.grammar_correction(
                user_input=user_input,
                prompt=prompt
            )

            return Response(result, status=status.HTTP_200_OK)

        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as ex:
            print(ex)
            return Response({"error": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ReadingAppView(viewsets.ViewSet):
    # permission_classes = [permissions.IsAuthenticated]

    @action(methods=['post'], url_path='highlight-passage', detail=False)
    def highlight(self, request):
        passage = request.data.get("passage")
        question = request.data.get("question")

        if not passage or not question:
            return Response({"error": "Thiếu thông tin câu hỏi hoặc đoạn văn"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            highlight_object = services.highlight_passage(passage=passage,question=question)
            return Response(highlight_object)
        except Exception as ex:
            print(ex)
            return Response({"error": "Gemini API error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

