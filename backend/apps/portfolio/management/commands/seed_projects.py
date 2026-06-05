"""Portfolio loyihalarini bazaga yuklaydi.

Ishlatish:
    python manage.py seed_projects

Idempotent: nom bo'yicha mavjud bo'lsa yangilaydi, bo'lmasa yaratadi.
"""
from django.core.management.base import BaseCommand

from apps.portfolio.models import Project

P = Project.ProjectType
S = Project.Status

PROJECTS = [
    {
        "name": "Bellissimo Bot",
        "description_uz": "Bellissimo uslubidagi Telegram bot — taom va pitsa buyurtma qilish, menyu, savatcha hamda admin boshqaruvi.",
        "description_en": "A Bellissimo-style Telegram bot for ordering food and pizza — menu, cart and admin management.",
        "description_ru": "Telegram-бот в стиле Bellissimo для заказа еды и пиццы — меню, корзина и админ-панель.",
        "technologies": ["Python", "Aiogram", "PostgreSQL", "Telegram Bot API"],
        "github_url": "https://github.com/DilshodAbilov/BellissimoBot",
        "project_type": P.PET,
        "status": S.COMPLETED,
        "is_featured": True,
        "is_private": False,
        "order": 1,
    },
    {
        "name": "Voice AI Agent",
        "description_uz": "agent.theten.ai uslubidagi ovozli AI-agent — nutqni tushunadi va real vaqtda ovozli javob beradi.",
        "description_en": "A voice AI agent inspired by agent.theten.ai — understands speech and replies by voice in real time.",
        "description_ru": "Голосовой AI-агент в стиле agent.theten.ai — понимает речь и отвечает голосом в реальном времени.",
        "technologies": ["Python", "AI", "LLM", "Speech-to-Text"],
        "github_url": "https://github.com/DilshodAbilov/voice",
        "project_type": P.PET,
        "status": S.ACTIVE,
        "is_featured": True,
        "is_private": True,
        "order": 2,
    },
    {
        "name": "Education Platform",
        "description_uz": "Ta'lim platformasi — kurslar, darslar va o'quvchilarni boshqarish uchun veb-sayt.",
        "description_en": "An education platform — a website to manage courses, lessons and students.",
        "description_ru": "Образовательная платформа — веб-сайт для управления курсами, уроками и студентами.",
        "technologies": ["Python", "Django", "PostgreSQL", "HTML/CSS"],
        "github_url": "https://github.com/DilshodAbilov/EducationPlatform",
        "project_type": P.PET,
        "status": S.COMPLETED,
        "is_featured": True,
        "is_private": True,
        "order": 3,
    },
    {
        "name": "Kahoot Clone",
        "description_uz": "Kahoot kabi ishlaydigan real vaqtli interaktiv viktorina ilovasi — savol-javob va admin paneli.",
        "description_en": "A real-time interactive quiz app that works like Kahoot — Q&A and an admin panel.",
        "description_ru": "Интерактивное приложение-викторина в реальном времени в стиле Kahoot — вопросы-ответы и админ-панель.",
        "technologies": ["Python", "Django", "WebSocket", "PostgreSQL"],
        "github_url": "https://github.com/DilshodAbilov/kahoot2",
        "project_type": P.PET,
        "status": S.COMPLETED,
        "is_featured": False,
        "is_private": False,
        "order": 4,
    },
    {
        "name": "AI Chatbot",
        "description_uz": "Sun'iy intellekt yordamida ishlaydigan chat-bot — foydalanuvchi savollariga aqlli javoblar beradi.",
        "description_en": "An AI-powered chatbot that gives smart answers to user questions.",
        "description_ru": "Чат-бот на базе ИИ, который даёт умные ответы на вопросы пользователей.",
        "technologies": ["Python", "AI", "LLM", "NLP"],
        "github_url": "https://github.com/DilshodAbilov/ChatBot",
        "project_type": P.PET,
        "status": S.COMPLETED,
        "is_featured": False,
        "is_private": True,
        "order": 5,
    },
    {
        "name": "Git Report — AI commit tahlilchisi",
        "description_uz": "GitLab va GitHub commitlari (diff) ni o'qib, AI yordamida tahlil qiladi va har bir dasturchi qancha ishlaganini hisobot qilib chiqaradi.",
        "description_en": "Reads GitLab and GitHub commit diffs and uses AI to analyze and report how much each developer contributed.",
        "description_ru": "Читает диффы коммитов GitLab и GitHub и с помощью ИИ анализирует и формирует отчёт о вкладе каждого разработчика.",
        "technologies": ["Python", "AI", "LLM", "GitLab API", "GitHub API"],
        "github_url": "https://u-gitlab.uzinfocom.uz/git-report/backend",
        "project_type": P.WORK,
        "status": S.ACTIVE,
        "is_featured": True,
        "is_private": True,
        "order": 6,
    },
    {
        "name": "Davlat loyihalari (UZINFOCOM)",
        "description_uz": "Yagona Integrator UZINFOCOM'da backend dasturchi sifatida davlat veb-loyihalari ustida ishladim.",
        "description_en": "Worked as a backend developer on government web projects at UZINFOCOM (Yagona Integrator).",
        "description_ru": "Работал backend-разработчиком над государственными веб-проектами в UZINFOCOM.",
        "technologies": ["Python", "Django", "PostgreSQL", "Docker"],
        "github_url": "",
        "project_type": P.WORK,
        "status": S.ACTIVE,
        "is_featured": False,
        "is_private": False,
        "order": 7,
    },
]


class Command(BaseCommand):
    help = "Portfolio loyihalarini bazaga yuklaydi"

    def handle(self, *args, **options):
        created, updated = 0, 0
        for data in PROJECTS:
            name = data.pop("name")
            obj, is_created = Project.objects.update_or_create(
                name=name, defaults=data
            )
            if is_created:
                created += 1
            else:
                updated += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Tayyor: {created} ta yangi qo'shildi, {updated} ta yangilandi "
                f"(jami {Project.objects.count()} ta loyiha)."
            )
        )
