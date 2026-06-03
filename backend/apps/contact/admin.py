from django.contrib import admin

from .models import ContactMessage


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "subject_type", "is_read", "created_at")
    list_filter = ("subject_type", "is_read", "created_at")
    search_fields = ("name", "email", "message")
    readonly_fields = ("name", "email", "subject_type", "message", "ip_address", "created_at")
    list_editable = ("is_read",)
    date_hierarchy = "created_at"

    def has_add_permission(self, request):
        # Xabarlar faqat formadan keladi, qo'lda qo'shilmaydi
        return False
