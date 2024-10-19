from django.db import models

class Item(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    value = models.FloatField()

    def __str__(self):
        return self.name 