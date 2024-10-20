from django.urls import path
from .views import StackView, QueueView, GenerateTreeView, BFSView

urlpatterns = [
    path('api/data-structures/stack/', StackView.as_view(), name='stack-view'),
    path('api/data-structures/queue/', QueueView.as_view(), name='queue-view'),
    path('api/generate_tree/<int:nodes_count>/', GenerateTreeView.as_view(), name='generate_tree'),
    path('api/bfs/<int:start_node_id>/', BFSView.as_view(), name='bfs'),
]
