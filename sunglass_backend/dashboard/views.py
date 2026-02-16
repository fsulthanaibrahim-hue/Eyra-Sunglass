from rest_framework import viewsets, permissions
from products.models import Product
from products.serializers import ProductSerializer

class AdminProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAdminUser]
