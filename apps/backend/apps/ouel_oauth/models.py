from django.db import models
from cloudinary.models import CloudinaryField
from django.contrib.auth.models import AbstractUser

class LevelType(models.TextChoices):
    A1 = 'a1', 'Cấp độ A1'
    A2 = 'a2', 'Cấp độ A2'
    B1 = 'b1', 'Cấp độ B1'
    B2 = 'b2', 'Cấp độ B2'
    C1 = 'c1', 'Cấp độ C1'
    C2 = 'c2', 'Cấp độ C2'

class Hobby(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class User(AbstractUser):
    avatar = CloudinaryField(null=True, blank=True)

class Profile(models.Model):
    biography = models.CharField(max_length=255, default="")
    about = models.TextField(max_length=2600, default="")
    level = models.CharField(max_length=255, choices=LevelType.choices, default=LevelType.A1)
    hobbies = models.ManyToManyField(Hobby, blank=True)
    user = models.OneToOneField(User, primary_key=True, on_delete=models.CASCADE)

    def __str__(self):
        return f"Hồ sơ của: {self.user.last_name} {self.user.first_name}"

class LoginHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='login_history')
    login_date = models.DateTimeField(auto_now_add=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.login_date}"

    class Meta:
        db_table = "ouel_oauth_login_history"
        verbose_name = "Login historie"
