from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import GroceryItemViewSet

router = DefaultRouter()
router.register(r"items", GroceryItemViewSet, basename="item")

urlpatterns = [
    path("api/", include(router.urls)),
]
