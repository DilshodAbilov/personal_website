import django_filters

from .models import AcademicWork


class AcademicWorkFilter(django_filters.FilterSet):
    class Meta:
        model = AcademicWork
        fields = ["work_type", "year", "language"]
