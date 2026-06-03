"""Lokal ishlab chiqish (development) sozlamalari."""
from .base import *  # noqa: F401,F403
from .base import env_list

DEBUG = True

# Dev'da barcha local hostlarga ruxsat
ALLOWED_HOSTS = env_list("DJANGO_ALLOWED_HOSTS", "localhost,127.0.0.1,0.0.0.0")

# Email — konsolga chiqarish (haqiqiy yuborilmaydi)
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

# Dev'da CORS'ni biroz erkinroq qoldirish ham mumkin (ixtiyoriy)
# CORS_ALLOW_ALL_ORIGINS = True
