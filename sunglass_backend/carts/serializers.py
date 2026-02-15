from rest_framework import serializers
from .models import Cart
from products.serializers import ProductSerializer

class CartSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.IntegerField(write_only=True, required=True)

    class Meta:
        model = Cart
        fields = ['id', 'product', 'product_id', 'quantity', 'added_at']
