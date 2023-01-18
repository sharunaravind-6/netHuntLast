from django.shortcuts import render
from django.http import HttpResponse
from college.models import College
from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.
from college.CollegeSerializer import CollegeSerializer
@api_view(["get"])
def listColleges(request):
    firstData = College.objects.all().first()
    data = CollegeSerializer(firstData)
    return Response(data.data)
@api_view(["post"])
def addCollege(request):
    newCollege = CollegeSerializer(data=request.data)
    if newCollege.is_valid():
        instance = newCollege.save()
        print(instance)
        return Response(newCollege.data)    
