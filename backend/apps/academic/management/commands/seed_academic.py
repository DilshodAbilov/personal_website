"""Ilmiy ishlarni (maqola, tezis, DGU) bazaga yuklaydi.

Ishlatish:
    python manage.py seed_academic

PDF fayllarni keyin admin paneldan har biriga yuklang.
Idempotent: sarlavha (UZ) bo'yicha yangilaydi yoki yaratadi.
"""
from django.core.management.base import BaseCommand

from apps.academic.models import AcademicWork

W = AcademicWork.WorkType

WORKS = [
    {
        "title_uz": "Controlling Information Reliability at Border Points",
        "title_en": "Controlling Information Reliability at Border Points",
        "abstract_uz": "ICMSI — Multidisiplinar fanlar va innovatsiyalar bo'yicha xalqaro konferensiya doirasidagi ilmiy maqola.",
        "work_type": W.CONFERENCE,
        "year": 2026,
        "language": "en",
        "keywords": ["axborot xavfsizligi", "chegara nazorati", "ishonchlilik"],
        "authors": ["Abilov Dilshod Bekzod o'g'li"],
        "source_url": "https://worldsiencepub.com/index.php/icmsi/article/view/10698",
        "doi": "https://doi.org/10.5281/zenodo.20522198",
        "openaire_url": "https://explore.openaire.eu/search/result?pid=10.5281/zenodo.20522198",
        "certificate_url": "/img_9.png",
    },
    {
        "title_uz": "Problems and Solutions of Information Exchange in Integrated Communication Systems",
        "title_en": "Problems and Solutions of Information Exchange in Integrated Communication Systems",
        "abstract_uz": "EIMRC — Ethiopian International Multidisciplinary Research Conferences doirasidagi ilmiy maqola.",
        "work_type": W.CONFERENCE,
        "year": 2026,
        "language": "en",
        "keywords": ["integratsiyalashgan tizimlar", "axborot almashinuvi", "aloqa"],
        "authors": ["Abilov Dilshod Bekzod o'g'li"],
        "source_url": "https://eijmr.org/conferences/index.php/eimrc/article/view/2338",
        "doi": "https://doi.org/10.5281/zenodo.20527153",
        "openaire_url": "https://explore.openaire.eu/search/result?pid=10.5281/zenodo.20527153",
        "certificate_url": "/img_10.png",
    },
    {
        "title_uz": "Chegara punktlarida axborot oqimlarini markazlashtirish va standartlashtirish mexanizmlari",
        "abstract_uz": "“Taraqqiyot spektri” elektron jurnalining 2-jild 5-sonida chop etilgan ilmiy maqola.",
        "work_type": W.ARTICLE,
        "year": 2026,
        "language": "uz",
        "keywords": ["axborot oqimlari", "markazlashtirish", "standartlashtirish"],
        "authors": ["Abilov Dilshod Bekzod o'g'li"],
        "supervisor": "Raimjonova G.I",
        "source_url": "https://unipublish.uz/index.php/fivti/article/view/639",
        "certificate_url": "/img_11.png",
        "diploma_url": "/img_12.png",
    },
    {
        "title_uz": "Sun'iy intellekt nazariyasi va amaliyoti: tajriba, muammolar va istiqbollar",
        "abstract_uz": "“Sun'iy intellekt nazariyasi va amaliyoti: tajriba, muammolar va istiqbollar” mavzusidagi 2-Respublika ilmiy-amaliy anjumani tezisi.",
        "work_type": W.THESIS,
        "year": 2025,
        "language": "uz",
        "keywords": ["sun'iy intellekt", "mashinali o'qitish"],
        "authors": ["Abilov Dilshod Bekzod o'g'li"],
    },
    {
        "title_uz": "“Kvark” dasturi uchun guvohnoma (DGU № 57062)",
        "abstract_uz": "Elektron hisoblash mashinalari uchun yaratilgan “Kvark” dasturining O'zbekiston Respublikasi Adliya vazirligida rasmiy ro'yxatdan o'tkazilganligi to'g'risidagi guvohnoma.",
        "work_type": W.DGU,
        "year": 2025,
        "language": "uz",
        "keywords": ["DGU", "Kvark", "dasturiy ta'minot"],
        "authors": [
            "Rustamova Moxichexra Yaxshiboyevna",
            "Abilov Dilshod Bekzod o'g'li",
            "Avazbekov Sayfulla Ravshanbek o'g'li",
        ],
        "certificate_url": "/img_13.png",
    },
    {
        "title_uz": "Kelajak texnologiyalari ko'rgazmasi — Oliygoh kubogi",
        "abstract_uz": "Muhammad al-Xorazmiy nomidagi TATU “Oliygoh kubogi” tanlovlar haftaligi doirasidagi “Kelajak texnologiyalari ko'rgazmasi” musobaqasi ishtiroki uchun sertifikat.",
        "work_type": W.CERTIFICATE,
        "year": 2026,
        "language": "uz",
        "keywords": ["TATU", "ko'rgazma", "innovatsiya"],
        "authors": ["Abilov Dilshod Bekzod o'g'li"],
        "certificate_url": "/img_14.png",
    },
]


class Command(BaseCommand):
    help = "Ilmiy ishlarni (maqola, tezis, DGU) bazaga yuklaydi"

    def handle(self, *args, **options):
        created, updated = 0, 0
        for data in WORKS:
            title = data.pop("title_uz")
            obj, is_created = AcademicWork.objects.update_or_create(
                title_uz=title, defaults=data
            )
            if is_created:
                created += 1
            else:
                updated += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Tayyor: {created} ta yangi, {updated} ta yangilandi "
                f"(jami {AcademicWork.objects.count()} ta ilmiy ish)."
            )
        )
