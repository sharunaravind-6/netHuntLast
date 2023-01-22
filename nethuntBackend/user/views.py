from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Candidate
from .serializers import CandidateSerializer
# Create your views here.
@api_view(["GET"])
def view_user(request,*args,**kwargs):
    data = CandidateSerializer(Candidate.objects.all(),many=True).data
    return Response(data) 
