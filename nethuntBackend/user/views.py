from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
def addUser(req):
    if req.method == "POST":
        return HttpResponse("POST")
    return HttpResponse("GET")
        