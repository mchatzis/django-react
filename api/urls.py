from django.urls import path
from api.views import EmployeeAPIView


urlpatterns = [
    path('employees', EmployeeAPIView.as_view(), name='employees-list')
]
