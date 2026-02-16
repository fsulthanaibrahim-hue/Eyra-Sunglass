from rest_framework.routers import DefaultRouter
from .views import AdminProductViewSet

router = DefaultRouter()
router.register('products', AdminProductViewSet, basename='admin-products')

urlpatterns = router.urls
