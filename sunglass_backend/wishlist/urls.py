from django.urls import path
from .views import WishlistListCreateAPIView, WishlistDetailAPIView

urlpatterns = [
    path('', WishlistListCreateAPIView.as_view(), name='wishlist-list-create'),
    path('<int:pk>/', WishlistDetailAPIView.as_view(), name='wishlist-detail'),
]
