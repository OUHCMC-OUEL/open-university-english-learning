from django.db import models
from ckeditor.fields import RichTextField
from cloudinary.models import CloudinaryField
from apps.ouel_oauth.models import User

class LevelChoices(models.TextChoices):
    BEGINNER = 'beginner', 'Cơ bản'
    INTERMEDIATE = 'intermediate', 'Trung bình'
    ADVANCED = 'advanced', 'Nâng cao'

class AssessmentType(models.TextChoices):
    QUIZ = "quiz", "Quiz"
    MIDTERM = "midterm", "Midterm"
    FINAL = "final", "Final"
    SPEAKING = "speaking", "Speaking Test"
    WRITING = "writing", "Writing Test"

class BaseModel(models.Model):
    active = models.BooleanField(default=True)
    description = RichTextField(null=True, blank=True)
    updated_date = models.DateTimeField(auto_now=True)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True

class Subject(BaseModel):
    name = models.CharField(max_length=255)

class Course(BaseModel):
    name = models.CharField(max_length=255, unique=True)
    image = CloudinaryField(null=True, blank=True)
    subject = models.ForeignKey(Subject, on_delete=models.RESTRICT, related_name='courses')
    level = models.CharField(max_length=30, choices=LevelChoices, default=LevelChoices.BEGINNER)
    instructor = models.ForeignKey(User, on_delete=models.PROTECT, limit_choices_to={'is_staff': True})
    students = models.ManyToManyField('ouel_oauth.User',through='Enrollment', related_name='courses')

    def __str__(self):
        return self.name

class Lesson(BaseModel):
    title = models.CharField(max_length=255, unique=True)
    course = models.ForeignKey(Course, on_delete=models.RESTRICT, related_name='lessons')

    def __str__(self):
        return self.title

class Theory(Lesson):
    mininum_time = models.IntegerField(default=0)

class LessonAttempt(models.Model):
    is_completed = models.BooleanField(default=False)
    user_answer = models.ForeignKey(User, on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='attempts')
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='lesson_attempts')

class Assessment(Lesson):
    score = models.FloatField(default=0.0)
    is_pass = models.BooleanField(default=False)
    attempted = models.IntegerField(default=0)
    strict_mode = models.BooleanField(default=False)
    type = models.CharField(max_length=255, choices=AssessmentType.choices, default=AssessmentType.QUIZ)

class Question(models.Model):
    content = models.TextField()
    assessment = models.ForeignKey(Assessment, on_delete=models.CASCADE, related_name='questions')

    def __str__(self):
        return self.content

class Choice(models.Model):
    content = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='choices')

    def __str__(self):
        return self.content

    class Meta:
        unique_together = ('question','content')

class Enrollment(models.Model):
    is_completed = models.BooleanField(default=False)
    percent = models.FloatField(default=0)
    conclusion = RichTextField(null=True, blank=True)
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.RESTRICT)

    def __str__(self):
        return f"{self.student} - {self.course}"

    class Meta:
        unique_together = ('student','course')

class Forum(BaseModel):
    name = models.CharField(max_length=255)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='forums')

    def __str__(self):
        return self.name

    class Meta:
        unique_together = ('course','name')

class Post(models.Model):
    name = models.CharField(max_length=255)
    content = RichTextField()
    posted_date = models.DateTimeField(auto_now=True)
    forum = models.ForeignKey(Forum, on_delete=models.CASCADE, related_name='posts')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')

    def __str__(self):
        return self.name

    class Meta:
        unique_together = ('forum','name')

class Reply(models.Model):
    name = models.CharField(max_length=255)
    content = RichTextField()
    reply_date = models.DateTimeField(auto_now=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='replies')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='replies')

    def __str__(self):
        return self.name