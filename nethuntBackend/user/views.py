from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Candidate
from .serializers import (CandidateSerializer,CandidateUserSerializer,NethuntUserSerializer)
# Create your views here.
@api_view(["GET"])
def view_user(request,*args,**kwargs):
    data = CandidateSerializer(Candidate.objects.all(),many=True).data
    return Response(data) 
@api_view(["POST"])
def add_user(request,*args,**kwargs):
    data = request.POST
    user = NethuntUserSerializer(data = {"email" : data["email"],"password":data["password"]})
    if user.is_valid():
        user.save()
    # user = CandidateUserSerializer(user_email = data["email"],password=data["password"],collegeName=data["collegeName"],collegeCity=data["collegeCity"])

    print(data)
    return Response({"test":"Works!"})