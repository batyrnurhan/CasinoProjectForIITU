from django.db import models
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import Count
# Create your models here.
class CustomUser(AbstractUser):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    username = models.CharField(max_length=200)
    email = models.EmailField()
    profile_pic = models.ImageField(upload_to='profile_pics', default='profile_pics/default.jpg')
    password1 = models.CharField(max_length=200)
    password2 = models.CharField(max_length=200)
    initial_balance = models.IntegerField(default=50000)