from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from . import serializers, selectors, services
from .models import Part, Question

class PartViewSet(viewsets.ModelViewSet):
    queryset = Part.objects.all()
    serializer_class = serializers.PartSerializer
    # permission_classes = [permissions.IsAuthenticated]

    @action(methods=['get'], url_name='questions', detail=True)
    def questions(self, request, pk):
        part = selectors.get_part_by_id(pk)
        questions = selectors.get_questions_by_part(part)
        return Response(serializers.QuestionSerializer(questions, many=True).data, status=status.HTTP_200_OK)

    @action(methods=['post'], url_name='random', detail=False)
    def random(self, request):
        print(request.data)
        if request.data:
            part = selectors.get_random_part_type(request.data['type'])
        else:
            part = selectors.get_random_part()
        return Response(serializers.PartSerializer(part).data, status=status.HTTP_200_OK)

    @action(methods=['post'], url_name='type', detail=False)
    def type(self, request):
        try:
            part = selectors.get_type_parts(request.data['type'])
            return Response(serializers.PartSerializer(part, many=True).data, status=status.HTTP_200_OK)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as ex:
            print(ex)
            return Response({"error": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = serializers.QuestionSerializer
    # permission_classes = [permissions.IsAuthenticated]

class PartHistoryViewSet(viewsets.ViewSet):
    queryset = Part.objects.all()
    serializer_class = serializers.PartHistorySerializer
    # permission_classes = [permissions.IsAuthenticated]

    @action(methods=['post'], detail=False, url_path='submit')
    def submit(self, request):
        serializer = serializers.PartHistorySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        part = selectors.get_part_by_id(data['part'].id)
        part_history = services.submit_part_history(part=part,data=data)
        return Response(serializers.PartHistorySerializer(part_history).data, status=status.HTTP_201_CREATED)