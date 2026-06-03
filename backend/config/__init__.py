"""Django loyiha konfiguratsiyasi.

Celery ilovasi Django ishga tushganda import qilinadi, shunda
@shared_task dekoratorlari to'g'ri ilovadan foydalanadi.
"""
from .celery import app as celery_app

__all__ = ("celery_app",)
