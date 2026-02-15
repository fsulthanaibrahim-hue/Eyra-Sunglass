from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Wishlist
from products.models import Product
from .serializers import WishlistSerializer

class WishlistListCreateAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        wishlist = Wishlist.objects.filter(user=request.user)
        serializer = WishlistSerializer(wishlist, many=True)
        return Response(serializer.data)

    def post(self, request):
        product_id = request.data.get("product")
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"detail": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        wishlist_item, created = Wishlist.objects.get_or_create(
            user=request.user,
            product=product
        )
        serializer = WishlistSerializer(wishlist_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class WishlistDetailAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, pk, user):
        try:
            return Wishlist.objects.get(pk=pk, user=user)
        except Wishlist.DoesNotExist:
            return None

    def delete(self, request, pk):
        wishlist_item = self.get_object(pk, request.user)
        if not wishlist_item:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        wishlist_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
