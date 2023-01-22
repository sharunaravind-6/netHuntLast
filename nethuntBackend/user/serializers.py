from rest_framework import serializers
from .models import (Candidate,College)

class CollegeSerializer(serializers.ModelSerializer):
    class Meta:
        model = College
        fileds = [
            "collegeName",
            "collegeCity"
        ]


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
