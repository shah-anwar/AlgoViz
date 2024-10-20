from django.db import models

class Item(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    value = models.FloatField()

    def __str__(self):
        return self.name 
    
class Node(models.Model):
    value = models.CharField(max_length=50)
    x = models.FloatField()
    y = models.FloatField()

class Edge(models.Model):
    start_node = models.ForeignKey(Node, related_name='start_edges', on_delete=models.CASCADE)
    end_node = models.ForeignKey(Node, related_name='end_edges', on_delete=models.CASCADE)
    weight = models.FloatField(default=1.0)
