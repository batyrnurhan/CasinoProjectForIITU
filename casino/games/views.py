from django.shortcuts import render,redirect
from django.shortcuts import HttpResponse
from accounts.models import CustomUser
from .forms import RegistrationForm
from accounts.views import balance
from .models import Game, Participant
from . import models
# Create your views here.

def home_view(request):
    #redeem = CouponForm(request.POST, user=user)
    return render(request, 'games/home.html', {
        'balance': balance
    })
    #return render(request, 'games/home.html')

def index(request):
    games = Game.objects.all()
    return render(request, 'games/index.html', {
        'show_games': True,
        'games': games
    })

def game_details(request, game_slug):
    try:
        selected_game = Game.objects.get(slug=game_slug)
        if request.method == 'GET':
            registration_form = RegistrationForm()
        else:
            registration_form = RegistrationForm(request.POST)
            if registration_form.is_valid():
                user_email = registration_form.cleaned_data['email']
                participant, _ = Participant.objects.get_or_create(email=user_email)
                selected_game.participants.add(participant)
                return redirect('confirm-registration', game_slug=game_slug)
        return render(request, 'games/game-details.html', {
                'game_found': True,
                'game':selected_game,
                'form': registration_form
        })
    except Exception as exc:

        return render(request, 'games/game-details.html', {
            'game_found': False
        })



def confirm_registration(request, game_slug):
    game = Game.objects.get(slug=game_slug)
    return render(request, 'games/registration-success.html', {
        'organizer_email': game.organizer_email
    })

def blackjack_view(request):
    return render(request, 'games/blackjack.html')

def roulette_view(request):
    return render(request, 'games/roulette.html')

def horserace_view(request):
    return render(request, 'games/horserace.html')

def slot_view(request):
    return render(request, 'games/slot.html')

def profile_view(request):
    return render(request, 'games/profile.html')

def register_view(request):
    return render(request, 'games/registration.html')

def login_view(request):
    return render(request, 'games/login.html')