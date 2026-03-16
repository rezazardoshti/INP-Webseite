from django.urls import path
from .views import ActiveServiceListView, ServiceDetailView


urlpatterns = [
    path("services/", ActiveServiceListView.as_view(), name="service-list"),
    path("services/<slug:slug>/", ServiceDetailView.as_view(), name="service-detail"),
]