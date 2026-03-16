from rest_framework import serializers
from .models import Service


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = [
            "id",
            "title",
            "slug",
            "short_description",
            "description",
            "image",
            "order",
            "is_active",
            "created_at",
        ]
        read_only_fields = [
            "id",
            "slug",
            "created_at",
        ]