from django.urls import path
from django.views.generic import TemplateView
from django.contrib.auth.views import LoginView

from myapp.views import HomeView, Register

urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('register', Register.as_view(), name='register')
]   
