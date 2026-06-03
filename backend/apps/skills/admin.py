from django.contrib import admin

from .models import Skill


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "proficiency_level", "years_experience", "order")
    list_filter = ("category",)
    search_fields = ("name",)
    list_editable = ("proficiency_level", "order")
