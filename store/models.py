from django.db import models
from django.core.validators import MinLengthValidator
from django.utils import timezone

class Author(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.ForeignKey(Author, related_name='books', on_delete=models.CASCADE)
    published_date = models.DateField()
    description = models.TextField(blank=True, null=True)  # Make sure this field exists

    def __str__(self):
        return self.title

