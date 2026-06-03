from rest_framework import serializers

from .models import AcademicWork


class AcademicWorkSerializer(serializers.ModelSerializer):
    work_type_display = serializers.CharField(source="get_work_type_display", read_only=True)

    class Meta:
        model = AcademicWork
        fields = [
            "id", "title_uz", "title_en", "title_ru",
            "abstract_uz", "abstract_en", "abstract_ru",
            "work_type", "work_type_display", "year", "language",
            "keywords", "authors", "supervisor",
            "file", "is_full_text_public",
            "views_count", "downloads_count", "created_at",
        ]
