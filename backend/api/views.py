import logging
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Faq
from .serializers import FaqSerializer, LeadCreateSerializer
from .services import build_lead_message, send_telegram_message

def get_client_ip(request):
    forwarded = request.META.get('HTTP_X_FORWARDED_FOR')
    if forwarded:
        return forwarded.split(',')[0].strip()
    return request.META.get('REMOTE_ADDR')


class FaqListView(generics.ListAPIView):
    serializer_class = FaqSerializer

    def get_queryset(self):
        return Faq.objects.filter(is_active=True).order_by('order', 'id')


class LeadCreateView(APIView):
    def post(self, request):
        serializer = LeadCreateSerializer(
            data=request.data,
            context={
                'ip_address': get_client_ip(request),
                'user_agent': (request.META.get('HTTP_USER_AGENT') or '')[:255],
            },
        )
        serializer.is_valid(raise_exception=True)
        lead = serializer.save()
        message = build_lead_message(lead)
        telegram_sent = send_telegram_message(message)
        return Response(
            {'id': lead.id, 'telegram_sent': telegram_sent},
            status=status.HTTP_201_CREATED,
        )
