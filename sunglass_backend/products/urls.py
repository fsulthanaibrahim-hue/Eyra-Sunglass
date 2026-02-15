from django.urls import path
from .views import ProductListCreateAPIView, ProductDetailAPIView, HeroImageAPIView

urlpatterns = [
    path('', ProductListCreateAPIView.as_view(), name='product-list'),
    path('<int:pk>/', ProductDetailAPIView.as_view(), name='product-detail'),
    path('hero/', HeroImageAPIView.as_view(), name='hero-image'),  
]
