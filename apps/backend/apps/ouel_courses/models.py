from django.core.validators import FileExtensionValidator
from django.db import models
from apps.ouel_oauth.models import User

class LevelEnum(models.TextChoices):
    BEGINNER = 'beginner', 'Beginner'
    INTERMEDIATE = 'intermediate', 'Intermediate'
    ADVANCED = 'advanced', 'Advanced'

class Topic(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.name

class Resource(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    attachment = models.FileField(upload_to='resources/')
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class ResourceUser(models.Model):
    counter = models.IntegerField(default=0)
    last_interaction = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, related_name='resource_interactions', on_delete=models.CASCADE)
    resource = models.ForeignKey(Resource, related_name='user_interactions', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.username} - {self.resource.name} - {self.counter} interactions"

    class Meta:
        db_table = 'resource_user'

class Subject(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.name

class Course(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='course_images/', null=True, blank=True)
    description = models.TextField()
    level = models.CharField(max_length=20, choices=LevelEnum.choices)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    subject = models.ForeignKey(Subject, related_name='courses', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Section(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    course = models.ForeignKey(Course, related_name='sections', on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class Lesson(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    attachment = models.FileField(upload_to='lessons/%Y/%m/%d',
                                  validators=[FileExtensionValidator(
                                      allowed_extensions=['pdf', 'doc', 'docx', 'ppt', 'pptx', 'zip', 'mp4', 'mp3',
                                                          'png', 'jpg'])],
                                  max_length=255, default='')
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    section = models.ForeignKey(Section, related_name='lessons', on_delete=models.CASCADE, default=1)

    def __str__(self):
        return self.title

class ResourceLesson(models.Model):
    resource = models.ForeignKey(Resource, related_name='lessons', on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, related_name='resources', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.resource.name} for {self.lesson.title}"

class TheoryLesson(Lesson):
    minimum_time = models.IntegerField(help_text="Thời gian tối đa hoàn thành bài học")

class AssignmentLesson(Lesson):
    score = models.IntegerField(help_text="Score for the assignment")
    max_attempts = models.IntegerField(default=0)
    strict_mode = models.BooleanField(
        default=False,
        help_text="If true, the user cannot retake the assignment after a failed attempt"
    )
    assignment_type = models.CharField(max_length=255, help_text="Type of assignment (e.g., multiple choice, essay)")

    class Meta:
        db_table = 'assignment_lesson'


class Question(models.Model):
    content = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    assignment = models.ForeignKey(AssignmentLesson, related_name='questions', on_delete=models.CASCADE)

    def __str__(self):
        return self.content


class Choice(models.Model):
    content = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)
    question = models.ForeignKey(Question, related_name='choices', on_delete=models.CASCADE)

    def __str__(self):
        return self.content

class LessonAttempt(models.Model):
    score = models.IntegerField(null=True, blank=True)
    is_completed = models.BooleanField(default=False)
    is_passed = models.BooleanField(default=False)
    user_answers = models.JSONField(null=True, blank=True)
    attempt_time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, related_name='lesson_attempts', on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, related_name='attempts', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.username} attempted {self.lesson.title}"


class Enrollment(models.Model):
    enrolled_at = models.DateTimeField(auto_now_add=True)
    percentage_completed = models.FloatField(default=0.0)
    is_completed = models.BooleanField(default=False)
    conclusion = models.TextField(null=True, blank=True)
    user = models.ForeignKey(User, related_name='enrollments', on_delete=models.CASCADE)
    course = models.ForeignKey(Course, related_name='enrollments', on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'course')

    def __str__(self):
        return f"{self.user.username} enrolled in {self.course.name}"


class Forum(models.Model):
    title = models.CharField(max_length=255)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    course = models.ForeignKey(Course, related_name='forums', on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class ForumPost(models.Model):
    name = models.CharField(max_length=255)
    content = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    forum = models.ForeignKey(Forum, related_name='posts', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='forum_posts', on_delete=models.CASCADE)

    def __str__(self):
        return f"Post by {self.user.username} in {self.forum.title}"


class Reply(models.Model):
    name = models.CharField(max_length=255)
    content = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    post = models.ForeignKey(ForumPost, related_name='replies', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='replies', on_delete=models.CASCADE)

    def __str__(self):
        return f"Reply by {self.user.username} to post {self.post.id}"

    class Meta:
        verbose_name = 'Reply'
        verbose_name_plural = 'Replies'

class Interaction(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, related_name='%(class)s_interactions', on_delete=models.CASCADE)
    course = models.ForeignKey(Course, related_name='%(class)s_interactions', on_delete=models.CASCADE)

    class Meta:
        abstract = True


class CommentInteraction(Interaction):
    comment = models.TextField()
    lesson = models.ForeignKey(Lesson, related_name='comment_interactions', on_delete=models.CASCADE)

    def __str__(self):
        return f"Comment by {self.user.username} on {self.lesson.title}"


class LikeInteraction(Interaction):
    lesson = models.ForeignKey(Lesson, related_name='like_interactions', on_delete=models.CASCADE)