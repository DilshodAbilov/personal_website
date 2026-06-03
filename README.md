# Personal Dev Space

Shaxsiy Portfolio, Blog va Ilmiy Ishlar Platformasi.
To'liq texnik topshiriq: [`TZ.md`](./TZ.md).

## Texnologiyalar

- **Frontend:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · MDX · next-intl
- **Backend:** Django 5 · DRF · Celery · Redis · MinIO
- **Database:** PostgreSQL 16
- **Infra:** Docker Compose · Nginx

## Loyiha strukturasi

```
mywebsite/
├── backend/            # Django + DRF
├── frontend/           # Next.js
├── nginx/conf.d/       # Reverse proxy konfiguratsiyasi
├── docker-compose.yml  # Local dev infratuzilma
├── .env.example        # Environment shabloni
└── TZ.md               # Texnik topshiriq
```

## Boshlash (local dev)

### 1. Environment

```bash
cp .env.example .env
# .env ichidagi qiymatlarni kerak bo'lsa o'zgartiring
```

### 2. Data servislarni ishga tushirish

```bash
docker compose up -d
```

Ishga tushadigan servislar:

| Servis     | Port | Manzil                          |
|------------|------|---------------------------------|
| PostgreSQL | 5432 | `localhost:5432`                |
| Redis      | 6379 | `localhost:6379`                |
| MinIO API  | 9000 | http://localhost:9000           |
| MinIO UI   | 9001 | http://localhost:9001 (console) |

Holatni tekshirish:

```bash
docker compose ps
```

To'xtatish:

```bash
docker compose down
```

### 3. Backend (Django) ishga tushirish

```bash
cd backend
.venv\Scripts\activate            # Windows (PowerShell: .venv\Scripts\Activate.ps1)
python manage.py migrate          # birinchi marta
python manage.py runserver        # http://localhost:8000
```

| Manzil                          | Tavsif            |
|---------------------------------|-------------------|
| http://localhost:8000/admin/    | Django admin panel |
| http://localhost:8000/api/docs/ | Swagger UI         |
| http://localhost:8000/api/schema/ | OpenAPI sxema    |

Dev superuser: `admin` / `admin12345` (keyin o'zgartiring).

## Ishlab chiqish bosqichlari

- [x] **1.1** — Loyiha skeleti + Docker infratuzilma
- [x] **1.2** — Django backend asoslari (DRF, Swagger, CORS, PostgreSQL)
- [ ] **1.3** — Modellar va admin panel
- [ ] **1.4** — REST API
- [ ] **1.5** — Next.js frontend asoslari
- [ ] **1.6** — Asosiy sahifalar
- [ ] **1.7** — Lokal deploy testi

Batafsil reja: `TZ.md` §13.
