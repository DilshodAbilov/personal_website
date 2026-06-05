"""Bazani boshlang'ich ma'lumot bilan to'ldiradi — faqat baza bo'sh bo'lsa.

Deploy paytida har safar ishlaydi, lekin ma'lumot allaqachon bor bo'lsa,
hech narsa qilmaydi (production'dagi o'zgarishlar saqlanib qoladi).
"""
from django.core.management import call_command
from django.core.management.base import BaseCommand

from apps.skills.models import Skill


class Command(BaseCommand):
    help = "Bo'sh bazaga boshlang'ich ma'lumotni (fixture) yuklaydi"

    def handle(self, *args, **options):
        if Skill.objects.exists():
            self.stdout.write("Ma'lumot allaqachon bor — fixture yuklanmadi.")
            return
        call_command("loaddata", "initial_data.json")
        self.stdout.write(
            self.style.SUCCESS("Boshlang'ich ma'lumot (fixture) yuklandi.")
        )
