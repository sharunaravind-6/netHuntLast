from django.shortcuts import render
from .models import Info,Quiz
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from user.models import (Coordinator,NethuntUser)
from user.serializers import (CoordinatorSerializer)
from user.serializers import NethuntUserSerializer
from quizapp.models import Info,Question,Progress,CurrentStatus
from .serializers import QuestionSerializer,QuizSerializer,ProgressSerializer,CurrentStatusSerializer
import json
import copy
from datetime import datetime
import requests
import base64
from django.utils import timezone
@api_view(["GET"])
def get_startDate(req):
    if (Info.objects.all().count() >= 1):
        return Response({"configured": True,"startDateTime":Info.objects.all()[0].startBy})
    return Response({"configured": False})

@api_view(["GET"])
def get_endDate(req):
    return Response({"configured": True,"endDateTime":Info.objects.all()[0].endBy})



def send_log_data(msg):
    url = "https://discord.com/api/webhooks/1077878410271019008/vwKfxy-5NL8az1_Xwlf6zwpWQ0B18hAzUj03wqJU9t8mjs5H3RZ7ZVTo7DUQTQOLB9jA" # Replace with your own webhook URL

    payload = {
        "content": msg
    }

    headers = {
        "Content-Type": "application/json"
    }

    response = requests.post(url, json=payload, headers=headers)

    if response.status_code == 204:
        return Response({"info":"Message sent to Discord channel."})
    else:
        return Response({"info":"Failed to send message to Discord channel."})

@api_view(["POST"])
def get_quiz_info(req):
    data = json.loads(req.body)
    
    current_status = CurrentStatus.objects.filter(usr=req.user,quiz=Quiz.objects.get(name=data["quiz"]))
    if current_status.count() == 0:
        #the user is a freash one starting the quiz, who doeesn't have the current status to track his progress
        CurrentStatus(usr=req.user,quiz=Quiz.objects.get(name=data["quiz"])).save()
        progress = Progress(usr=req.user,quiz=Quiz.objects.get(name=data["quiz"])).save()
        progressSerializer = ProgressSerializer(progress,).data
    elif current_status.count() == 1:
        #person who already played the quiz with the current level stored in the current status
        progress = Progress.objects.filter(usr=req.user,quiz=Quiz.objects.get(name=data["quiz"]),level=current_status[0].level)
        print(progress.count())
        if progress.count() == 1:
            if current_status[0].level +1 > Question.objects.all().count():
                return Response({"problem":True,"end":True,"multipleCurrentStatus":False,"multipleProgress":False}) 
            #has record for the current level
            else:
                question = Question.objects.filter(quiz=Quiz.objects.get(name=data["quiz"]))[current_status[0].level]
                questionSerializer = QuestionSerializer(question,).data
                questionSerializer["image"] = base64.b64encode(question.image.read()).decode('utf-8')
                progressX = Progress(usr=req.user,quiz=Quiz.objects.get(name=data["quiz"]),level=current_status[0].level)
                progressSerializer = ProgressSerializer(progressX,).data
    status = CurrentStatus(usr=req.user,quiz=Quiz.objects.get(name=data["quiz"]))
    statusSerializer = CurrentStatusSerializer(status).data
    noOfQuestion = Question.objects.filter(quiz=Quiz.objects.get(name=data["quiz"])).count()
    question = Question.objects.filter(quiz=Quiz.objects.get(name=data["quiz"]))[statusSerializer["level"]]
    questionSerializer = QuestionSerializer(question,).data
    questionSerializer["image"] = base64.b64encode(question.image.read()).decode('utf-8')

    progress = Progress.objects.filter(usr=req.user,quiz=Quiz.objects.get(name=data["quiz"]),level=statusSerializer["level"])
    progressSerializer = ProgressSerializer(progress[0],).data
    return Response({"status":statusSerializer,"total_ques":noOfQuestion,"current_question":questionSerializer,"progress":progressSerializer})

