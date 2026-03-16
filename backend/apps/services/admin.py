from django.contrib import admin
from django.utils.html import format_html

from .models import Service


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "image_preview",
        "order",
        "is_active",
        "created_at",
    )
    list_filter = (
        "is_active",
        "created_at",
    )
    search_fields = (
        "title",
        "short_description",
        "description",
    )
    readonly_fields = (
        "slug",
        "created_at",
        "image_preview",
    )
    list_editable = (
        "order",
        "is_active",
    )
    ordering = ("order", "title")
    date_hierarchy = "created_at"

    fieldsets = (
        ("Service Info", {
            "fields": (
                "title",
                "slug",
                "short_description",
                "description",
            )
        }),
        ("Media", {
            "fields": (
                "image",
                "image_preview",
            )
        }),
        ("Status", {
            "fields": (
                "order",
                "is_active",
                "created_at",
            )
        }),
    )

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" width="120" style="border-radius:8px;" />',
                obj.image.url,
            )
        return "No image"

    image_preview.short_description = "Preview"