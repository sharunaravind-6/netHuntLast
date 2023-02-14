from django.shortcuts import render
from .models import Info
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from user.models import (Coordinator)
from user.serializers import (CoordinatorSerializer)
from user.serializers import NethuntUserSerializer
from game.models import Info
import json
import copy
from datetime import datetime

# Create your views here.


@api_view(["GET"])
@permission_classes([IsAdminUser])
def is_configured(req):
    if (Info.objects.all().count() >= 1):
        return Response({"configured": True})
    return Response({"configured": False})


@api_view(["POST"])
@permission_classes([IsAdminUser])
def add_config(req):
    # print(req.FILES[])
    data = json.loads(req.POST["data"])
    coordinators = data["coordinators"]
    for index, coordinator in zip(range(len(coordinators)), coordinators):
        user = {
            "email": coordinator["coordinatorEmail"],
            "password": coordinator["coordinatorPassword"],
            "first_name": coordinator["coordinatorFirstName"],
            "last_name": coordinator["coordinatorLastName"],
            "role": "Coordinator"
        }
        user = NethuntUserSerializer(data=user)
        if user.is_valid():
            tempUser = user.save()
            coordinator = Coordinator(user=tempUser,image = req.FILES["coordinator"+str(index+1)],phone= coordinator["coordinatorPhone"])
            coordinator.save()
        else:
            Coordinator.objects.all().delete()
            return Response({"configured": False})   
    storedCoordinators = Coordinator.objects.all()
    if  storedCoordinators.count()== 2:
        
        eventInfo = data["eventInfo"]
        event = eventInfo["event"]
        year = int(eventInfo["year"])
        
        eventLogo = req.FILES["event"]  
        logo = req.FILES["nethunt"]
        
        coordinator1 = storedCoordinators[0]
        coordinator2 = storedCoordinators[1]

        timings = data["quizTimings"]
        startBy = datetime.strptime(timings["startsBy"], '%Y-%m-%dT%H:%M')
        endBy = datetime.strptime(timings["endsBy"], '%Y-%m-%dT%H:%M')

        scorings = data["quizScores"]
        easyScore = int(scorings["easy"])
        moderateScore = int(scorings["medium"])
        hardScore = int(scorings["hard"])
        commonMailId = "dummy@gmail.com"

        data = Info(event=event,year=year,coordinator1=coordinator1,coordinator2=coordinator2,startBy=startBy,endBy=endBy,easyScore=easyScore,moderateScore=moderateScore,hardScore=hardScore,commonMailId=commonMailId)
        data.save()
        return Response({"configured": True})
    return Response({"configured": False})
