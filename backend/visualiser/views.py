import random
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status

from django.http import JsonResponse

from .data_structures.stack import Stack
from .data_structures.queue import Queue

from .models import Node, Edge
from .graphs.binary_tree import BinaryTree

# Stack API View
class StackView(APIView):
    stack = Stack()

    def post(self, request: Request):
        initial_items = request.data.get("items", [])
        for item in initial_items:
            self.stack.push(item)
        return Response({'message': 'Stack created', 'items': self.stack.items}, status=status.HTTP_201_CREATED)

    def get(self, request: Request):
        action = request.query_params.get('action')
        if action == 'peek':
            return self.peek(request)
        else:
            return Response({'items': self.stack.items}, status=status.HTTP_200_OK)

    def put(self, request: Request):
        action = request.data.get("action")
        item = request.data.get("item")

        if action == "push":
            if item:
                self.stack.push(item)
                return Response({'message': 'Item pushed', 'items': self.stack.items}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Item cannot be empty'}, status=status.HTTP_400_BAD_REQUEST)
        elif action == "pop":
            try:
                popped_item = self.stack.pop()
                return Response({'message': 'Item popped', 'popped_item': popped_item, 'items': self.stack.items}, status=status.HTTP_200_OK)
            except IndexError:
                return Response({'error': 'Stack is empty'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Invalid action'}, status=status.HTTP_400_BAD_REQUEST)
    
    def peek(self, request: Request):
        try:
            top_item = self.stack.peek()
            return Response({'item': top_item}, status=status.HTTP_200_OK)
        except IndexError:
            return Response({'error': 'Stack is empty'}, status=status.HTTP_400_BAD_REQUEST)

# Queue API View
class QueueView(APIView):
    queue = Queue()

    def post(self, request: Request):
        return Response({'message': 'Queue created', 'items': self.queue.display()}, status=status.HTTP_201_CREATED)

    def get(self, request: Request):
        action = request.query_params.get('action')
        if action == 'peek':
            return self.peek(request)
        else:
            return Response({'items': self.queue.display()}, status=status.HTTP_200_OK)

    def put(self, request: Request):
        action = request.data.get("action")
        item = request.data.get("item")

        if action == "enqueue":
            if item:
                self.queue.enqueue(item)
                return Response({'items': self.queue.display()}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Item cannot be empty'}, status=status.HTTP_400_BAD_REQUEST)
        elif action == "dequeue":
            try:
                dequeued_item = self.queue.dequeue()
                return Response({'dequeued_item': dequeued_item, 'items': self.queue.display()}, status=status.HTTP_200_OK)
            except IndexError as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Invalid action'}, status=status.HTTP_400_BAD_REQUEST)

    def peek(self, request: Request):
        try:
            front_item = self.queue.peek()
            return Response({'item': front_item}, status=status.HTTP_200_OK)
        except IndexError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

# Generate Tree API View
class GenerateTreeView(APIView):
    def get(self, request, nodes_count: int):
        tree = BinaryTree(nodes_count)
        nodes = tree.get_nodes()
        edges = tree.get_edges()

        data = {
            'nodes': [{'id': node.id, 'value': node.value, 'x': node.x, 'y': node.y} for node in nodes],
            'edges': [{'start': edge.start_node.id, 'end': edge.end_node.id} for edge in edges]
        }
        return JsonResponse(data)

# BFS API View
class BFSView(APIView):
    def get(self, request: Request, start_node_id: int):
        start_node = Node.objects.get(id=start_node_id)
        output = self.bfs(start_node)
        return JsonResponse({'output': output})

    def bfs(self, start_node):
        visited = set()
        queue = [start_node]
        output = []
        while queue:
            node = queue.pop(0)
            if node not in visited:
                output.append(node.value)
                visited.add(node)
                for edge in node.start_edges.all():
                    if edge.end_node not in visited:
                        queue.append(edge.end_node)
        return output
