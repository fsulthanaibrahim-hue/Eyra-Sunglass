# users/urls.py
from django.urls import path
from .views import RegisterUserAPIView, MyTokenObtainPairView, UserDetailAPIView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterUserAPIView.as_view(), name='register'),
    path('login/', MyTokenObtainPairView.as_view(), name='login'),
    path("profile/", UserDetailAPIView.as_view(), name="profile"),  # ✅ This now supports PUT
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/', UserDetailAPIView.as_view(), name='user-detail'),
]