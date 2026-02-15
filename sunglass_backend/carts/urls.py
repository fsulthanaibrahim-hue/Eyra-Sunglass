from django.urls import path
from .views import CartListCreateAPIView, CartDetailAPIView

urlpatterns = [
    path('cart/', CartListCreateAPIView.as_view(), name='cart-list-create'),
    path('cart/<int:pk>/', CartDetailAPIView.as_view(), name='cart-detail'),
]
