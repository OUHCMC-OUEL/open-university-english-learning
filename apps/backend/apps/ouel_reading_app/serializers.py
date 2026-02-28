from rest_framework import serializers
from . import models


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Tag
        fields = "__all__"


# class TagExamSerializer(serializers.Serializer):
#     class Meta:
#         model = models.TagExam
#         fields = '__all__'

# class TagLevelSerializer(serializers.Serializer):
#     class Meta:
#         model = models.TagLevel
#         fields = '__all__'

# class TagPartSerializer(serializers.Serializer):
#     class Meta:
#         model = models.TagPart
#         fields = '__all__'

# class ExamSerializer(serializers.Serializer):
#     class Meta:
#         model = models.Exam
#         fields = '__all__'


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Question
        fields = "__all__"


class PartSerializer(serializers.ModelSerializer):
    # questions = QuestionSerializer(many=True, read_only=True)
    question_count = serializers.IntegerField(read_only=True)
    tag = TagSerializer(many=True, read_only=True)

    class Meta:
        model = models.Part
        fields = [
            "id",
            "content",
            "exam",
            "exam_id",
            "image",
            "name",
            "tag",
            "tag_parts",
            "type_part",
            "question_count",
        ]


class UserAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserAnswer
        fields = ["question", "user_answer", "is_correct"]


class PartHistorySerializer(serializers.ModelSerializer):
    answers = UserAnswerSerializer(many=True)

    class Meta:
        model = models.PartHistory
        fields = [
            "part",
            "user_id",
            "total_answers",
            "correct_answers",
            "score",
            "time",
            "answers",
        ]
