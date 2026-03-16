from django.contrib import admin

from django.contrib import admin
from .models import ContactMessage


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "email",
        "phone",
        "subject",
        "created_at",
        "is_read",
    )
    list_filter = (
        "is_read",
        "created_at",
    )
    search_fields = (
        "name",
        "email",
        "phone",
        "subject",
        "message",
    )
    readonly_fields = (
        "name",
        "email",
        "phone",
        "subject",
        "message",
        "created_at",
    )
    list_editable = (
        "is_read",
    )
    ordering = ("-created_at",)
    date_hierarchy = "created_at"

    fieldsets = (
        ("Absender", {
            "fields": ("name", "email", "phone")
        }),
        ("Nachricht", {
            "fields": ("subject", "message")
        }),
        ("Status", {
            "fields": ("is_read", "created_at")
        }),
    )
