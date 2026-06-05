from rest_framework import serializers

from .models import ContactMessage, SocialLink

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["name", "email", "subject_type", "message"]

class SocialLinkSerializer(serializers.ModelSerializer):
    platform_display = serializers.CharField(
        source="get_platform_display", read_only=True
    )

    class Meta:
        model = SocialLink
        fields = ["id", "platform", "platform_display", "label", "url", "order"]
