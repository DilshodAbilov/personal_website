from django.db import models

from apps.common.models import Language, TimeStampedModel


class Category(models.Model):
    """Blog kategoriyasi (ko'p tilli nom)."""

    name_uz = models.CharField("Nom (UZ)", max_length=100)
    name_en = models.CharField("Nom (EN)", max_length=100, blank=True)
    name_ru = models.CharField("Nom (RU)", max_length=100, blank=True)
    slug = models.SlugField(max_length=120, unique=True)

    class Meta:
        verbose_name = "Kategoriya"
        verbose_name_plural = "Kategoriyalar"
        ordering = ["name_uz"]

    def __str__(self) -> str:
        return self.name_uz or self.name_en or self.slug


class Tag(models.Model):
    """Blog tegi."""

    name = models.CharField("Nom", max_length=60, unique=True)
    slug = models.SlugField(max_length=80, unique=True)

    class Meta:
        verbose_name = "Teg"
        verbose_name_plural = "Teglar"
        ordering = ["name"]

    def __str__(self) -> str:
        return self.name


class BlogPost(TimeStampedModel):
    """Blog maqolasi (UZ / EN / RU kontent)."""

    class Status(models.TextChoices):
        DRAFT = "draft", "Qoralama"
        PUBLISHED = "published", "Chop etilgan"

    # Sarlavhalar
    title_uz = models.CharField("Sarlavha (UZ)", max_length=255)
    title_en = models.CharField("Sarlavha (EN)", max_length=255, blank=True)
    title_ru = models.CharField("Sarlavha (RU)", max_length=255, blank=True)

    # Kontent (Markdown / MDX)
    content_uz = models.TextField("Kontent (UZ)", blank=True)
    content_en = models.TextField("Kontent (EN)", blank=True)
    content_ru = models.TextField("Kontent (RU)", blank=True)

    slug = models.SlugField(max_length=280, unique=True)
    cover_image = models.ImageField(
        "Muqova rasmi", upload_to="blog/covers/", blank=True, null=True
    )

    category = models.ForeignKey(
        Category,
        verbose_name="Kategoriya",
        related_name="posts",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    tags = models.ManyToManyField(Tag, verbose_name="Teglar", related_name="posts", blank=True)

    status = models.CharField(
        "Holat", max_length=10, choices=Status.choices, default=Status.DRAFT
    )
    language = models.CharField(
        "Asosiy til", max_length=2, choices=Language.choices, default=Language.UZ
    )

    read_time = models.PositiveIntegerField("O'qish vaqti (daqiqa)", default=0)
    views_count = models.PositiveIntegerField("Ko'rishlar soni", default=0)
    published_at = models.DateTimeField("Chop etilgan vaqt", blank=True, null=True)

    class Meta:
        verbose_name = "Maqola"
        verbose_name_plural = "Maqolalar"
        ordering = ["-published_at", "-created_at"]

    def __str__(self) -> str:
        return self.title_uz or self.title_en or self.slug
