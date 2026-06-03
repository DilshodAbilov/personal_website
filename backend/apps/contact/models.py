from django.db import models


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
