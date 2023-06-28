from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from api.serializers import EmployeeSerializer
from myapp.models import Employee



class EmployeeViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = EmployeeSerializer
    
    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return Employee.objects.filter(user=user)
        
        return Employee.objects.none()
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)