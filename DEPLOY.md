# Railway Deploy — qadamlab yo'riqnoma

Loyiha 3 qismdan iborat: **PostgreSQL**, **Backend (Django)**, **Frontend (Next.js)**.

---

## 0. Tayyorgarlik
- GitHub repo: `DilshodAbilov/personal_website` (allaqachon push qilingan)
- Railway hisobi: railway.app

**SECRET_KEY yarating** (terminalda):
```
python -c "import secrets; print(secrets.token_urlsafe(50))"
```
Chiqgan satrni saqlang — backend `DJANGO_SECRET_KEY` uchun kerak.

---

## 1. Railway loyiha + PostgreSQL
1. railway.app → **New Project** → **Deploy from GitHub repo** → `personal_website` ni tanlang.
2. Loyiha ichida **+ New** → **Database** → **Add PostgreSQL**.

---

## 2. Backend servis (Django)
Repo'dan yaratilgan servisni tanlang (yoki **+ New → GitHub repo**), so'ng **Settings**:
- **Root Directory:** `backend`
- **Networking → Generate Domain** (masalan `personal-website-backend.up.railway.app`) — bu domenni eslab qoling.

**Variables** (env) qo'shing:
| Kalit | Qiymat |
|---|---|
| `DJANGO_SETTINGS_MODULE` | `config.settings.production` |
| `DJANGO_SECRET_KEY` | (yuqorida yaratgan satr) |
| `DJANGO_DEBUG` | `False` |
| `DATABASE_URL` | `${{Postgres.DATABASE_URL}}` (reference — Postgres'ga ulaydi) |
| `DJANGO_ALLOWED_HOSTS` | backend domeni (masalan `personal-website-backend.up.railway.app`) |
| `CORS_ALLOWED_ORIGINS` | frontend domeni (3-bosqichdan keyin qo'shasiz) |

> `migrate → collectstatic → bootstrap (fixture) → gunicorn` avtomatik ishga tushadi (Procfile).
> Birinchi deploy'da fixture yuklanadi → barcha ma'lumotlaringiz tiklanadi.

---

## 3. Frontend servis (Next.js)
**+ New → GitHub repo** → yana shu repo. **Settings**:
- **Root Directory:** `frontend`
- **Networking → Generate Domain** (masalan `personal-website.up.railway.app`)

**Variables:**
| Kalit | Qiymat |
|---|---|
| `NEXT_PUBLIC_API_URL` | `https://<backend-domeni>/api/v1` |

> Masalan: `https://personal-website-backend.up.railway.app/api/v1`

---

## 4. CORS ni yopish
Frontend domeni tayyor bo'lgach, **Backend → Variables**:
- `CORS_ALLOWED_ORIGINS` = `https://<frontend-domeni>`

So'ng backendni **Redeploy** qiling.

---

## 5. Admin foydalanuvchi yarating
Backend servis → **shell** (yoki Railway CLI):
```
python manage.py createsuperuser
```
So'ng `https://<backend-domeni>/admin/` orqali kiring.

---

## Eslatmalar
- **Rasmlar** (sertifikat, logo, foto) `frontend/public`'da — avtomatik ishlaydi.
- **Admin'dan yuklangan fayllar** (avatar, PDF) Railway diskida vaqtinchalik — har redeploy'da o'chadi. Doimiy saqlash uchun S3/R2 yoki Railway Volume sozlang (keyinroq).
- **Redis/Celery** ishlatilmaydi (cache locmem'ga tushadi) — qo'shimcha servis shart emas.
