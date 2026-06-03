from rest_framework import viewsets

from .models import Skill
from .serializers import SkillSerializer


class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    filterset_fields = ["category"]
    search_fields = ["name"]
    ordering_fields = ["order", "proficiency_level", "name"]
