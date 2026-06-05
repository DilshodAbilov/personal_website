from rest_framework import serializers

from .models import SiteProfile


class SiteProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteProfile
        fields = ["avatar"]
