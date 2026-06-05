"""Boshlang'ich ko'nikmalar (skills) ro'yxatini bazaga yuklaydi.

Ishlatish:
    python manage.py seed_skills

Idempotent: nom bo'yicha mavjud bo'lsa yangilaydi, bo'lmasa yaratadi.
Darajalar/yillarni keyin admin paneldan o'zingizga moslab o'zgartiring.
"""
from django.core.management.base import BaseCommand

from apps.skills.models import Skill

# (nom, kategoriya, daraja 1-100, tajriba yil, tartib)
SKILLS = [
    # Backend
    ("Python", Skill.Category.BACKEND, 90, 2.5, 1),
    ("Django", Skill.Category.BACKEND, 88, 2, 2),
    ("Django REST Framework", Skill.Category.BACKEND, 85, 2, 3),
    ("Celery", Skill.Category.BACKEND, 70, 1, 4),
    ("REST API", Skill.Category.BACKEND, 82, 2, 5),
    # Database
    ("PostgreSQL", Skill.Category.DATABASE, 82, 1.5, 1),
    ("Redis", Skill.Category.DATABASE, 70, 1, 2),
    ("SQL", Skill.Category.DATABASE, 80, 2, 3),
    # DevOps
    ("Docker", Skill.Category.DEVOPS, 78, 1.5, 1),
    ("Nginx", Skill.Category.DEVOPS, 65, 1, 2),
    ("Linux", Skill.Category.DEVOPS, 72, 2, 3),
    ("Prometheus", Skill.Category.DEVOPS, 55, 0.5, 4),
    ("Grafana", Skill.Category.DEVOPS, 55, 0.5, 5),
    ("MinIO", Skill.Category.DEVOPS, 60, 0.5, 6),
    # Tools
    ("Git", Skill.Category.TOOLS, 85, 2.5, 1),
    ("GitHub", Skill.Category.TOOLS, 82, 2.5, 2),
    ("GitLab", Skill.Category.TOOLS, 75, 1.5, 3),
    ("Postman", Skill.Category.TOOLS, 75, 2, 4),
    ("VS Code", Skill.Category.TOOLS, 85, 2.5, 5),
    # AI / ML
    ("AI / LLM", Skill.Category.OTHER, 72, 1, 1),
    ("Machine Learning", Skill.Category.OTHER, 65, 1, 2),
    ("Computer Vision (YOLO)", Skill.Category.OTHER, 62, 1, 3),
    ("OpenCV", Skill.Category.OTHER, 60, 1, 4),
]


class Command(BaseCommand):
    help = "Boshlang'ich ko'nikmalar ro'yxatini bazaga yuklaydi"

    def handle(self, *args, **options):
        created, updated = 0, 0
        for name, category, level, years, order in SKILLS:
            obj, is_created = Skill.objects.update_or_create(
                name=name,
                defaults={
                    "category": category,
                    "proficiency_level": level,
                    "years_experience": years,
                    "order": order,
                },
            )
            if is_created:
                created += 1
            else:
                updated += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Tayyor: {created} ta yangi qo'shildi, {updated} ta yangilandi "
                f"(jami {Skill.objects.count()} ta ko'nikma)."
            )
        )
