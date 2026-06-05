from django.urls import path

from .views import ContactMessageCreateView, SocialLinkListView

urlpatterns = [
    path("send/", ContactMessageCreateView.as_view(), name="contact-send"),
    path("socials/", SocialLinkListView.as_view(), name="contact-socials"),
]
