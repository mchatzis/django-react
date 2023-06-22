from django.urls import reverse_lazy
from django.views.generic import TemplateView, CreateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.forms import UserCreationForm
from myapp.models import Employee


class HomeView(TemplateView):
    template_name = "myapp/index.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["department_choices"] = dict(Employee.DEPARTMENT_CHOICES)
        return context


class Register(CreateView):
    template_name = "registration/register.html"
    form_class = UserCreationForm
    success_url = reverse_lazy('login')

    def get_success_url(self):
        next_page = self.request.GET.get('next', None)
        if next_page is not None:
            return reverse_lazy('login') + "?next=" + next_page
        super().get_success_url()

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['next'] = self.request.GET.get('next', None)
        return context