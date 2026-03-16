import logging
import os
import ssl
import urllib.error
from urllib import request, parse
from django.conf import settings
from django.utils import timezone

logger = logging.getLogger(__name__)


def build_lead_message(lead):
    created = timezone.localtime(lead.created_at).strftime('%Y-%m-%d %H:%M:%S')
    lines = [
        'Новая заявка',
        f'Телефон: {lead.phone_normalized or lead.phone}',
    ]
    if lead.telegram:
        lines.append(f'Telegram: {lead.telegram}')
    if lead.source_url:
        lines.append(f'Источник: {lead.source_url}')
    lines.append(f'Дата: {created}')
    return '\n'.join(lines)


def send_telegram_message(message):
    token = settings.TELEGRAM_BOT_TOKEN
    chat_id = settings.TELEGRAM_CHAT_ID
    verify_ssl = os.environ.get('TELEGRAM_SSL_VERIFY', '1') == '1'
    allow_insecure_fallback = os.environ.get('TELEGRAM_SSL_FALLBACK', '1') == '1'
    if not settings.TELEGRAM_NOTIFY_ENABLED:
        return False
    if not token or not chat_id:
        logger.warning('Telegram уведомления отключены: нет токена или chat_id.')
        return False

    ssl_context = None
    if verify_ssl:
        try:
            import certifi

            ssl_context = ssl.create_default_context(cafile=certifi.where())
        except Exception:
            ssl_context = ssl.create_default_context()
    else:
        ssl_context = ssl._create_unverified_context()

    payload = parse.urlencode({'chat_id': chat_id, 'text': message}).encode('utf-8')
    url = f'https://api.telegram.org/bot{token}/sendMessage'
    def _send_with_context(context):
        req = request.Request(url, data=payload, method='POST')
        with request.urlopen(req, timeout=5, context=context) as response:
            return 200 <= response.status < 300

    try:
        return _send_with_context(ssl_context)
    except urllib.error.URLError as error:
        if (
            verify_ssl
            and allow_insecure_fallback
            and isinstance(getattr(error, 'reason', None), ssl.SSLError)
        ):
            try:
                return _send_with_context(ssl._create_unverified_context())
            except Exception:
                logger.exception('Ошибка отправки Telegram сообщения (insecure retry)')
                return False
        logger.exception('Ошибка отправки Telegram сообщения')
        return False
    except Exception:
        logger.exception('Ошибка отправки Telegram сообщения')
        return False
