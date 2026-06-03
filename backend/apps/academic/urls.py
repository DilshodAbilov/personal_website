from rest_framework.routers import DefaultRouter

from .views import AcademicWorkViewSet

router = DefaultRouter()
router.register("works", AcademicWorkViewSet, basename="work")

urlpatterns = router.urls
