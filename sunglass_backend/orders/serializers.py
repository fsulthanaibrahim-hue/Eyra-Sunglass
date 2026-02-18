from rest_framework import serializers
from .models import Order, OrderItem
from products.serializers import ProductSerializer

# orders/serializers.py
class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_image = serializers.SerializerMethodField()
    
    def get_product_image(self, obj):
        if obj.product and obj.product.image:
            return obj.product.image.url
        return None
    

    
class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(source='orderitem_set', many=True, read_only=True)
    status = serializers.CharField(read_only=True)
    order_number = serializers.SerializerMethodField()
    total_amount = serializers.FloatField(source='total_price')

    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'user', 'total_price', 'total_amount', 
            'status', 'created_at', 'items',
            # ✅ Address fields added
            'full_name', 'phone', 'address_line1', 'address_line2',
            'city', 'state', 'pincode', 'country'
        ]
        read_only_fields = ['user', 'total_price', 'status', 'created_at']

    def get_order_number(self, obj):
        return f"ORD-{obj.id:05d}"