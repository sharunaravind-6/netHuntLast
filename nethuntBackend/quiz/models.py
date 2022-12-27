from django.db import models

# Create your models here.
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
