from rest_framework.viewsets import ModelViewSet
from api.serializers import EmployeeSerializer
from myapp.models import Employee


class EmployeeViewSet(ModelViewSet):
    serializer_class = EmployeeSerializer

    def get_queryset(self):
        return self.request.user.employees.all()
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)