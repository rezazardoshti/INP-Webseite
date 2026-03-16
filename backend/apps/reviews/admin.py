from django.contrib import admin
from django.contrib import admin
from .models import Review


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "rating",
        "is_approved",
        "created_at",
    )
    list_filter = (
        "is_approved",
        "rating",
        "created_at",
    )
    search_fields = (
        "name",
        "comment",
    )
    readonly_fields = (
        "name",
        "rating",
        "comment",
        "created_at",
    )
    list_editable = (
        "is_approved",
    )
    ordering = ("-created_at",)
    date_hierarchy = "created_at"

    fieldsets = (
        ("Kunde", {
            "fields": ("name",)
        }),
        ("Bewertung", {
            "fields": ("rating", "comment")
        }),
        ("Status", {
            "fields": ("is_approved", "created_at")
        }),
    )