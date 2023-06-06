from rest_framework.viewsets import ModelViewSet
from api.serializers import EmployeeSerializer
from myapp.models import Employee



class EmployeeViewSet(ModelViewSet):
    serializer_class = EmployeeSerializer
    

    def get_queryset(self):
        # User reverse foreign key relationship user -> employee model
        user = self.request.user
        if user.is_authenticated:
            return Employee.objects.filter(user=user)
        
        return Employee.objects.none()
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)