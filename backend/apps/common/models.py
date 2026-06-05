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


class SiteProfile(models.Model):
    """Sayt profili (yagona yozuv) — asosiy sahifa fotosi admin'dan boshqariladi."""

    avatar = models.ImageField(
        "Asosiy foto", upload_to="profile/", blank=True, null=True
    )
    updated_at = models.DateTimeField("Yangilangan", auto_now=True)

    class Meta:
        verbose_name = "Sayt profili"
        verbose_name_plural = "Sayt profili"

    def __str__(self) -> str:
        return "Sayt profili"

    def save(self, *args, **kwargs):
        self.pk = 1  # singleton — har doim bitta yozuv
        super().save(*args, **kwargs)
