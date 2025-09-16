# from rest_framework_jwt.serializers import VerifyJSONWebTokenSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import (IsAuthenticated,IsAdminUser)
from .models import (Candidate,College,Coordinator)
# from quiz.models import Info
import json

from .serializers import (
    CandidateSerializer, NethuntUserSerializer,CollegeSerializer,CoordinatorSerializer)
# Create your views here.
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def view_college(request, *args, **kwargs):
    data = College.objects.all()
    temp = CollegeSerializer(data,many=True).data
    return Response(temp)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_college(request, *args, **kwargs):
    # print(json.load(request)["post_data"])
    data = json.loads(request.body)
    print(data)
    college = CollegeSerializer(
        data={"collegeName": data["collegeName"], "collegeCity": data["collegeCity"]})
    if college.is_valid(raise_exception=True):
        temp = college.save()
        print(temp)
        return Response({"info": "Successfully added new college!","added":True})
    return Response({"info":"Error in adding new college","added":False})
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def view_user(request, *args, **kwargs):
    data = CandidateSerializer(Candidate.objects.all(), many=True).data
    return Response(data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def view_user_individual(request, *args, **kwargs):
    data =  json.loads(request.body)
    print(data)
    data = CandidateSerializer(Candidate.objects.get(user=data["userId"]),).data
    # Candidate.objects.get(user=data["userId"])
    return Response(data)

@api_view(["POST"])
def add_user(request, *args, **kwargs):
    data = request.POST
    user = NethuntUserSerializer(
        data={"email": data["email"], "password": data["password"]})
    if user.is_valid(raise_exception=True):
        temp = user.save()
        print(temp)
        return Response({"test": "Works!"})

@api_view(["POST"])
@permission_classes([IsAdminUser])
def add_candidate(req):
    data = json.loads(req.body)
    college = College.objects.get(id=int(data["college"]))
    print(data)
    user = {
            "email": data["email"],
            "password": data["password"],
            "first_name": data["first_name"],
            "last_name": data["last_name"],
            "role": "Candidate"
        }
    user = NethuntUserSerializer(data=user)
    print(user)
    if user.is_valid():
        print("test")
        tempUser = user.save()
        phone = data["phone"]
        candidate = Candidate(user=tempUser,phone= phone,college=college)
        candidate.save()
        print("Added")
        return Response({"added": True}) 
    # NethuntUserSerializer(data= {})
    return Response({"added": False})


@api_view(["GET"])
def view_coordinators(request):
    coordinators = Coordinator.objects.all()
    # print(coordinators)
    data = CoordinatorSerializer(coordinators,many=True).data
    return Response(data)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        print(user)
        token['email'] = user.email
        token["role"] = user.role
        if(user.role == "Candidate"):
            token["user"] = CandidateSerializer(Candidate.objects.get(user=user.id)).data
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
