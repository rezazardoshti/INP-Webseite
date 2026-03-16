from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Service


class ServiceAPITestCase(APITestCase):

    def test_create_service(self):
        service = Service.objects.create(
            title="Trockenbau",
            short_description="Professioneller Trockenbau",
            description="Wir bieten hochwertigen Trockenbau.",
            order=1,
            is_active=True,
        )

        self.assertEqual(Service.objects.count(), 1)
        self.assertEqual(service.title, "Trockenbau")
        self.assertTrue(service.is_active)

    def test_list_active_services(self):
        Service.objects.create(
            title="Trockenbau",
            short_description="Professioneller Trockenbau",
            description="Beschreibung",
            order=1,
            is_active=True,
        )

        Service.objects.create(
            title="Innenausbau",
            short_description="Innenausbau Service",
            description="Beschreibung",
            order=2,
            is_active=False,
        )

        url = reverse("service-list")
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["title"], "Trockenbau")

    def test_service_detail_by_slug(self):
        service = Service.objects.create(
            title="Malerarbeiten",
            short_description="Maler Service",
            description="Beschreibung",
            order=1,
            is_active=True,
        )

        url = reverse("service-detail", kwargs={"slug": service.slug})
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], "Malerarbeiten")

    def test_service_detail_not_found(self):
        url = reverse("service-detail", kwargs={"slug": "nicht-existiert"})
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)