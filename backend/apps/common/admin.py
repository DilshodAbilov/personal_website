from django.contrib import admin

from .models import SiteProfile


@admin.register(SiteProfile)
class SiteProfileAdmin(admin.ModelAdmin):
    list_display = ("__str__", "avatar", "updated_at")

    def has_add_permission(self, request):
        # Faqat bitta yozuv bo'lishi mumkin
        return not SiteProfile.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False
