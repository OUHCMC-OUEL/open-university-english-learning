from django.db import models

class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        abstract = True
        ordering = ['-id']


class Passage(BaseModel):
    name = models.CharField(max_length=50, null=True)
    content = models.TextField()

    def __str__(self):
        return self.name


class Question(BaseModel):
    passage = models.ForeignKey(Passage, on_delete=models.CASCADE)
    question_text = models.CharField(max_length=225)
    option_a = models.CharField(max_length=225)
    option_b = models.CharField(max_length=225)
    option_c = models.CharField(max_length=225)
    option_d = models.CharField(max_length=225)
    correct_answer = models.CharField(
        max_length=1,
        choices=[
            ('A', 'Lựa chọn A'),
            ('B', 'Lựa chọn B'),
            ('C', 'Lựa chọn C'),
            ('D', 'Lựa chọn D')
        ]
    )
    explanation = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.question_text

    class Meta:
        unique_together = ('question_text', 'passage')


class QuizAttempt(BaseModel):
    passage = models.ForeignKey(Passage, on_delete=models.CASCADE)
    user_name = models.CharField(max_length=100, blank=True)
    total_questions = models.IntegerField()
    correct_answers = models.IntegerField()
    score_percentage = models.FloatField()
    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.id


class UserAnswer(BaseModel):
    attempt = models.ForeignKey(QuizAttempt, on_delete=models.CASCADE, null=True)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    user_answer = models.CharField(max_length=1)
    is_correct = models.BooleanField()

    def __str__(self):
        return self.user_answer
