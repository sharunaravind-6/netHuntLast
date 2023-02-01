from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import MyTokenObtainPairView
from . import views
urlpatterns = [
    path("college", views.view_college, name="view College"),
    path("view", views.view_user, name="view User"),
    path("add", views.add_user, name="add User"),
    path("auth/token", MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh', MyTokenObtainPairView.as_view(), name='token_refresh'),
]
