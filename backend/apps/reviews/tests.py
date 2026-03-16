from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Review


class ReviewAPITestCase(APITestCase):
    def test_create_review(self):
        url = reverse("review-create")

        data = {
            "name": "Max Müller",
            "rating": 5,
            "comment": "Sehr gute Arbeit.",
        }

        response = self.client.post(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Review.objects.count(), 1)

        review = Review.objects.first()
        self.assertEqual(review.name, "Max Müller")
        self.assertEqual(review.rating, 5)
        self.assertEqual(review.comment, "Sehr gute Arbeit.")
        self.assertFalse(review.is_approved)

    def test_create_review_invalid_rating(self):
        url = reverse("review-create")

        data = {
            "name": "Max Müller",
            "rating": 7,
            "comment": "Sehr gute Arbeit.",
        }

        response = self.client.post(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Review.objects.count(), 0)

    def test_list_only_approved_reviews(self):
        Review.objects.create(
            name="Ali",
            rating=5,
            comment="Top Arbeit",
            is_approved=True,
        )
        Review.objects.create(
            name="Reza",
            rating=4,
            comment="Gut",
            is_approved=False,
        )

        url = reverse("reviews-list")
        response = self.client.get(url, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["name"], "Ali")
        self.assertEqual(response.data[0]["rating"], 5)