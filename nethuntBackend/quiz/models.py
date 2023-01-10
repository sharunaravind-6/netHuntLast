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
