from django.urls import path
from . import views
urlpatterns = [
    path("config", views.is_configured),
    path("set_config", views.add_config)
]
