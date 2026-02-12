from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from cloudinary.models import CloudinaryField

class RoleEnum(models.TextChoices):
    STUDENT = "student", "Học viên"
    INSTRUCTOR = "instructor", "Giảng viên"
    ADMIN = "admin", "Quản trị viên"


class ProviderEnum(models.TextChoices):
    GOOGLE = "google", "Google"
    EMAIL = "email", "Email/Password"


class LevelType(models.TextChoices):
    A1 = "a1", "Cấp độ A1"
    A2 = "a2", "Cấp độ A2"
    B1 = "b1", "Cấp độ B1"
    B2 = "b2", "Cấp độ B2"
    C1 = "c1", "Cấp độ C1"
    C2 = "c2", "Cấp độ C2"

class Hobby(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Hobbie"


class User(AbstractUser):
    avatar = CloudinaryField(null=True, blank=True)
    role = models.CharField(max_length=50, choices=RoleEnum, default=RoleEnum.STUDENT)
    social_provider = models.CharField(max_length=50, choices=ProviderEnum.choices, default=ProviderEnum.EMAIL)

    @property
    def is_student(self):
        return self.role == RoleEnum.STUDENT

    @property
    def is_instructor(self):
        return self.role == RoleEnum.INSTRUCTOR

class UserFollow(models.Model):
    follower = models.ForeignKey(User, on_delete=models.CASCADE, related_name='following')
    followed = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followers')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "ouel_oauth_user_follow"
        verbose_name = "User follower"

        constraints = [
            models.UniqueConstraint(
                fields=['follower', 'followed'],
                name='unique_user_follow'
            ),

            models.CheckConstraint(
                condition=~models.Q(follower=models.F('followed')),
                name='prevent_self_follow'
            )
        ]

        indexes = [
            models.Index(fields=['follower', '-created_at']),
            models.Index(fields=['followed', '-created_at'])
        ]

    def clean(self):
        if self.follower_id == self.followed_id:
            raise ValidationError("Bạn không thể tự theo dõi chính mình.")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.follower_id} follow {self.followed_id}"


class Profile(models.Model):
    biography = models.CharField(max_length=255, default="", blank=True)
    about = models.TextField(max_length=2600, default="", blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    user = models.OneToOneField(User, primary_key=True, on_delete=models.CASCADE)

    def __str__(self):
        return f"Profile: {self.user.last_name} {self.user.first_name}"

    class Meta:
        abstract = True


class StudentProfile(Profile):
    proficiency = models.CharField(max_length=255, choices=LevelType.choices, default=LevelType.A1)
    interests = models.ManyToManyField(Hobby, blank=True)
    goal = models.TextField(null=True,blank=True)

    class Meta:
        verbose_name = "Student profile"


class InstructorProfile(Profile):
    title = models.CharField(max_length=255, default="Instructor")
    experience = models.TextField(null=True, blank=True)

    class Meta:
        verbose_name = "Instructor profile"


class LoginHistory(models.Model):
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    login_date = models.DateTimeField(auto_now_add=True)
    description = models.TextField(null=True, blank=True)
    user_agent = models.CharField(max_length=500, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="login_history")

    def __str__(self):
        return f"{self.user.username} - {self.login_date}"

    class Meta:
        db_table = "ouel_oauth_login_history"
        verbose_name = "Login log"
