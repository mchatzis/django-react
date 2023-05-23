from rest_framework.generics import ListAPIView
from api.serializers import EmployeeSerializer
from myapp.models import Employee



class EmployeeAPIView(ListAPIView):
    serializer_class = EmployeeSerializer
    queryset = Employee.objects.all()