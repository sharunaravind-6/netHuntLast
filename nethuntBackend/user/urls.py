from django.urls import path
from . import views
urlpatterns = [
    path("view", views.view_user, name="view User"),
    path("add", views.add_user, name="add User")
]
