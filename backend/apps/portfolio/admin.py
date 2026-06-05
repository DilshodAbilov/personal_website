from django.contrib import admin

from .models import Project, ProjectImage


class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("name", "project_type", "status", "is_featured", "is_private", "order")
    list_filter = ("project_type", "status", "is_featured", "is_private")
    search_fields = ("name", "description_uz", "description_en")
    list_editable = ("order", "is_featured", "is_private")
    inlines = [ProjectImageInline]
    fieldsets = (
        ("Asosiy", {"fields": ("name", "technologies", "project_type", "status")}),
        ("Tavsif", {"fields": ("description_uz", "description_en", "description_ru")}),
        ("Havolalar", {"fields": ("github_url", "demo_url", "is_private")}),
        ("Sozlamalar", {"fields": ("is_featured", "order")}),
    )
