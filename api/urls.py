from django.urls import include, path
from api.views import EmployeeViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('employees', EmployeeViewSet, basename='employees')

urlpatterns = [
    path('', include(router.urls))
]