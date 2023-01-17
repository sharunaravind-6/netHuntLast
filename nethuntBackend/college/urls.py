from django.urls import path
from . import views
urlpatterns = [
    path("list",views.listColleges, name="college list"),
    path("add",views.addCollege, name="new college")
]
