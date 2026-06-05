from django.contrib.postgres.fields import ArrayField
from django.db import models

from apps.common.models import Language, TimeStampedModel

class AcademicWork(TimeStampedModel):
    """Ilmiy ish (tezis, kurs ishi, DGU, maqola, konferensiya)."""

    class WorkType(models.TextChoices):
        THESIS = "thesis", "Tezis"
        COURSE = "course", "Kurs ishi"
        DGU = "dgu", "DGU (amaliyot hisoboti)"
        ARTICLE = "article", "Ilmiy maqola"
        CONFERENCE = "conference", "Konferensiya maqolasi"
        CERTIFICATE = "certificate", "Sertifikat / Yutuq"

    title_uz = models.CharField("Sarlavha (UZ)", max_length=300)
    title_en = models.CharField("Sarlavha (EN)", max_length=300, blank=True)
    title_ru = models.CharField("Sarlavha (RU)", max_length=300, blank=True)

    abstract_uz = models.TextField("Annotatsiya (UZ)", blank=True)
    abstract_en = models.TextField("Annotatsiya (EN)", blank=True)
    abstract_ru = models.TextField("Annotatsiya (RU)", blank=True)

    work_type = models.CharField("Tur", max_length=20, choices=WorkType.choices)
    year = models.PositiveIntegerField("Yil")
    language = models.CharField(
        "Til", max_length=2, choices=Language.choices, default=Language.UZ
    )

    keywords = ArrayField(
        models.CharField(max_length=60), verbose_name="Kalit so'zlar", default=list, blank=True
    )
    authors = ArrayField(
        models.CharField(max_length=120), verbose_name="Mualliflar", default=list, blank=True
    )
    supervisor = models.CharField("Rahbar", max_length=200, blank=True)

    file = models.FileField("Fayl (PDF)", upload_to="academic/", blank=True, null=True)
    is_full_text_public = models.BooleanField("To'liq matn ochiq", default=False)

    source_url = models.URLField("Nashr / manba havolasi", blank=True)
    doi = models.URLField("DOI havolasi", blank=True)
    openaire_url = models.URLField("OpenAIRE havolasi", blank=True)

    certificate_url = models.CharField("Sertifikat rasmi", max_length=300, blank=True)
    diploma_url = models.CharField("Diplom rasmi", max_length=300, blank=True)

    views_count = models.PositiveIntegerField("Ko'rishlar", default=0)
    downloads_count = models.PositiveIntegerField("Yuklab olishlar", default=0)

    class Meta:
        verbose_name = "Ilmiy ish"
        verbose_name_plural = "Ilmiy ishlar"
        ordering = ["-year", "-created_at"]

    def __str__(self) -> str:
        return f"{self.title_uz} ({self.year})"
