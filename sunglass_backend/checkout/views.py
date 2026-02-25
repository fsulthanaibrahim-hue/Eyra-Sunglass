from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from orders.models import Order, OrderItem
from products.models import Product
from orders.serializers import OrderSerializer

class CheckoutAPIView(APIView):
    """
    API endpoint for creating an order (checkout).
    Accepts a list of products with quantities and creates an order with OrderItems.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        products_data = request.data.get("products")
        if not products_data:
            return Response(
                {"detail": "No products provided"},
                status=status.HTTP_400_BAD_REQUEST
            )

        order = Order.objects.create(user=request.user, total_price=0)
        total_price = 0

        for item in products_data:
            try:
                product = Product.objects.get(id=item['id'])
            except Product.DoesNotExist:
                order.delete()
                return Response(
                    {"detail": f"Product {item['id']} not found"},
                    status=status.HTTP_404_NOT_FOUND
                )

            quantity = int(item.get('quantity', 1))
            total_price += product.price * quantity

            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=quantity
            )

        order.total_price = total_price
        order.save()

        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
