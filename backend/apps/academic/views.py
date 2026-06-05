from django.db.models import F
from rest_framework import viewsets
from rest_framework.response import Response

from .filters import AcademicWorkFilter
from .models import AcademicWork
from .serializers import AcademicWorkSerializer

class AcademicWorkViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AcademicWork.objects.all()
    serializer_class = AcademicWorkSerializer
    filterset_class = AcademicWorkFilter
    search_fields = ["title_uz", "title_en", "title_ru", "supervisor"]
    ordering_fields = ["year", "created_at", "downloads_count"]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        AcademicWork.objects.filter(pk=instance.pk).update(views_count=F("views_count") + 1)
        instance.refresh_from_db(fields=["views_count"])
        return Response(self.get_serializer(instance).data)
