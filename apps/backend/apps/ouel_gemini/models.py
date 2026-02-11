from django.db import models


class Provider(models.TextChoices):
    GEMINI = "gemini", "Google Gemini"


class Model(models.TextChoices):
    version2_5_lite = "gemini-2.5-flash-lite"
    version2_5 = "gemini-2.5-flash"
    version3 = "gemini-3-flash-preview"


class BaseModel(models.Model):
    description = models.TextField(blank=True, null=True)
    active = models.BooleanField(default=True)
    updated_date = models.DateTimeField(auto_now=True)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True
        ordering = ["-created_date"]


class AIModel(BaseModel):
    name = models.CharField(
        max_length=100, choices=Model.choices, default=Model.version2_5
    )
    provider = models.CharField(
        max_length=100, choices=Provider.choices, default=Provider.GEMINI
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Model"


class Prompt(BaseModel):
    name = models.CharField(max_length=255)
    version = models.PositiveIntegerField(default=1)
    instruction = models.TextField()
    context = models.TextField()
    settings = models.JSONField(default=dict, blank=True)
    ai_model = models.ForeignKey(AIModel, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        unique_together = ("name", "version")
        ordering = ["-version"]


class PromptLog(models.Model):
    input = models.TextField()
    final_context = models.TextField()
    response = models.TextField()
    token = models.IntegerField(default=0)
    latency = models.IntegerField(default=0)
    status = models.IntegerField(default=200)
    prompt = models.ForeignKey(Prompt, on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)
