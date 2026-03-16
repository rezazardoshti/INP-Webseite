from rest_framework import serializers
from .models import Gallery, MediaItem


class MediaItemSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    video = serializers.SerializerMethodField()

    class Meta:
        model = MediaItem
        fields = [
            "id",
            "gallery",
            "title",
            "media_type",
            "image",
            "video",
            "description",
            "order",
            "is_active",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]

    def get_image(self, obj):
        if not obj.image:
            return None

        request = self.context.get("request")
        if request:
            return request.build_absolute_uri(obj.image.url)
        return obj.image.url

    def get_video(self, obj):
        if not obj.video:
            return None

        request = self.context.get("request")
        if request:
            return request.build_absolute_uri(obj.video.url)
        return obj.video.url

    def validate(self, attrs):
        media_type = attrs.get("media_type")
        image = attrs.get("image")
        video = attrs.get("video")

        if media_type == "image" and not image:
            raise serializers.ValidationError({
                "image": "Image file is required when media_type is 'image'."
            })

        if media_type == "video" and not video:
            raise serializers.ValidationError({
                "video": "Video file is required when media_type is 'video'."
            })

        if image and video:
            raise serializers.ValidationError(
                "Only one of image or video can be uploaded."
            )

        return attrs


class GallerySerializer(serializers.ModelSerializer):
    media_items = MediaItemSerializer(many=True, read_only=True)

    class Meta:
        model = Gallery
        fields = [
            "id",
            "title",
            "description",
            "is_active",
            "created_at",
            "media_items",
        ]
        read_only_fields = ["id", "created_at"]