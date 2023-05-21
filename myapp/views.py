from django.urls import reverse_lazy
from django.views.generic import TemplateView, CreateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.forms import UserCreationForm

class HomeView(LoginRequiredMixin, TemplateView):
    template_name = "myapp/index.html"

class Register(CreateView):
    template_name = "registration/register.html"
    form_class = UserCreationForm
    success_url = reverse_lazy('login')    
    
    def get_success_url(self):
        next_page = self.request.GET.get('next', None)
        if next_page is not None:
            return  reverse_lazy('login') + "?next=" + next_page
        super().get_success_url()
