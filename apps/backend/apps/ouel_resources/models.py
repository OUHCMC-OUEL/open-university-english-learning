from django.db import models
from ckeditor.fields import RichTextField
from django.core.validators import FileExtensionValidator
from apps.ouel_oauth.models import User
from apps.ouel_cources.models import Lesson

class ResourceType(models.TextChoices):
    CURRICULUM = 'curriculum', 'Giáo trình'
    LECTURE = 'lecture', 'Bài giảng'
    SLIDE = 'slide', 'Slide'
    VIDEO = 'video', 'Video'
    OTHER = 'other', 'Tham khảo'

class Topic(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name

class BaseModel(models.Model):
    active = models.BooleanField(default=True)
    description = RichTextField(null=True, blank=True)
    updated_date = models.DateTimeField(auto_now=True)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True

class Resource(BaseModel):
    name = models.CharField(max_length=255)
    attachment = models.FileField(upload_to='resources/%Y/%m/%d',
                 validators=[FileExtensionValidator(
                     allowed_extensions=['pdf', 'doc', 'docx', 'ppt', 'pptx', 'zip', 'mp4', 'mp3','png','jpg','svg'])])
    topic = models.ForeignKey(Topic, null=True, on_delete=models.SET_NULL, related_name='resources')
    instructor = models.ForeignKey(User, null=True, on_delete=models.CASCADE, related_name='resources')
    resource_type = models.CharField(max_length=30,choices=ResourceType.choices, default=ResourceType.LECTURE, db_index=True)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='resources')

    def __str__(self):
        return self.name

    class Meta:
        unique_together = ('name','lesson')

class Resource_Student(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    resource = models.ForeignKey(Resource, on_delete=models.CASCADE)
    counter = models.IntegerField(default=0)
    reading_date = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'resource')

class Interaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    resource = models.ForeignKey(Resource, on_delete=models.CASCADE)
    active = models.BooleanField(default=True, db_index=True)
    updated_date = models.DateTimeField(auto_now=True)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True

class Comment(Interaction):
    content = models.TextField()

    def __str__(self):
        return self.content