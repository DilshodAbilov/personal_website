from django.contrib import admin

from .models import Project, ProjectImage


class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("name", "project_type", "status", "is_featured", "order")
    list_filter = ("project_type", "status", "is_featured")
    search_fields = ("name", "description_uz", "description_en")
    list_editable = ("order", "is_featured")
    inlines = [ProjectImageInline]
    fieldsets = (
        ("Asosiy", {"fields": ("name", "technologies", "project_type", "status")}),
        ("Tavsif", {"fields": ("description_uz", "description_en", "description_ru")}),
        ("Havolalar", {"fields": ("github_url", "demo_url")}),
        ("Sozlamalar", {"fields": ("is_featured", "order")}),
    )
