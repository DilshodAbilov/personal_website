"""Ish tajribasini bazaga yuklaydi.

Ishlatish:
    python manage.py seed_experience
"""
import datetime

from django.core.management.base import BaseCommand

from apps.experience.models import Experience

EXPERIENCES = [
    {
        "company": "Yagona Integrator UZINFOCOM",
        "position": "Backend Developer",
        "description_uz": "Davlat veb-loyihalari uchun ishonchli backend tizimlar ishlab chiqaman: REST API, ma'lumotlar bazasi va integratsiyalar.",
        "description_en": "Building reliable backend systems for government web projects: REST APIs, databases and integrations.",
        "description_ru": "Разрабатываю надёжные backend-системы для государственных веб-проектов: REST API, базы данных и интеграции.",
        "start_date": datetime.date(2026, 1, 5),
        "end_date": None,
        "technologies": ["Python", "Django", "Django REST Framework", "PostgreSQL", "Docker", "Redis"],
        "responsibilities": [
            "REST API va backend servislarni loyihalash va ishlab chiqish",
            "PostgreSQL bilan ma'lumotlar bazasi modellari va optimizatsiya",
            "Docker yordamida konteynerlash va deploy",
            "Tashqi tizimlar bilan integratsiyalar",
        ],
        "order": 0,
    },
]

class Command(BaseCommand):
    help = "Ish tajribasini bazaga yuklaydi"

    def handle(self, *args, **options):
        created, updated = 0, 0
        for data in EXPERIENCES:
            company = data.pop("company")
            position = data.pop("position")
            _, is_created = Experience.objects.update_or_create(
                company=company, position=position, defaults=data
            )
            if is_created:
                created += 1
            else:
                updated += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Tayyor: {created} ta yangi, {updated} ta yangilandi "
                f"(jami {Experience.objects.count()} ta ish tajribasi)."
            )
        )
