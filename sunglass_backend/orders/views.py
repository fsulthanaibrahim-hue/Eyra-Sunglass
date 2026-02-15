from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Order, OrderItem
from products.models import Product
from .serializers import OrderSerializer

class OrderListCreateAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    def post(self, request):
        products_data = request.data.get("products")  # list of {id, quantity}
        if not products_data:
            return Response({"detail": "No products provided"}, status=status.HTTP_400_BAD_REQUEST)

        total_price = 0
        order = Order.objects.create(user=request.user, total_price=0)

        for item in products_data:
            try:
                product = Product.objects.get(id=item['id'])
            except Product.DoesNotExist:
                order.delete()
                return Response({"detail": f"Product {item['id']} not found"}, status=status.HTTP_404_NOT_FOUND)

            quantity = int(item.get('quantity', 1))
            total_price += product.price * quantity
            OrderItem.objects.create(order=order, product=product, quantity=quantity)

        order.total_price = total_price
        order.save()

        serializer = OrderSerializer(order)
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
        serializer = OrderSerializer(order)
        return Response(serializer.data)
