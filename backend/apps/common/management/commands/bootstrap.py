"""Deploy paytida: bo'sh bazaga fixture yuklaydi va env'dan superuser yaratadi.

Ikkalasi ham idempotent: ma'lumot/superuser allaqachon bor bo'lsa, qayta yaratmaydi.
"""
import os

from django.contrib.auth import get_user_model
from django.core.management import call_command
from django.core.management.base import BaseCommand

from apps.skills.models import Skill


class Command(BaseCommand):
    help = "Boshlang'ich ma'lumot (fixture) + env'dan superuser yaratadi"

    def handle(self, *args, **options):
        if Skill.objects.exists():
            self.stdout.write("Ma'lumot allaqachon bor — fixture yuklanmadi.")
        else:
            call_command("loaddata", "initial_data.json")
            self.stdout.write(
                self.style.SUCCESS("Boshlang'ich ma'lumot (fixture) yuklandi.")
            )

        self._ensure_superuser()

    def _ensure_superuser(self):
        username = os.environ.get("DJANGO_SUPERUSER_USERNAME")
        password = os.environ.get("DJANGO_SUPERUSER_PASSWORD")
        email = os.environ.get("DJANGO_SUPERUSER_EMAIL", "")
        if not (username and password):
            return
        User = get_user_model()
        if User.objects.filter(username=username).exists():
            self.stdout.write(f"Superuser '{username}' allaqachon bor.")
            return
        User.objects.create_superuser(username=username, email=email, password=password)
        self.stdout.write(
            self.style.SUCCESS(f"Superuser '{username}' yaratildi.")
        )
