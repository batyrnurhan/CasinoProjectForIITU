from django.db import models

from accounts.models import CustomUser

# Create your models here.
class Participant(models.Model):
    email = models.EmailField(unique=True)
    

    def __str__(self):
        return self.email


class Game(models.Model):
    title = models.CharField(max_length=30)
    organizer_email= models.EmailField()
    date = models.DateField()
    slug = models.SlugField(unique=True)
    shortdesc = models.TextField()
    image = models.ImageField(upload_to='img')
    participants = models.ManyToManyField(Participant, blank=True, null=True)
    

    def __str__(self):
        return f'{self.title} - {self.slug}'
