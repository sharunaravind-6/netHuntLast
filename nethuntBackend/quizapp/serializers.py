from .models import (Info,Question,Quiz,Progress,CurrentStatus)
from user.serializers import NethuntUserSerializer
from rest_framework import serializers
class InformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Info
        fields = "__all__"
    # def create(self,validated_data):
    #     user = validated_data.pop('coordinator')
    #     user = NethuntUser.objects.create(**user)
    #     coordinator = coordinator.objects.create(user=user, **validated_data)
    #     return coordinator
class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = "__all__"

class QuestionSerializer(serializers.ModelSerializer):
    quiz = QuizSerializer(read_only=True)
    class Meta:
        model =  Question
        fields = "__all__"

class ProgressSerializer(serializers.ModelSerializer):
    usr = NethuntUserSerializer(read_only=True)
    quiz = QuizSerializer(read_only=True)
    class Meta:
        model = Progress
        fields = "__all__"

class CurrentStatusSerializer(serializers.ModelSerializer):
    usr = NethuntUserSerializer(read_only=True)
    quiz = QuizSerializer(read_only=True)
    class Meta:
        model = CurrentStatus
        fields = "__all__"