from rest_framework import serializers
from .models import Order, OrderItem
from products.serializers import ProductSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_image = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = [
            'id', 'product', 'product_name', 'product_image',
            'quantity', 'price', 'tracking_number'   # ✅ created_at removed
        ]

    def get_product_image(self, obj):
        if obj.product and obj.product.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.product.image.url)
            return obj.product.image.url
        return None

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    total_amount = serializers.DecimalField(source='total_price', max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'user', 'total_price', 'total_amount',
            'status', 'created_at', 
            'full_name', 'phone', 'address_line1', 'address_line2',
            'city', 'state', 'pincode', 'country', 'items'
        ]
        read_only_fields = ['user', 'total_price', 'status', 'created_at']