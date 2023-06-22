from rest_framework import serializers
from myapp.models import Employee


class EmployeeSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        read_only=True,
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = Employee
        fields = '__all__'