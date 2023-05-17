from django.urls import reverse_lazy
from django.views.generic import View, CreateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.forms import UserCreationForm

class HomeView(LoginRequiredMixin, View):
    template_name = "myapp/index.html"

class Register(CreateView):
    template_name = "registration/register.html"
    form_class = UserCreationForm
    success_url = reverse_lazy('login')

