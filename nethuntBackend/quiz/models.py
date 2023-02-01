from django.db import models
from user.models import Coordinator
import datetime
# Create your models here.


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
    easyScore = models.IntegerField(default=250)
    moderateScore = models.IntegerField(default=500)
    hardScore = models.IntegerField(default=1000)
    commonMailId = models.EmailField(max_length=254)

class Quiz(models.Model):
    name = models.CharField(max_length=200)
    no_of_questions = models.IntegerField()
    hint1_revealed = models.IntegerField()
    hint2_revealed = models.IntegerField()

    class Meta:
        verbose_name = ("quiz")
        verbose_name_plural = ("quizzes")

    def get_absolute_url(self):
        return reverse("quiz_detail", kwargs={"pk": self.pk})


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

    class Meta:
        verbose_name = ("question")
        verbose_name_plural = ("questions")

    def get_absolute_url(self):
        return reverse("question_detail", kwargs={"pk": self.pk})
