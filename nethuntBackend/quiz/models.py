from django.db import models

# Create your models here.
class QuizModel(models.Model):

    name = models.CharField(max_length=100)
    no_of_questions = models.IntegerField()
    hint_1_reveal = models.IntegerField()
    hint_2_reveal = models.IntegerField()
    
    class Meta:
        verbose_name = ("quiz")
        verbose_name_plural = ("quizies")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("quiz_detail", kwargs={"pk": self.pk})