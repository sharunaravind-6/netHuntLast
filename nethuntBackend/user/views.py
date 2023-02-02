# from rest_framework_jwt.serializers import VerifyJSONWebTokenSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import (Candidate,College)
from .serializers import (
    CandidateSerializer, CandidateUserSerializer, NethuntUserSerializer,CollegeSerializer)
# Create your views here.
@api_view(["GET"])
# @permission_classes([IsAuthenticated])
def view_college(request, *args, **kwargs):
    data = CollegeSerializer(College.objects.all(), many=True).data
    return Response(data)


@api_view(["GET"])
# @permission_classes([IsAuthenticated])
def view_user(request, *args, **kwargs):
    data = CandidateSerializer(Candidate.objects.all(), many=True).data
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
def auth_user(request, *args, **kwargs):
    print(request)
    # valid_data = VerifyJSONWebTokenSerializer().validate(data)
    # user = valid_data['user']
    return Response({"test": "testing"})


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token["role"] = user.role
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
