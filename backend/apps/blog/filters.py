import django_filters

from .models import BlogPost

class BlogPostFilter(django_filters.FilterSet):
    category = django_filters.CharFilter(field_name="category__slug")
    tag = django_filters.CharFilter(field_name="tags__slug")

    class Meta:
        model = BlogPost
        fields = ["category", "tag", "language"]
