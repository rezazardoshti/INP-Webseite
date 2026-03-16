from django.urls import path
from .views import ReviewCreateView, ApprovedReviewListView


urlpatterns = [
    path("reviews/", ApprovedReviewListView.as_view(), name="reviews-list"),
    path("reviews/create/", ReviewCreateView.as_view(), name="review-create"),
]