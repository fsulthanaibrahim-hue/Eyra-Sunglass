from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Order, OrderItem
from products.models import Product
from .serializers import OrderSerializer

class OrderListCreateAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user).order_by('-created_at')
        # ✅ Pass request context to serializer for absolute image URLs
        serializer = OrderSerializer(orders, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        products_data = request.data.get("products")
        address_data = request.data.get("address", {})
        
        if not products_data:
            return Response({"detail": "No products provided"}, status=status.HTTP_400_BAD_REQUEST)

        total_price = 0
        
        order = Order.objects.create(
            user=request.user,
            total_price=0,
            full_name=address_data.get('full_name'),
            phone=address_data.get('phone'),
            address_line1=address_data.get('address_line1'),
            address_line2=address_data.get('address_line2', ''),
            city=address_data.get('city'),
            state=address_data.get('state'),
            pincode=address_data.get('pincode'),
            country=address_data.get('country', 'India')
        )

        for item in products_data:
            try:
                product = Product.objects.get(id=item['id'])
            except Product.DoesNotExist:
                order.delete()
                return Response({"detail": f"Product {item['id']} not found"}, status=status.HTTP_404_NOT_FOUND)

            quantity = int(item.get('quantity', 1))
            item_total = product.price * quantity
            total_price += item_total
            
            OrderItem.objects.create(
                order=order, 
                product=product, 
                quantity=quantity,
                price=product.price
            )

        order.total_price = total_price
        order.save()

        # ✅ Pass context here as well (optional but consistent)
        serializer = OrderSerializer(order, context={'request': request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class OrderDetailAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, pk, user):
        try:
            return Order.objects.get(pk=pk, user=user)
        except Order.DoesNotExist:
            return None

    def get(self, request, pk):
        order = self.get_object(pk, request.user)
        if not order:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        # ✅ Pass context
        serializer = OrderSerializer(order, context={'request': request})
        return Response(serializer.data)

    def put(self, request, pk):
        order = self.get_object(pk, request.user)
        if not order:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        
        if request.data.get('status') == 'cancelled':
            if order.status not in ['pending']:
                return Response(
                    {"detail": f"Cannot cancel order with status: {order.status}"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            order.status = 'cancelled'
            order.save()
            serializer = OrderSerializer(order, context={'request': request})
            return Response(serializer.data)
        
        return Response({"detail": "Only cancellation is allowed"}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        return self.put(request, pk)

    def post(self, request, pk):
        order = self.get_object(pk, request.user)
        if not order:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        
        if order.status != 'pending':
            return Response(
                {"detail": f"Cannot cancel order with status: {order.status}"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        order.status = 'cancelled'
        order.save()
        serializer = OrderSerializer(order, context={'request': request})
        return Response(serializer.data)