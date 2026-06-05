from rest_framework import generics, permissions

from apps.common.utils import get_client_ip

from .models import SocialLink
from .serializers import ContactMessageSerializer, SocialLinkSerializer

class ContactMessageCreateView(generics.CreateAPIView):
    """Aloqa formasi xabarini qabul qiladi (ochiq endpoint)."""

    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        serializer.save(ip_address=get_client_ip(self.request))

class SocialLinkListView(generics.ListAPIView):
    """Faol ijtimoiy tarmoq havolalari ro'yxati (ochiq endpoint)."""

    serializer_class = SocialLinkSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = None
    queryset = SocialLink.objects.filter(is_active=True)
