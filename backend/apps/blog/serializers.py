from rest_framework import serializers

from .models import BlogPost, Category, Tag

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name_uz", "name_en", "name_ru", "slug"]

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name", "slug"]

class BlogPostListSerializer(serializers.ModelSerializer):
    """Ro'yxat uchun — kontentsiz (yengil)."""

    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = BlogPost
        fields = [
            "id", "title_uz", "title_en", "title_ru", "slug",
            "cover_image", "category", "tags", "language",
            "read_time", "views_count", "published_at", "created_at",
        ]

class BlogPostDetailSerializer(serializers.ModelSerializer):
    """To'liq maqola — kontent bilan."""

    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = BlogPost
        fields = [
            "id", "title_uz", "title_en", "title_ru", "slug",
            "content_uz", "content_en", "content_ru",
            "cover_image", "category", "tags", "language",
            "read_time", "views_count", "published_at", "created_at", "updated_at",
        ]
