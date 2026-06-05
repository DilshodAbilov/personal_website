from django.contrib import admin

from .models import ContactMessage, SocialLink

@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ("platform", "label", "url", "is_active", "order")
    list_filter = ("platform", "is_active")
    search_fields = ("label", "url")
    list_editable = ("is_active", "order")

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "subject_type", "is_read", "created_at")
    list_filter = ("subject_type", "is_read", "created_at")
    search_fields = ("name", "email", "message")
    readonly_fields = ("name", "email", "subject_type", "message", "ip_address", "created_at")
    list_editable = ("is_read",)
    date_hierarchy = "created_at"

    def has_add_permission(self, request):
        return False
