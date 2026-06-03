"""Barcha ilovalar uchun umumiy abstract modellar va tanlovlar."""
from django.db import models


class Language(models.TextChoices):
    """Kontent tillari (UZ / EN / RU)."""

    UZ = "uz", "O'zbekcha"
    EN = "en", "English"
    RU = "ru", "Русский"


class TimeStampedModel(models.Model):
    """Yaratilgan va yangilangan vaqtni avtomatik saqlovchi abstract model."""

    created_at = models.DateTimeField("Yaratilgan", auto_now_add=True)
    updated_at = models.DateTimeField("Yangilangan", auto_now=True)

    class Meta:
        abstract = True
        ordering = ["-created_at"]
