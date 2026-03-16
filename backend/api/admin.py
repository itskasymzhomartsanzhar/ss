from django.contrib import admin
from .models import Faq, Lead


@admin.register(Faq)
class FaqAdmin(admin.ModelAdmin):
    list_display = ('question', 'is_active', 'order', 'updated_at')
    list_filter = ('is_active',)
    search_fields = ('question', 'answer')
    ordering = ('order', 'id')


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ('phone_normalized', 'telegram', 'source_url', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('phone', 'phone_normalized', 'telegram')
    readonly_fields = ('created_at', 'ip_address', 'user_agent')
