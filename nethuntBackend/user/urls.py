from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import MyTokenObtainPairView
from . import views
urlpatterns = [
    path("college", views.view_college, name="view College"),
    path("add_college", views.add_college, name="add College"),
    path("view", views.view_user, name="view User"),
    path("view_individuals", views.view_user_individual, name="view User individual details"),
    path("add", views.add_user, name="add User"),
    path("add_candidate", views.add_candidate, name="add candidate"),
    path("auth/token", MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh', TokenRefreshView.as_view(), name='token_refresh'),
]
