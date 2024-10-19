class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if not self.is_empty():
            return self.items.pop()
        raise IndexError("Stack is empty. Nothing to pop.")

    def peek(self):
        if not self.is_empty():
            return self.items[-1]
        raise IndexError("Stack is empty. Nothing to peek.")

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)