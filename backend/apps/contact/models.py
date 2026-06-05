from django.db import models

class SocialLink(models.Model):
    """Ijtimoiy tarmoq / aloqa havolasi (footer va aloqa bo'limida ko'rsatiladi)."""

    class Platform(models.TextChoices):
        GITHUB = "github", "GitHub"
        LINKEDIN = "linkedin", "LinkedIn"
        TELEGRAM = "telegram", "Telegram"
        INSTAGRAM = "instagram", "Instagram"
        TWITTER = "twitter", "X (Twitter)"
        YOUTUBE = "youtube", "YouTube"
        FACEBOOK = "facebook", "Facebook"
        EMAIL = "email", "Email"
        WEBSITE = "website", "Veb-sayt"
        OTHER = "other", "Boshqa"

    platform = models.CharField(
        "Platforma", max_length=20, choices=Platform.choices, default=Platform.OTHER
    )
    label = models.CharField("Nom (ixtiyoriy)", max_length=50, blank=True)
    url = models.CharField("Havola", max_length=300, help_text="To'liq URL yoki mailto:email")
    is_active = models.BooleanField("Faol", default=True)
    order = models.PositiveIntegerField("Tartib", default=0)

    class Meta:
        verbose_name = "Ijtimoiy tarmoq"
        verbose_name_plural = "Ijtimoiy tarmoqlar"
        ordering = ["order", "id"]

    def __str__(self) -> str:
        return f"{self.get_platform_display()} — {self.url}"

class ContactMessage(models.Model):
    """Aloqa formasidan kelgan xabar."""

    class Subject(models.TextChoices):
        JOB = "job", "Ish taklifi"
        COLLAB = "collab", "Hamkorlik"
        QUESTION = "question", "Savol"
        OTHER = "other", "Boshqa"

    name = models.CharField("Ism", max_length=120)
    email = models.EmailField("Email")
    subject_type = models.CharField(
        "Mavzu", max_length=20, choices=Subject.choices, default=Subject.OTHER
    )
    message = models.TextField("Xabar")
    ip_address = models.GenericIPAddressField("IP manzil", blank=True, null=True)
    is_read = models.BooleanField("O'qilgan", default=False)
    created_at = models.DateTimeField("Yuborilgan", auto_now_add=True)

    class Meta:
        verbose_name = "Xabar"
        verbose_name_plural = "Xabarlar"
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.name} <{self.email}> — {self.get_subject_type_display()}"
