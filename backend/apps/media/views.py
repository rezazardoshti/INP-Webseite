from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Gallery
from .serializers import GallerySerializer, MediaItemSerializer


class ActiveGalleryListView(APIView):
    def get(self, request):
        galleries = Gallery.objects.filter(is_active=True).order_by("-created_at")
        serializer = GallerySerializer(
            galleries,
            many=True,
            context={"request": request},
        )
        return Response(serializer.data, status=status.HTTP_200_OK)


class GalleryCreateView(APIView):
    def post(self, request):
        serializer = GallerySerializer(
            data=request.data,
            context={"request": request},
        )

        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "Gallery was created successfully.",
                    "data": serializer.data,
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MediaItemCreateView(APIView):
    def post(self, request):
        serializer = MediaItemSerializer(
            data=request.data,
            context={"request": request},
        )

        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "Media item was created successfully.",
                    "data": serializer.data,
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GalleryDetailView(APIView):
    def get(self, request, pk):
        try:
            gallery = Gallery.objects.get(pk=pk, is_active=True)
        except Gallery.DoesNotExist:
            return Response(
                {"detail": "Gallery not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = GallerySerializer(gallery, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)