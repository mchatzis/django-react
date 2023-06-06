from django.urls import include, path
from api.views import EmployeeViewSet
from rest_framework.routers import DefaultRouter
from drf_spectacular.views import SpectacularAPIView

router = DefaultRouter()
router.register('employees', EmployeeViewSet, basename='employees')

app_name = 'api'

urlpatterns = [
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('', include(router.urls)),
]