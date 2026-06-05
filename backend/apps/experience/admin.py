from django.contrib import admin

from .models import Experience

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ("position", "company", "start_date", "end_date", "is_current", "order")
    search_fields = ("company", "position")
    list_editable = ("order",)

    @admin.display(boolean=True, description="Hozirgi")
    def is_current(self, obj):
        return obj.is_current
