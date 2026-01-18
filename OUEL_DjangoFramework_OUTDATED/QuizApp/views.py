from rest_framework import viewsets, status, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Passage, Question, UserAnswer,QuizAttempt
from QuizApp import serializers

class PassageViewSet(viewsets.ModelViewSet, generics.ListAPIView):
    queryset = Passage.objects.all()
    serializer_class = serializers.PassageSerializer

    @action(methods=['get'], url_name='questions', detail=True)
    def questions(self,request,pk):
        questions=self.get_object().question_set.all()
        return Response(serializers.QuestionSerializer(questions,many=True,context={'request':request}).data, status=status.HTTP_200_OK)

    @action(methods=['get'],detail=False)
    def random(self, request):
        passage = Passage.objects.order_by('?').first()
        if not passage:
            return Response({'error': 'Không có passage nào'}, status=404)
        return Response(serializers.PassageSerializer(passage).data)

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = serializers.QuestionSerializer


