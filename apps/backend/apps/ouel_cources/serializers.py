from rest_framework import serializers
from .models import (
    Subject, Course, Lesson, Theory, Assessment, 
    Question, Choice, Enrollment, Forum, Post, Reply, LessonAttempt
)

class BaseSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['id', 'active', 'description', 'created_date', 'updated_date']

class SubjectSerializer(BaseSerializer):
    class Meta(BaseSerializer.Meta):
        model = Subject
        fields = BaseSerializer.Meta.fields + ['name']

class CourseSerializer(BaseSerializer):
    subject_details = SubjectSerializer(source='subject', read_only=True)
    instructor_name = serializers.SerializerMethodField()
    def get_instructor_name(self, course):
        return f'{course.instructor.last_name} {course.instructor.first_name}'

    class Meta(BaseSerializer.Meta):
        model = Course
        fields = BaseSerializer.Meta.fields + [
            'name', 'image', 'subject', 'subject_details', 
            'level', 'instructor', 'instructor_name'
        ]
        read_only_fields = ['instructor']

class LessonSerializer(BaseSerializer):
    class Meta(BaseSerializer.Meta):
        model = Lesson
        fields = BaseSerializer.Meta.fields + ['title', 'course']

class TheorySerializer(LessonSerializer):
    class Meta(LessonSerializer.Meta):
        model = Theory
        fields = LessonSerializer.Meta.fields + ['mininum_time']

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ['id', 'content', 'is_correct']

class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'content', 'choices']

class AssessmentSerializer(LessonSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta(LessonSerializer.Meta):
        model = Assessment
        fields = LessonSerializer.Meta.fields + ['score', 'is_pass', 'attempted', 'strict_mode', 'type', 'questions']

class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = '__all__'
        read_only_fields = ['percent', 'total_resources_read','total_exams_done']

class LessonAttemptSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonAttempt
        fields = '__all__'

class ReplySerializer(serializers.ModelSerializer):
    def get_user_fullname(self, reply):
        return f"{reply.user.last_name} {reply.user.first_name}"
    user_fullname = serializers.SerializerMethodField()
    class Meta:
        model = Reply
        fields = ['id', 'name', 'content', 'reply_date', 'user', 'user_fullname', 'post']

class PostSerializer(serializers.ModelSerializer):
    replies = ReplySerializer(many=True, read_only=True)
    def get_user_fullname(self, post):
        return f"{post.user.last_name} {post.user.first_name}"

    user_fullname = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'name', 'content', 'posted_date', 'forum', 'user', 'user_fullname', 'replies']

class ForumSerializer(BaseSerializer):
    posts = PostSerializer(many=True, read_only=True)

    class Meta(BaseSerializer.Meta):
        model = Forum
        fields = BaseSerializer.Meta.fields + ['name', 'course', 'posts']