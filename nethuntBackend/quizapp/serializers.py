from .models import (Info,Question,Quiz)
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

