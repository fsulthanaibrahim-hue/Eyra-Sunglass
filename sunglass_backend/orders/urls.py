from django.urls import path
from .views import OrderListCreateAPIView, OrderDetailAPIView

urlpatterns = [
    path('', OrderListCreateAPIView.as_view(), name='order-list-create'),
    path('<int:pk>/', OrderDetailAPIView.as_view(), name='order-detail'),
    path('<int:pk>/cancel/', OrderDetailAPIView.as_view(), name='order-cancel'), 
]