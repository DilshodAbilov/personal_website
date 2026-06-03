"""Asosiy URL yo'naltirgich."""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

api_v1_patterns = [
    path("blog/", include("apps.blog.urls")),
    path("portfolio/", include("apps.portfolio.urls")),
    path("academic/", include("apps.academic.urls")),
    path("skills/", include("apps.skills.urls")),
    path("experience/", include("apps.experience.urls")),
    path("contact/", include("apps.contact.urls")),
]

urlpatterns = [
    path("admin/", admin.site.urls),
    # API v1
    path("api/v1/", include((api_v1_patterns, "api"), namespace="v1")),
    # OpenAPI schema + Swagger / Redoc
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/docs/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path(
        "api/redoc/",
        SpectacularRedocView.as_view(url_name="schema"),
        name="redoc",
    ),
]

# Dev'da media fayllarni Django orqali ko'rsatish
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
