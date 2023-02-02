from rest_framework import serializers
from .models import (Candidate, College, NethuntUser)


class CollegeSerializer(serializers.ModelSerializer):
    class Meta:
        model = College
        fields = "__all__"


class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = [
            "user",
            "college",
            "current_level",
            "status",
            "phone",
        ]


class NethuntUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = NethuntUser
        fields = [
            "email",
            "password",
        ]
    # email = serializers.EmailField(unique=True)


class CandidateUserSerializer(serializers.Serializer):
    user_email = serializers.EmailField()
    password = serializers.CharField(max_length=100)
    collegeName = serializers.CharField(max_length=100)
    collegeCity = serializers.CharField(max_length=100)
