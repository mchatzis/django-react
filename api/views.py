from rest_framework.viewsets import ModelViewSet
from api.serializers import EmployeeSerializer
from drf_spectacular.utils import extend_schema, OpenApiParameter
from drf_spectacular.types import OpenApiTypes



class EmployeeViewSet(ModelViewSet):
    serializer_class = EmployeeSerializer
    
    def get_queryset(self):
        # User reverse foreign key relationship user -> employee model
        return self.request.user.employees.all()
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    # Inevitable manual boilerplate due to 'drf-spectacular' nonsense.
    # (drf-spectacular can't find type of 'id' parameter due to
    # queryset property missing)
    
    @extend_schema(
        parameters=[
            OpenApiParameter(
                name="id",
                type=OpenApiTypes.INT,
                location=OpenApiParameter.PATH,
                required=True,
            )
        ]
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
    
    @extend_schema(
        parameters=[
            OpenApiParameter(
                name="id",
                type=OpenApiTypes.INT,
                location=OpenApiParameter.PATH,
                required=True,
            )
        ]
    )
    def update(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
    
    @extend_schema(
        parameters=[
            OpenApiParameter(
                name="id",
                type=OpenApiTypes.INT,
                location=OpenApiParameter.PATH,
                required=True,
            )
        ]
    )
    def partial_update(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
    
    @extend_schema(
        parameters=[
            OpenApiParameter(
                name="id",
                type=OpenApiTypes.INT,
                location=OpenApiParameter.PATH,
                required=True,
            )
        ]
    )
    def destroy(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)