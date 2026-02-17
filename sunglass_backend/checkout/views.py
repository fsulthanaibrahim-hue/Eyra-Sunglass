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
        # Expecting request.data = { "products": [{ "id": 1, "quantity": 2 }, ...] }
        products_data = request.data.get("products")
        if not products_data:
            return Response(
                {"detail": "No products provided"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Create an order instance with total_price=0 first
        order = Order.objects.create(user=request.user, total_price=0)
        total_price = 0

        # Loop through products to calculate total price and create order items
        for item in products_data:
            try:
                product = Product.objects.get(id=item['id'])
            except Product.DoesNotExist:
                # If a product doesn't exist, rollback the order
                order.delete()
                return Response(
                    {"detail": f"Product {item['id']} not found"},
                    status=status.HTTP_404_NOT_FOUND
                )

            quantity = int(item.get('quantity', 1))
            total_price += product.price * quantity

            # Create OrderItem for each product
            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=quantity
            )

        # Update order with total price
        order.total_price = total_price
        order.save()

        # Serialize the order and return
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
