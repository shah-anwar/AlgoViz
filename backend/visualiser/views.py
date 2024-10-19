from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from .data_structures.stack import Stack
from .data_structures.queue import Queue

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

