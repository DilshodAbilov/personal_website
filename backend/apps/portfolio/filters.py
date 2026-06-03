import django_filters

from .models import Project


class ProjectFilter(django_filters.FilterSet):
    technology = django_filters.CharFilter(method="filter_technology")

    class Meta:
        model = Project
        fields = ["project_type", "status", "is_featured"]

    def filter_technology(self, queryset, name, value):
        # ArrayField ichida texnologiya bor-yo'qligini tekshirish (PostgreSQL)
        return queryset.filter(technologies__contains=[value])
