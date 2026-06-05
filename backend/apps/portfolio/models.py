from django.contrib.postgres.fields import ArrayField
from django.db import models

from apps.common.models import TimeStampedModel


class Project(TimeStampedModel):
    """Portfolio loyihasi."""

    class ProjectType(models.TextChoices):
        PET = "pet", "Pet Project"
        WORK = "work", "Work Project"
        OPEN_SOURCE = "opensource", "Open Source"

    class Status(models.TextChoices):
        ACTIVE = "active", "Faol"
        COMPLETED = "completed", "Yakunlangan"
        ARCHIVED = "archived", "Arxiv"

    name = models.CharField("Nom", max_length=200)
    description_uz = models.TextField("Tavsif (UZ)", blank=True)
    description_en = models.TextField("Tavsif (EN)", blank=True)
    description_ru = models.TextField("Tavsif (RU)", blank=True)

    technologies = ArrayField(
        models.CharField(max_length=50),
        verbose_name="Texnologiyalar",
        default=list,
        blank=True,
    )
    github_url = models.URLField("GitHub havola", blank=True)
    demo_url = models.URLField("Live Demo havola", blank=True)
    is_private = models.BooleanField(
        "Private repo",
        default=False,
        help_text="Belgilansa, saytda 'private — ruxsat etilganlar kiradi' ogohlantirishi chiqadi",
    )

    project_type = models.CharField(
        "Loyiha turi", max_length=20, choices=ProjectType.choices, default=ProjectType.PET
    )
    status = models.CharField(
        "Status", max_length=20, choices=Status.choices, default=Status.ACTIVE
    )
    is_featured = models.BooleanField("Tanlangan (featured)", default=False)
    order = models.PositiveIntegerField("Tartib", default=0)

    class Meta:
        verbose_name = "Loyiha"
        verbose_name_plural = "Loyihalar"
        ordering = ["order", "-created_at"]

    def __str__(self) -> str:
        return self.name


class ProjectImage(models.Model):
    """Loyiha skrinshoti / rasmi."""

    project = models.ForeignKey(
        Project, related_name="images", on_delete=models.CASCADE, verbose_name="Loyiha"
    )
    image = models.ImageField("Rasm", upload_to="projects/")
    caption = models.CharField("Izoh", max_length=200, blank=True)
    order = models.PositiveIntegerField("Tartib", default=0)

    class Meta:
        verbose_name = "Loyiha rasmi"
        verbose_name_plural = "Loyiha rasmlari"
        ordering = ["order"]

    def __str__(self) -> str:
        return f"{self.project.name} — rasm {self.pk}"
