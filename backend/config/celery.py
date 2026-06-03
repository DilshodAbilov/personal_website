"""Celery ilovasi konfiguratsiyasi."""
import os

from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.development")

app = Celery("devspace")

# Django sozlamalaridan CELERY_ bilan boshlanuvchi qiymatlarni o'qish
app.config_from_object("django.conf:settings", namespace="CELERY")

# Har bir ilovadagi tasks.py fayllarini avtomatik topish
app.autodiscover_tasks()


@app.task(bind=True, ignore_result=True)
def debug_task(self):
    print(f"Request: {self.request!r}")
