from django.contrib import admin

from .models import BlogPost, Category, Tag


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name_uz", "name_en", "slug")
    search_fields = ("name_uz", "name_en", "name_ru")
    prepopulated_fields = {"slug": ("name_uz",)}


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    search_fields = ("name",)
    prepopulated_fields = {"slug": ("name",)}


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ("title_uz", "status", "language", "category", "views_count", "published_at")
    list_filter = ("status", "language", "category", "tags")
    search_fields = ("title_uz", "title_en", "title_ru", "content_uz")
    prepopulated_fields = {"slug": ("title_uz",)}
    filter_horizontal = ("tags",)
    date_hierarchy = "published_at"
    readonly_fields = ("views_count", "created_at", "updated_at")
    fieldsets = (
        ("Sarlavhalar", {"fields": ("title_uz", "title_en", "title_ru", "slug")}),
        ("Kontent", {"fields": ("content_uz", "content_en", "content_ru")}),
        ("Meta", {"fields": ("cover_image", "category", "tags", "language", "read_time")}),
        ("Holat", {"fields": ("status", "published_at", "views_count", "created_at", "updated_at")}),
    )
