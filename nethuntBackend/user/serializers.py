from rest_framework import serializers
from .models import (Candidate, College, NethuntUser,Coordinator)


class CollegeSerializer(serializers.ModelSerializer):
    class Meta:
        model = College
        fields = "__all__"


class NethuntUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = NethuntUser
        fields = ('id', 'email', 'first_name', 'last_name', 'password',"role")
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = NethuntUser(**validated_data)
        user.set_password(password)
        user.save()
        return user
    # email = serializers.EmailField(unique=True)

class CandidateSerializer(serializers.ModelSerializer):
    user = NethuntUserSerializer(read_only=True)
    college = CollegeSerializer(read_only = True)
    class Meta:
        model = Candidate
        fields = "__all__"



class CoordinatorSerializer(serializers.ModelField):
    user = NethuntUserSerializer()
    class Meta:
        model = Coordinator
    
    def create(self,validated_data):
        user = validated_data.pop('user')
        print(user,"test")
        user = NethuntUserSerializer(data=user)
        if user.is_valid():
            user.save()
            coordinator = Coordinator.objects.create(user=user, **validated_data)
            return coordinator
# class CandidateUserSerializer(serializers.Serializer):
#     user_email = serializers.EmailField()
#     password = serializers.CharField(max_length=100)
#     collegeName = serializers.CharField(max_length=100)
#     collegeCity = serializers.CharField(max_length=100)
