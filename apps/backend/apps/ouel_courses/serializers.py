from rest_framework import serializers
from .models import Course, ForumPost, Reply, CommentInteraction, Enrollment, Subject, Section, TheoryLesson, \
    AssignmentLesson, Lesson
from rest_framework.exceptions import ValidationError

class ItemSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.image:
            data['image'] = instance.image.url

        return data

class EnrollmentSerializer(serializers.ModelSerializer):
    total_lesson = serializers.SerializerMethodField()
    completed_lesson = serializers.SerializerMethodField()

    def get_total_lesson(self, obj):
        return getattr(obj, 'total_lessons', 0) # xuwr lys

    def get_completed_lesson(self, obj):
        return getattr(obj, 'completed_lesson', 0) # xuwr lys

    class Meta:
        model = Enrollment
        fields = ['id', 'percentage_completed', 'total_lesson', 'completed_lesson', 'enrolled_at', 'is_completed']
        read_only_fields = ['percent', 'enrolled_at']

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id', 'name','description']

class TheoryLessonSerializer(serializers.ModelSerializer):
    type = serializers.ReadOnlyField(default='theory')

    class Meta:
        model = TheoryLesson
        fields = ['id', 'title', 'content', 'minimum_time' , 'type']

class AssignmentLessonSerializer(serializers.ModelSerializer):
    type = serializers.ReadOnlyField(default='assignment')

    class Meta:
        model = AssignmentLesson
        fields = ['id', 'title', 'score', 'max_attempts', 'strict_mode', 'assignment_type' , 'type']

class LessonSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        if hasattr(instance, 'theorylesson'):
            return TheoryLessonSerializer(instance.theorylesson).data
        elif hasattr(instance, 'assignmentlesson'):
            return AssignmentLessonSerializer(instance.assignmentlesson).data

        return super().to_representation(instance)

    class Meta:
        model = Lesson
        fields = ['id', 'title']

class SectionSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)
    class Meta:
        model = Section
        fields = ['id', 'title','content', 'lessons']

class CourseOutputSerializer(ItemSerializer):
    student_count = serializers.SerializerMethodField()
    subject = SubjectSerializer(read_only=True)
    sections = SectionSerializer(many=True, read_only=True)
    enrollment = serializers.SerializerMethodField()

    def get_enrollment(self, course):
        enrollments_map = self.context.get('enrollments_map', {})
        enrollment = enrollments_map.get(course.id)
        if not enrollment:
            return None
        return EnrollmentSerializer(enrollment).data

    def get_student_count(self, course):
        student_total = getattr(course, 'student_count', 0)
        return int(student_total)

    class Meta:
        model = Course
        fields = ['id', 'name', 'image', 'description', 'level', 'student_count', 'sections', 'subject', 'enrollment']

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

