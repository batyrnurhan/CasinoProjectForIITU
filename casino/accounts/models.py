from django.db import models
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import Count
# Create your models here.
class CustomUser(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    username = models.TextField(max_length=200, unique=True)
    email = models.EmailField(unique=True)
    profile_pic = models.ImageField(upload_to='profile_pics', default='static/games/img/profile.png')
    password1 = models.CharField(max_length=200)
    password2 = models.CharField(max_length=200)
    initial_balance = models.IntegerField(default=50000)    

    def __str__(self):
        return f'{self.first_name} - {self.initial_balance}'