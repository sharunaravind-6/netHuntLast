from django.shortcuts import render
from .models import Info
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
import json
# Create your views here.
@api_view(["GET"])
@permission_classes([IsAdminUser])
def is_configured(req):
    if (Info.objects.all().count() >= 1 ):
        return Response({"configured":True})
    return Response({"configured":False})

@api_view(["POST"])
@permission_classes([IsAdminUser])
def add_config(req):
    print(req.FILES["nethunt"])
    # temp = Temp(temp=req.FILES["nethunt"])
    # temp.save()
    # data = json.loads(req.body)
    # print(data)
    return Response({"configured":"testing"})
