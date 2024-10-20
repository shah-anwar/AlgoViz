import random
from ..models import Node, Edge

class BinaryTree:
    def __init__(self, node_count):
        self.node_count = node_count
        self.nodes = []
        self.edges = []
        self.value_counter = 0  # To ensure unique values for each node
        self.generate_tree()

    def generate_tree(self):
        if self.node_count == 0:
            return

        # Set the root node position
        root = Node.objects.create(value=str(self.value_counter), x=250, y=20)  # Centered horizontally
        self.nodes.append(root)
        self.value_counter += 1

        # Create child nodes
        self._generate_children(root, 1, 1)  # Start with node id 1 and depth 1

    def _generate_children(self, parent_node, current_id, depth):
        if current_id >= self.node_count:
            return
        
        # Positioning parameters
        gap_x = 100 / (2 ** depth)  # Horizontal gap decreases with depth
        gap_y = 80  # Constant vertical gap

        # Randomly decide to create left child
        if random.choice([True, False]) and self.value_counter < self.node_count:
            left_child = Node.objects.create(value=str(self.value_counter), 
                                              x=parent_node.x - gap_x, 
                                              y=parent_node.y + gap_y)
            self.nodes.append(left_child)
            self.edges.append(Edge.objects.create(start_node=parent_node, end_node=left_child))
            self.value_counter += 1
            self._generate_children(left_child, current_id + 1, depth + 1)

        # Check if we can create right child
        if random.choice([True, False]) and self.value_counter < self.node_count:
            right_child = Node.objects.create(value=str(self.value_counter), 
                                               x=parent_node.x + gap_x, 
                                               y=parent_node.y + gap_y)
            self.nodes.append(right_child)
            self.edges.append(Edge.objects.create(start_node=parent_node, end_node=right_child))
            self.value_counter += 1
            self._generate_children(right_child, current_id + 1, depth + 1)

    def get_nodes(self):
        return self.nodes

    def get_edges(self):
        return self.edges
