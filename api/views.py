from rest_framework.generics import ListAPIView
from api.serializers import EmployeeSerializer
from myapp.models import Employee



class EmployeeAPIView(ListAPIView):
    serializer_class = EmployeeSerializer

    def get_queryset(self):
        emp_name = self.kwargs.get('name', None)
        queryset = Employee.objects.all()

        if emp_name:
            return queryset.filter(name=emp_name)
        else:
            return queryset
    