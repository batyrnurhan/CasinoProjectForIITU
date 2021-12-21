from django.contrib import admin
from django.urls import path
from . import views
urlpatterns = [
    path("", views.home_view, name='home'),
    path('games', views.index, name='all-games'),
    path('game/<slug:game_slug>/success', views.confirm_registration, name= 'confirm-registration'),
    path('game/<slug:game_slug>', views.game_details, name='game-detail'),
    path("profile.html", views.profile_view, name='profile'),
    path("blackjack.html", views.blackjack_view, name='blackjack'),
    path("roulette.html", views.roulette_view, name='roulette'),
    path("horserace.html", views.horserace_view, name='horserace'),
    path("slot.html", views.slot_view, name='slot'),
]
