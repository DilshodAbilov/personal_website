from django.db.models import F
from rest_framework import viewsets
from rest_framework.response import Response

from .filters import BlogPostFilter
from .models import BlogPost, Category, Tag
from .serializers import (
    BlogPostDetailSerializer,
    BlogPostListSerializer,
    CategorySerializer,
    TagSerializer,
)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = "slug"


class TagViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    lookup_field = "slug"


class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    """Faqat chop etilgan maqolalar. Slug bo'yicha qidiriladi."""

    lookup_field = "slug"
    filterset_class = BlogPostFilter
    search_fields = ["title_uz", "title_en", "title_ru"]
    ordering_fields = ["published_at", "created_at", "views_count"]

    def get_queryset(self):
        return (
            BlogPost.objects.filter(status=BlogPost.Status.PUBLISHED)
            .select_related("category")
            .prefetch_related("tags")
        )

    def get_serializer_class(self):
        if self.action == "retrieve":
            return BlogPostDetailSerializer
        return BlogPostListSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        # Ko'rishlar sonini oshirish (poyga holatisiz)
        BlogPost.objects.filter(pk=instance.pk).update(views_count=F("views_count") + 1)
        instance.refresh_from_db(fields=["views_count"])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
