from rest_framework import serializers
from .models import (Candidate, College, NethuntUser)


class CollegeSerializer(serializers.ModelSerializer):
    class Meta:
        model = College
        fields = "__all__"


class NethuntUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = NethuntUser
        fields = "__all__"
    # email = serializers.EmailField(unique=True)

class CandidateSerializer(serializers.ModelSerializer):
    user = NethuntUserSerializer(read_only=True)
    college = CollegeSerializer(read_only = True)
    class Meta:
        model = Candidate
        fields = "__all__"




class CandidateUserSerializer(serializers.Serializer):
    user_email = serializers.EmailField()
    password = serializers.CharField(max_length=100)
    collegeName = serializers.CharField(max_length=100)
    collegeCity = serializers.CharField(max_length=100)
