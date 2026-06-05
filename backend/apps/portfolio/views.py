from rest_framework import viewsets

from .filters import ProjectFilter
from .models import Project
from .serializers import ProjectSerializer

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.prefetch_related("images")
    serializer_class = ProjectSerializer
    filterset_class = ProjectFilter
    search_fields = ["name", "description_uz", "description_en", "description_ru"]
    ordering_fields = ["order", "created_at"]
