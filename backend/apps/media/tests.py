from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Gallery, MediaItem


class MediaAPITestCase(APITestCase):
    def test_create_gallery(self):
        url = reverse("gallery-create")

        data = {
            "title": "Badrenovierung",
            "description": "Projekt in Berlin",
            "is_active": True,
        }

        response = self.client.post(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Gallery.objects.count(), 1)

        gallery = Gallery.objects.first()
        self.assertEqual(gallery.title, "Badrenovierung")
        self.assertEqual(gallery.description, "Projekt in Berlin")
        self.assertTrue(gallery.is_active)

    def test_create_image_media_item(self):
        gallery = Gallery.objects.create(
            title="Innenausbau",
            description="Test Galerie",
            is_active=True,
        )

        url = reverse("media-item-create")

        image_file = SimpleUploadedFile(
            "test.jpg",
            b"file_content",
            content_type="image/jpeg",
        )

        data = {
            "gallery": gallery.id,
            "title": "Vorher Bild",
            "media_type": "image",
            "image": image_file,
            "description": "Vorher Zustand",
            "order": 1,
            "is_active": True,
        }

        response = self.client.post(url, data, format="multipart")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(MediaItem.objects.count(), 1)

        media_item = MediaItem.objects.first()
        self.assertEqual(media_item.gallery, gallery)
        self.assertEqual(media_item.title, "Vorher Bild")
        self.assertEqual(media_item.media_type, "image")
        self.assertTrue(media_item.image)
        self.assertTrue(media_item.is_active)

    def test_create_video_media_item(self):
        gallery = Gallery.objects.create(
            title="Trockenbau",
            description="Test Galerie",
            is_active=True,
        )

        url = reverse("media-item-create")

        video_file = SimpleUploadedFile(
            "test.mp4",
            b"video_file_content",
            content_type="video/mp4",
        )

        data = {
            "gallery": gallery.id,
            "title": "Projekt Video",
            "media_type": "video",
            "video": video_file,
            "description": "Video vom Projekt",
            "order": 2,
            "is_active": True,
        }

        response = self.client.post(url, data, format="multipart")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(MediaItem.objects.count(), 1)

        media_item = MediaItem.objects.first()
        self.assertEqual(media_item.gallery, gallery)
        self.assertEqual(media_item.title, "Projekt Video")
        self.assertEqual(media_item.media_type, "video")
        self.assertTrue(media_item.video)
        self.assertTrue(media_item.is_active)

    def test_create_image_media_item_without_file_fails(self):
        gallery = Gallery.objects.create(
            title="Küche",
            description="Test Galerie",
            is_active=True,
        )

        url = reverse("media-item-create")

        data = {
            "gallery": gallery.id,
            "title": "Fehler Bild",
            "media_type": "image",
            "description": "Ohne Datei",
            "order": 1,
            "is_active": True,
        }

        response = self.client.post(url, data, format="multipart")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(MediaItem.objects.count(), 0)

    def test_list_only_active_galleries(self):
        active_gallery = Gallery.objects.create(
            title="Aktive Galerie",
            description="Sichtbar",
            is_active=True,
        )
        Gallery.objects.create(
            title="Inaktive Galerie",
            description="Nicht sichtbar",
            is_active=False,
        )

        MediaItem.objects.create(
            gallery=active_gallery,
            title="Bild 1",
            media_type="image",
            image=SimpleUploadedFile("active.jpg", b"img", content_type="image/jpeg"),
            is_active=True,
            order=1,
        )

        url = reverse("gallery-list")
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["title"], "Aktive Galerie")
        self.assertEqual(len(response.data[0]["media_items"]), 1)

    def test_gallery_detail_returns_active_gallery(self):
        gallery = Gallery.objects.create(
            title="Badezimmer",
            description="Detailseite",
            is_active=True,
        )

        MediaItem.objects.create(
            gallery=gallery,
            title="Bild Detail",
            media_type="image",
            image=SimpleUploadedFile("detail.jpg", b"img", content_type="image/jpeg"),
            is_active=True,
            order=1,
        )

        url = reverse("gallery-detail", kwargs={"pk": gallery.id})
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], "Badezimmer")
        self.assertEqual(len(response.data["media_items"]), 1)

    def test_gallery_detail_returns_404_for_inactive_gallery(self):
        gallery = Gallery.objects.create(
            title="Versteckte Galerie",
            description="Nicht sichtbar",
            is_active=False,
        )

        url = reverse("gallery-detail", kwargs={"pk": gallery.id})
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)