from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import ContactMessage


class ContactMessageAPITestCase(APITestCase):
    def test_create_contact_message(self):
        url = reverse("contact-create")

        data = {
            "name": "Max Müller",
            "email": "max@test.de",
            "phone": "123456789",
            "subject": "Test Anfrage",
            "message": "Hallo, ich brauche ein Angebot.",
        }

        response = self.client.post(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ContactMessage.objects.count(), 1)

        contact_message = ContactMessage.objects.first()
        self.assertEqual(contact_message.name, "Max Müller")
        self.assertEqual(contact_message.email, "max@test.de")
        self.assertEqual(contact_message.phone, "123456789")
        self.assertEqual(contact_message.subject, "Test Anfrage")
        self.assertEqual(contact_message.message, "Hallo, ich brauche ein Angebot.")
        self.assertFalse(contact_message.is_read)