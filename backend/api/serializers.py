import re
from rest_framework import serializers
from .models import Faq, Lead


def normalize_phone(raw):
    digits = re.sub(r'\D+', '', raw or '')
    if not digits:
        return ''
    if digits[0] == '8':
        digits = f'7{digits[1:]}'
    elif digits[0] != '7':
        digits = f'7{digits}'
    return f'+{digits}'


class FaqSerializer(serializers.ModelSerializer):
    class Meta:
        model = Faq
        fields = ('id', 'question', 'answer')


class LeadCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = ('telegram', 'phone', 'source_url')

    source_url = serializers.URLField(required=False, allow_blank=True)

    def validate_phone(self, value):
        digits = re.sub(r'\D+', '', value or '')
        if len(digits) < 10:
            raise serializers.ValidationError('Введите корректный номер телефона.')
        if len(digits) > 15:
            raise serializers.ValidationError('Введите корректный номер телефона.')
        self._phone_digits = digits
        return value

    def create(self, validated_data):
        raw_phone = validated_data.get('phone', '')
        digits = getattr(self, '_phone_digits', None)
        normalized = normalize_phone(raw_phone if digits is None else digits)
        return Lead.objects.create(
            telegram=validated_data.get('telegram', '').strip(),
            phone=raw_phone,
            phone_normalized=normalized,
            source_url=validated_data.get('source_url', '').strip(),
            ip_address=self.context.get('ip_address'),
            user_agent=self.context.get('user_agent', ''),
        )
