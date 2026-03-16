from django.contrib import admin
from .models import Gallery, MediaItem


class MediaItemInline(admin.TabularInline):
    model = MediaItem
    extra = 1
    fields = (
        "title",
        "media_type",
        "image",
        "video",
        "order",
        "is_active",
    )


@admin.register(Gallery)
class GalleryAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "is_active",
        "created_at",
    )
    list_filter = (
        "is_active",
        "created_at",
    )
    search_fields = (
        "title",
        "description",
    )
    readonly_fields = (
        "created_at",
    )
    list_editable = (
        "is_active",
    )
    ordering = ("-created_at",)
    date_hierarchy = "created_at"
    inlines = [MediaItemInline]

    fieldsets = (
        ("Gallery Info", {
            "fields": ("title", "description")
        }),
        ("Status", {
            "fields": ("is_active", "created_at")
        }),
    )


@admin.register(MediaItem)
class MediaItemAdmin(admin.ModelAdmin):
    list_display = (
        "gallery",
        "title",
        "media_type",
        "order",
        "is_active",
        "created_at",
    )
    list_filter = (
        "media_type",
        "is_active",
        "created_at",
    )
    search_fields = (
        "title",
        "description",
        "gallery__title",
    )
    readonly_fields = (
        "created_at",
    )
    list_editable = (
        "order",
        "is_active",
    )
    ordering = ("gallery", "order", "-created_at")
    date_hierarchy = "created_at"

    fieldsets = (
        ("Relation", {
            "fields": ("gallery",)
        }),
        ("Media Info", {
            "fields": ("title", "media_type", "description")
        }),
        ("Files", {
            "fields": ("image", "video")
        }),
        ("Status", {
            "fields": ("order", "is_active", "created_at")
        }),
    )