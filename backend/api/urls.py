from django.urls import path
from .views import FaqListView, LeadCreateView

urlpatterns = [
    path('faq/', FaqListView.as_view(), name='faq-list'),
    path('leads/', LeadCreateView.as_view(), name='lead-create'),
]
