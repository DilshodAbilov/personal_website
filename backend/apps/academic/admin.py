from django.contrib import admin

from .models import AcademicWork


@admin.register(AcademicWork)
class AcademicWorkAdmin(admin.ModelAdmin):
    list_display = ("title_uz", "work_type", "year", "language", "is_full_text_public", "downloads_count")
    list_filter = ("work_type", "year", "language", "is_full_text_public")
    search_fields = ("title_uz", "title_en", "title_ru", "supervisor")
    readonly_fields = ("views_count", "downloads_count", "created_at", "updated_at")
    fieldsets = (
        ("Sarlavhalar", {"fields": ("title_uz", "title_en", "title_ru")}),
        ("Annotatsiya", {"fields": ("abstract_uz", "abstract_en", "abstract_ru")}),
        ("Ma'lumotlar", {"fields": ("work_type", "year", "language", "keywords", "authors", "supervisor")}),
        ("Fayl", {"fields": ("file", "is_full_text_public")}),
        ("Statistika", {"fields": ("views_count", "downloads_count", "created_at", "updated_at")}),
    )
