from django.db import models
from quiz.models import QuizModel

# Create your models here.
class QuestionModel(models.Model):
    question = models.ImageField()
    quiz = models.ForeignKey(QuizModel, on_delete=models.CASCADE)
    hint1 = models.CharField(max_length=100)
    hint2 = models.CharField(max_length=100)
    answer = models.CharField(max_length=100)
    class Meta:
        verbose_name = ("Question")
        verbose_name_plural = ("Question")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Question_detail", kwargs={"pk": self.pk})
