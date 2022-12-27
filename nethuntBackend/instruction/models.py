from django.db import models
from quiz.models import Quiz
# Create your models here.
class Instruction(models.Model):
    info = models.CharField(max_length=200)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE,)