from django.urls import path
from .views import (
    ActiveGalleryListView,
    GalleryCreateView,
    MediaItemCreateView,
    GalleryDetailView,
)

urlpatterns = [
    path("galleries/", ActiveGalleryListView.as_view(), name="gallery-list"),
    path("galleries/create/", GalleryCreateView.as_view(), name="gallery-create"),
    path("galleries/<int:pk>/", GalleryDetailView.as_view(), name="gallery-detail"),
    path("media-items/create/", MediaItemCreateView.as_view(), name="media-item-create"),
]