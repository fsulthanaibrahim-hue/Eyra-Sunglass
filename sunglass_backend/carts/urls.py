from django.urls import path
from .views import CartListCreateAPIView, CartDetailAPIView

urlpatterns = [
    path('', CartListCreateAPIView.as_view(), name='cart-list'),  
    path('<int:pk>/', CartDetailAPIView.as_view(), name='cart-detail'),  
]
