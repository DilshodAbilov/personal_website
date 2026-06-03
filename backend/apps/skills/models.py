from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class Skill(models.Model):
    """Texnik ko'nikma."""

    class Category(models.TextChoices):
        BACKEND = "backend", "Backend"
        DATABASE = "database", "Database"
        DEVOPS = "devops", "DevOps"
        TOOLS = "tools", "Tools"
        DESIGN = "design", "Design"
        OTHER = "other", "Other"

    name = models.CharField("Nom", max_length=80)
    category = models.CharField(
        "Kategoriya", max_length=20, choices=Category.choices, default=Category.OTHER
    )
    icon_url = models.URLField("Ikonka URL", blank=True)
    proficiency_level = models.PositiveSmallIntegerField(
        "Daraja (1-100)",
        default=50,
        validators=[MinValueValidator(1), MaxValueValidator(100)],
    )
    years_experience = models.DecimalField(
        "Tajriba (yil)", max_digits=4, decimal_places=1, default=0
    )
    order = models.PositiveIntegerField("Tartib", default=0)

    class Meta:
        verbose_name = "Ko'nikma"
        verbose_name_plural = "Ko'nikmalar"
        ordering = ["category", "order", "-proficiency_level"]

    def __str__(self) -> str:
        return f"{self.name} ({self.get_category_display()})"
