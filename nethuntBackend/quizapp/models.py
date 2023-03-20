from django.db import models
from user.models import (Coordinator,NethuntUser)
import datetime
# Create your models here.

# class Temp(models.Model):
#     temp = models.FileField(upload_to="images") 
class Quiz(models.Model):
    name = models.CharField(max_length=200)
    no_of_questions = models.IntegerField(default=30)
    hint1_revealed = models.IntegerField(default=50)
    hint2_revealed = models.IntegerField(default=100)

    class Meta:
        verbose_name = ("quiz")
        verbose_name_plural = ("quizzes")

    def get_absolute_url(self):
        return reverse("quiz_detail", kwargs={"pk": self.pk})


class Info(models.Model):
    class Event(models.TextChoices):
        LOGIN = "Login","LOGIN"
        THIRAN = "Thiran","THIRAN"
    event = models.CharField(max_length=50,choices=Event.choices,default=Event.THIRAN)
    year = models.IntegerField(default=datetime.date.today().year)
    eventLogo = models.FileField(upload_to="images") 
    logo = models.FileField(upload_to="images")
    coordinator1 = models.ForeignKey(
        Coordinator, on_delete=models.CASCADE, related_name="Coordinator1")
    coordinator2 = models.ForeignKey(
        Coordinator, on_delete=models.CASCADE, related_name="Coordinator2")
    startBy = models.DateTimeField()
    endBy = models.DateTimeField()
    easyScore = models.IntegerField(default=240)
    moderateScore = models.IntegerField(default=500)
    hardScore = models.IntegerField(default=1000)
    commonMailId = models.EmailField(max_length=254)
    practiceQuiz = models.ForeignKey(Quiz,models.CASCADE,related_name="practice")
    mainQuiz = models.ForeignKey(Quiz,models.CASCADE,related_name="main")


class Question(models.Model):

    image = models.FileField(upload_to="image")
    hint1 = models.CharField(max_length=100)
    hint2 = models.CharField(max_length=100)
    answer = models.CharField(max_length=100)
    class Difficulty(models.TextChoices):
        EASY = "Easy","EASY"
        MODERATE = "Moderate","MODERATE"
        HARD = "Hard","HARD"
    difficulty = models.CharField(max_length=50,choices=Difficulty.choices,default=Difficulty.EASY)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    def update(self, **kwargs):
        for field, value in kwargs.items():
            setattr(self, field, value)
        self.save()
    class Meta:
        verbose_name = ("question")
        verbose_name_plural = ("questions")

    def get_absolute_url(self):
        return reverse("question_detail", kwargs={"pk": self.pk})


class CurrentStatus(models.Model):
    usr = models.ForeignKey(NethuntUser, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    level = models.IntegerField(default=0)
    score = models.IntegerField(default=0)
class Progress(models.Model):
    usr = models.ForeignKey(NethuntUser, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    level = models.IntegerField(default=0)
    hits = models.IntegerField(default=0)
    points = models.IntegerField(default=0)

class Ordering(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.SET_DEFAULT,default=None)
    question = models.ForeignKey(Question, on_delete=models.SET_NULL,null=True)
    userType = models.CharField(max_length=50,default="BASIC")
