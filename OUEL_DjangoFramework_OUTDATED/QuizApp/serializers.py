from rest_framework import serializers
from .models import Passage, Question, UserAnswer, QuizAttempt

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'


class QuestionWithoutAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'question_text', 'option_a', 'option_b', 'option_c', 'option_d', 'created_at']


class PassageSerializer(serializers.ModelSerializer):
    # questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Passage
        fields = '__all__'


class UserAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAnswer
        fields = '__all__'


class QuizAttemptSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizAttempt
        fields = '__all__'


class SubmitQuizSerializer(serializers.Serializer):
    passage_id = serializers.IntegerField()
    answers = serializers.DictField(
        child=serializers.CharField(max_length=1)
    )
    user_name = serializers.CharField(max_length=100, required=False, allow_blank=True)

    def validate_answers(self, value):
        for question_id, answer in value.items():
            try:
                int(question_id)
            except ValueError:
                raise serializers.ValidationError(
                    f"Không có question_id: {question_id}"
                )

            if answer not in ['A', 'B', 'C', 'D']:
                raise serializers.ValidationError(
                    f"Không có câu trả lời '{answer}' cho câu {question_id}"
                )
        return value
