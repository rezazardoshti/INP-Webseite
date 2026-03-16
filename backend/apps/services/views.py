from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Service
from .serializers import ServiceSerializer


class ActiveServiceListView(APIView):
    def get(self, request):
        services = Service.objects.filter(is_active=True).order_by("order", "title")
        serializer = ServiceSerializer(services, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ServiceDetailView(APIView):
    def get(self, request, slug):
        try:
            service = Service.objects.get(slug=slug, is_active=True)
        except Service.DoesNotExist:
            return Response(
                {"detail": "Service not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = ServiceSerializer(service)
        return Response(serializer.data, status=status.HTTP_200_OK)
