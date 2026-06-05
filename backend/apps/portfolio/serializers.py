from rest_framework import serializers

from .models import Project, ProjectImage

class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = ["id", "image", "caption", "order"]

class ProjectSerializer(serializers.ModelSerializer):
    images = ProjectImageSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            "id", "name",
            "description_uz", "description_en", "description_ru",
            "technologies", "github_url", "demo_url", "is_private",
            "project_type", "status", "is_featured", "order",
            "images", "created_at", "updated_at",
        ]
