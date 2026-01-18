from django.db import models
from django_ckeditor_5.fields import CKEditor5Field

#Best way to create a prompt for Gemini: https://www.philschmid.de/gemini-3-prompt-practices
class Base(models.Model):
    created_date = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class OUELApp(Base):
    app_name = models.CharField(max_length=100, blank=False)
    description = CKEditor5Field()

    def __str__(self):
        return self.app_name

class Prompt(Base):
    prompt_name = models.CharField(max_length=100, blank=False)
    prompt_role = models.CharField(max_length=300, blank=False)
    prompt_instructions = models.TextField(max_length=3000, blank=False)
    prompt_constraints = models.TextField(max_length=3000, blank=False)
    prompt_output = models.TextField(max_length=1000, blank=False)
    ouelapp = models.OneToOneField(
        OUELApp,
        on_delete=models.CASCADE,
        related_name='prompt_config'  # Đặt tên này để dễ gọi ngược từ App
    )
    def __str__(self):
        return self.prompt_name
