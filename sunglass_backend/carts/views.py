from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Cart
from products.models import Product
from .serializers import CartSerializer

class CartListCreateAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        carts = Cart.objects.filter(user=request.user)
        serializer = CartSerializer(carts, many=True)
        return Response(serializer.data)

    def post(self, request):
        product_id = request.data.get("product")
        quantity = request.data.get("quantity", 1)
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"detail": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        cart_item, created = Cart.objects.get_or_create(
            user=request.user,
            product=product,
            defaults={"quantity": quantity}
        )
        if not created:
            cart_item.quantity += int(quantity)
            cart_item.save()

        serializer = CartSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CartDetailAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, pk, user):
        try:
            return Cart.objects.get(pk=pk, user=user)
        except Cart.DoesNotExist:
            return None

    def put(self, request, pk):
        cart_item = self.get_object(pk, request.user)
        if not cart_item:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        cart_item.quantity = request.data.get("quantity", cart_item.quantity)
        cart_item.save()
        serializer = CartSerializer(cart_item)
        return Response(serializer.data)

    def delete(self, request, pk):
        cart_item = self.get_object(pk, request.user)
        if not cart_item:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        cart_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
