from rest_framework import generics, permissions

from apps.common.utils import get_client_ip

from .serializers import ContactMessageSerializer


class ContactMessageCreateView(generics.CreateAPIView):
    """Aloqa formasi xabarini qabul qiladi (ochiq endpoint)."""

    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        serializer.save(ip_address=get_client_ip(self.request))
        # TODO (keyingi bosqich): Telegram/email orqali xabar yuborish (Celery)
