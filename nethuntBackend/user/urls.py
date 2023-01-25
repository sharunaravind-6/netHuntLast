from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from . import views
urlpatterns = [
    path("view", views.view_user, name="view User"),
    path("add", views.add_user, name="add User"),
    path("auth/token/", TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
