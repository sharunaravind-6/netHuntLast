from django.shortcuts import render
from .models import Info,Quiz
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from user.models import (Coordinator,NethuntUser)
from user.serializers import (CoordinatorSerializer)
from user.serializers import NethuntUserSerializer
from quizapp.models import Info,Question
from .serializers import QuestionSerializer,QuizSerializer
import json
import copy
from datetime import datetime

# Create your views here.


@api_view(["GET"])
@permission_classes([IsAdminUser])
def is_configured(req):
    if (Info.objects.all().count() >= 1):
        return Response({"configured": True})
    return Response({"configured": False})

@api_view(["GET"])
def get_questions(req):
    return Response({"data": QuestionSerializer(Question.objects.all(),many=True).data})

@api_view(["POST"])
def add_question(req):
    try:
        data = json.loads(req.POST["data"])
        # print(req.FILES)
        quiz = Quiz.objects.get(name=data["quiz"])
        question = Question(answer=data["answer"],hint1=data["hint1"],hint2=data["hint2"],difficulty=data["difficultyLevel"],quiz=quiz,image=req.FILES["question"])
        question.save()
        return Response({"added":True})
    except:
        return Response({"added":False})
@api_view(["POST"])
@permission_classes([IsAdminUser])
def add_config(req):
    # print(req.FILES[])
    try:
        data = json.loads(req.POST["data"])
        coordinators = data["coordinators"]
        for index, coordinator in zip(range(len(coordinators)), coordinators):
            user = {
                "email": coordinator["coordinatorEmail"],
                "password": coordinator["coordinatorPassword"],
                "first_name": coordinator["coordinatorFirstName"],
                "last_name": coordinator["coordinatorLastName"],
                "role": "Coordinator"
            }
            user = NethuntUserSerializer(data=user)
            if user.is_valid():
                tempUser = user.save()
                coordinator = Coordinator(user=tempUser,image = req.FILES["coordinator"+str(index+1)],phone= coordinator["coordinatorPhone"])
                coordinator.save()
            else:
                NethuntUser.objects.fetch(role="Coordinator").delete()
                return Response({"configured": False})   
        storedCoordinators = Coordinator.objects.all()
        if  storedCoordinators.count()== 2:
            
            eventInfo = data["eventInfo"]
            event = eventInfo["event"]
            year = int(eventInfo["year"])
            commonMailId = eventInfo["commonMailId"] 

            eventLogo = req.FILES["event"]  
            logo = req.FILES["nethunt"]
            
            coordinator1 = storedCoordinators[0]
            coordinator2 = storedCoordinators[1]

            timings = data["quizTimings"]
            startBy = datetime.strptime(timings["startsBy"], '%Y-%m-%dT%H:%M')
            endBy = datetime.strptime(timings["endsBy"], '%Y-%m-%dT%H:%M')

            scorings = data["quizScores"]
            easyScore = int(scorings["easy"])
            moderateScore = int(scorings["medium"])
            hardScore = int(scorings["hard"])
            
            practiceQuiz = Quiz(name="practice")
            practiceQuiz.save()
            practice = Quiz.objects.get(name="Practice")
            mainQuiz = Quiz(name="main")
            mainQuiz.save()
            main = Quiz.objects.get(name="Main")
            print(main,practice)
            data = Info(event=event,year=year,coordinator1=coordinator1,coordinator2=coordinator2,startBy=startBy,endBy=endBy,easyScore=easyScore,moderateScore=moderateScore,hardScore=hardScore,commonMailId=commonMailId,practiceQuiz=practice,mainQuiz=main)
            data.save()
            return Response({"configured": True})
        else:
            NethuntUser.objects.fetch(role="Coordinator").delete()
            Quiz.objects.all().delete()
            return Response({"configured": False}) 
    except:
        NethuntUser.objects.fetch(role="Coordinator").delete()
        Quiz.objects.all().delete()
    return Response({"configured": False})
