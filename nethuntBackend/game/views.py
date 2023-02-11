from django.shortcuts import render
from .models import Info
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
# Create your views here.
@api_view(["GET"])
@permission_classes([IsAdminUser])
def is_configured(req):
    if (Info.objects.all().count() >= 1 ):
        return Response({"configured":True})
    return Response({"configured":False})
