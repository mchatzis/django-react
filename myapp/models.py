from django.db import models
from django.contrib.auth.models import User


class Employee(models.Model):
    DEPARTMENT_CHOICES = [
    ('marketing', 'Marketing',),
    ('hr', 'Human Resources'),
    ('eng', 'Engineering'),
    ('sales', 'Sales'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='employees')
    name = models.CharField("Name", max_length=50)
    department = models.CharField("Department", max_length=50, choices=DEPARTMENT_CHOICES)
    salary = models.PositiveIntegerField("Salary")

