from django.contrib.postgres.fields import ArrayField
from django.db import models


class Experience(models.Model):
    """Ish tajribasi yozuvi."""

    company = models.CharField("Kompaniya", max_length=200)
    position = models.CharField("Lavozim", max_length=200)

    description_uz = models.TextField("Tavsif (UZ)", blank=True)
    description_en = models.TextField("Tavsif (EN)", blank=True)
    description_ru = models.TextField("Tavsif (RU)", blank=True)

    start_date = models.DateField("Boshlanish sanasi")
    end_date = models.DateField("Tugash sanasi", blank=True, null=True, help_text="Bo'sh = hozirgi ish")

    technologies = ArrayField(
        models.CharField(max_length=50), verbose_name="Texnologiyalar", default=list, blank=True
    )
    responsibilities = ArrayField(
        models.CharField(max_length=255), verbose_name="Vazifalar", default=list, blank=True
    )
    order = models.PositiveIntegerField("Tartib", default=0)

    class Meta:
        verbose_name = "Ish tajribasi"
        verbose_name_plural = "Ish tajribalari"
        ordering = ["order", "-start_date"]

    @property
    def is_current(self) -> bool:
        return self.end_date is None

    def __str__(self) -> str:
        return f"{self.position} — {self.company}"
