from rest_framework import serializers

from .models import Experience


class ExperienceSerializer(serializers.ModelSerializer):
    is_current = serializers.BooleanField(read_only=True)

    class Meta:
        model = Experience
        fields = [
            "id", "company", "position",
            "description_uz", "description_en", "description_ru",
            "start_date", "end_date", "is_current",
            "technologies", "responsibilities", "order",
        ]
