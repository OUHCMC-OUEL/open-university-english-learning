from rest_framework import serializers
from .models import Course, ForumPost, Reply, CommentInteraction

class CourseOutputSerializer(serializers.ModelSerializer):
    subject_name = serializers.CharField(source='subject.name', read_only=True)
    class Meta:
        model = Course
        fields = ['id', 'name', 'image', 'description', 'level', 'subject_name']

class ForumPostInputSerializer(serializers.Serializer):
    forum_id = serializers.IntegerField(required=False) 
    course_id = serializers.IntegerField(required=False) 
    name = serializers.CharField(max_length=255)
    content = serializers.CharField()

class ForumPostOutputSerializer(serializers.ModelSerializer):
    class Meta:
        model = ForumPost
        fields = ['id', 'name', 'content', 'created_date']

class ReplyInputSerializer(serializers.Serializer):
    post_id = serializers.IntegerField(required=False)
    name = serializers.CharField(max_length=255)
    content = serializers.CharField()

class LessonInteractionInputSerializer(serializers.Serializer):
    course_id = serializers.IntegerField()
    comment = serializers.CharField(required=False, allow_blank=True)

