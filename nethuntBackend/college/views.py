from django.shortcuts import render
from django.http import HttpResponse
from college.models import College
# Create your views here.
def listColleges(request):
    return HttpResponse(College.objects.all())
def addCollege(request):
    if request.method == "POST":
        newCollege = College(collegeName=request.POST.collegeName,collegeCity=request.POST.collegeCity)
        newCollege.save()
    
