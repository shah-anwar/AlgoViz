# graphs/tree.py
import random
from ..models import Node, Edge

def generate_tree(nodes_count):
    nodes = [Node.objects.create(value=str(i), x=random.random(), y=random.random()) for i in range(nodes_count)]
    for i in range(nodes_count - 1):
        Edge.objects.create(start_node=nodes[i], end_node=nodes[i + 1])
    return nodes
