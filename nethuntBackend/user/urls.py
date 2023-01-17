from . import views
from django.urls import path
urlpatterns = [
    path("addUser",views.addUser)
]
