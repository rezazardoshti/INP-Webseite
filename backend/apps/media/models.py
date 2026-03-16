from django.core.exceptions import ValidationError
from django.db import models


class Gallery(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Gallery"
        verbose_name_plural = "Galleries"

    def __str__(self):
        return self.title


class MediaItem(models.Model):
    MEDIA_TYPE_CHOICES = (
        ("image", "Image"),
        ("video", "Video"),
    )

    gallery = models.ForeignKey(
        Gallery,
        on_delete=models.CASCADE,
        related_name="media_items",
    )
    title = models.CharField(max_length=150, blank=True, null=True)
    media_type = models.CharField(max_length=10, choices=MEDIA_TYPE_CHOICES)
    image = models.ImageField(upload_to="gallery/images/", blank=True, null=True)
    video = models.FileField(upload_to="gallery/videos/", blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order", "-created_at"]
        verbose_name = "Media Item"
        verbose_name_plural = "Media Items"

    def __str__(self):
        return f"{self.gallery.title} - {self.media_type}"

    def clean(self):
        if self.media_type == "image" and not self.image:
            raise ValidationError({"image": "Image file is required for media_type='image'."})

        if self.media_type == "video" and not self.video:
            raise ValidationError({"video": "Video file is required for media_type='video'."})

        if self.image and self.video:
            raise ValidationError("Only one of image or video can be uploaded.")

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)