@api_view(["POST"])
def check_answer(req):
    data = json.loads(req.body)
    current_status = CurrentStatus.objects.filter(usr=req.user,quiz=Quiz.objects.get(name=data["quiz"]))
    progress = Progress.objects.filter(usr=req.user,quiz=Quiz.objects.get(name=data["quiz"]),level=current_status[0].level)
    question = Question.objects.filter(quiz=Quiz.objects.get(name=data["quiz"]))[current_status[0].level]
    send_log_data("User : "+req.user.email + "\nCorrent Answer : "+ question.answer + "\nGuessed One : "+data["try"] + "\n Time "+str(timezone.now()))
    # print(question)
    if question.answer == data["try"]:
        Progress(usr=req.user,quiz=Quiz.objects.get(name=data["quiz"]),level=current_status[0].level+1).save()
        current_status.update(level=current_status[0].level+1)
        if current_status[0].level +1 > Question.objects.filter(quiz=Quiz.objects.get(name=data["quiz"])).count():
            return Response({"passed":True,"end":True})
        else:
            progressX = Progress.objects.filter(usr=req.user,quiz=Quiz.objects.get(name=data["quiz"]),level=current_status[0].level)
            progressSerializer = ProgressSerializer(progressX[0],).data
            question = Question.objects.filter(quiz=Quiz.objects.get(name=data["quiz"]))[current_status[0].level]
            questionSerializer = QuestionSerializer(question,).data
            questionSerializer["image"] = base64.b64encode(question.image.read()).decode('utf-8')
            return Response({"passed" : True,"end":False,"question":questionSerializer,"progress":progressSerializer})
    else:
        # print(progress)
        progress.update(hits=progress[0].hits+1)  
        progressSerializer = ProgressSerializer(progress[0],).data
        return Response({"passed":False,"progress":progressSerializer})
@api_view(["POST"])
def get_quiz_status(req):
    data = json.loads(req.body)
    current_status = CurrentStatus.objects.filter(usr=NethuntUser.objects.get(email=data["email"]),quiz=Quiz.objects.get(name=data["quiz"]))
    if current_status.count() == 0:
        #the user is a freash one starting the quiz, who doeesn't have the current status to track his progress
        CurrentStatus(usr=NethuntUser.objects.get(email=data["email"]),quiz=Quiz.objects.get(name=data["quiz"])).save()
        progress = Progress(usr=NethuntUser.objects.get(email=data["email"]),quiz=Quiz.objects.get(name=data["quiz"])).save()
        progressSerializer = ProgressSerializer(progress,).data
        question = Question.objects.filter(quiz=Quiz.objects.get(name=data["quiz"]))[current_status[0].level]
        questionSerializer = QuestionSerializer(question,).data
        questionSerializer["image"] = base64.b64encode(question.image.read()).decode('utf-8')
        return Response({"problem":False,"question":questionSerializer,"progress":progressSerializer,})
    elif current_status.count() == 1:
        #person who already played the quiz with the current level stored in the current status
        progress = Progress.objects.filter(usr=NethuntUser.objects.get(email=data["email"]),quiz=Quiz.objects.get(name=data["quiz"]),level=current_status[0].level)
        print(progress.count())
        if progress.count() == 1:
            if current_status[0].level +1 > Question.objects.all().count():
                return Response({"problem":True,"end":True,"multipleCurrentStatus":False,"multipleProgress":False}) 
            #has record for the current level
            else:
                question = Question.objects.filter(quiz=Quiz.objects.get(name=data["quiz"]))[current_status[0].level]
                questionSerializer = QuestionSerializer(question,).data
                questionSerializer["image"] = base64.b64encode(question.image.read()).decode('utf-8')
                progressX = Progress(usr=NethuntUser.objects.get(email=data["email"]),quiz=Quiz.objects.get(name=data["quiz"]),level=current_status[0].level)
                progressSerializer = ProgressSerializer(progressX,).data
                return Response({"problem":False,"question":questionSerializer,"progress":progressSerializer})
        else :
            return Response({"problem":True,"end":False,"multipleCurrentStatus":False,"multipleProgress":True})
    else:
        return Response({"problem":True,"end":False,"multipleCurrentStatus":True,"multipleProgress":False})
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
