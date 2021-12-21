from django.contrib import admin
from .models import Game, Participant
from .models import models
# Register your models here.
class GameAdmin(admin.ModelAdmin):
    list_display = ('title', 'date' ,'slug')
    list_filter = ('title', 'date')
    prepopulated_fields = {'slug': ('title', )}

admin.site.register(Game, GameAdmin)
admin.site.register(Participant)