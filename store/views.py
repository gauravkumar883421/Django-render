from django.shortcuts import render

from rest_framework import generics
from .models import Author, Book
from .serializers import AuthorSerializer, BookSerializer

class BookListCreateAPIView(generics.ListCreateAPIView):  # Changed name to match import
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class BookRetrieveAPIView(generics.RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class AuthorListView(generics.ListAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

