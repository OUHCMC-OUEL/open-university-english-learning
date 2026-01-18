# This is a guide from GeminiAI and I have already validated the code below
from rest_framework.views import APIView
from rest_framework.response import Response
from .GenerateContent import GeminiGenerateContent
from rest_framework import status


class GeminiContentAPI(APIView):
    def post(self, request):
        try:
            data = request.data.get('input')
            app_id = request.data.get('app_id')

            if not data:
                return Response(
                    {'error': 'No input text found'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            result = GeminiGenerateContent(data, app_id)

            return Response(result, status=status.HTTP_200_OK)

        except Exception as e:
            print(str(e))
            return Response(
                {'error': '500_INTERNAL_SERVER_ERROR'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
