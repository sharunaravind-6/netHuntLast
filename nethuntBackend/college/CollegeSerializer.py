from rest_framework import serializers
from . import models
class CollegeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.College
        fields = [
            "collegeName",
            "collegeCity"
        ]