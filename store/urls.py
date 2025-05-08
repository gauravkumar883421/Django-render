from django.urls import path
from .views import AuthorListView, BookListCreateAPIView, BookRetrieveAPIView

urlpatterns = [
    path('authors/', AuthorListView.as_view(), name='author-list'),
    path('books/', BookListCreateAPIView.as_view(), name='book-list-create'),
    path('books/<int:pk>/', BookRetrieveAPIView.as_view(), name='book-detail'),
]
