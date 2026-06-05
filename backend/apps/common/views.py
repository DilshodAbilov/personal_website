from rest_framework import generics, permissions

from .models import SiteProfile
from .serializers import SiteProfileSerializer


class SiteProfileView(generics.RetrieveAPIView):
    """Sayt profili (yagona yozuv) — ochiq endpoint."""

    serializer_class = SiteProfileSerializer
    permission_classes = [permissions.AllowAny]

    def get_object(self):
        obj, _ = SiteProfile.objects.get_or_create(pk=1)
        return obj
