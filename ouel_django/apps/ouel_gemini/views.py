from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from . import serializers, selectors, managers

class WritingAppView(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    @action(methods=['post'], url_path='grammar', detail=False)
    def correct_grammar(self, request):
        serializer = serializers.GrammarInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user_input = serializer.validated_data['text']

        try:
            prompt = selectors.get_active_prompt(name="Tìm thông tin giảng viên hướng dẫn")

            result = managers.grammar_correction(
                input=user_input,
                prompt=prompt
            )

            return Response(result, status=status.HTTP_200_OK)

        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as ex:
            print(ex)
            return Response({"error": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ReadingAppView(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    @action(methods=['post'], url_path='',detail=False)
    def get_reading_tips(self, request):
        pass
