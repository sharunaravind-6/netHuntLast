from django.db import models
from quiz.models import Quiz
# Create your models here.
class Question(models.Model):

    image = models.FileField(upload_to="image")
    hint1 = models.CharField(max_length=100)
    hint2 = models.CharField(max_length=100)
    answer = models.CharField(max_length=100)
    quiz = models.ForeignKey(Quiz, on_delete = models.CASCADE)
    class Meta:
        verbose_name = ("question")
        verbose_name_plural = ("questions")


    def get_absolute_url(self):
        return reverse("question_detail", kwargs={"pk": self.pk})
