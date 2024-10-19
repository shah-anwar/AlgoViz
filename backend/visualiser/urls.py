from django.urls import path
from .views import StackView, QueueView

urlpatterns = [
    path('api/data-structures/stack/', StackView.as_view(), name='stack-view'),
    path('api/data-structures/queue/', QueueView.as_view(), name='queue-view'),
]
