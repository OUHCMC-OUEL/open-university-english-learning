from django.db import models
from cloudinary.models import CloudinaryField
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    avatar = CloudinaryField(null=True, blank=True)
