from django.db import models

# Create your models here.
class College(models.Model):
    collegeName = models.CharField(max_length=200)
    collegeCity = models.CharField(max_length=50)
    def __str__(self):
        return self.collegeName
from django.db import models
from quiz.models import Quiz
# Create your models here.
class Instruction(models.Model):
    info = models.CharField(max_length=200)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE,)
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
from django.db import models
from college.models import College
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass
# Create your models here.
def validCollege(value):
        if User.objects.filter(collegeName=value).count() >= 2:
            raise ValueError("College already with two participants")
class User(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=150)
    collegeName = models.ForeignKey(to=College, on_delete=models.CASCADE,validators=[validCollege])
    email = models.EmailField(max_length=254,primary_key=True)
    current_level = models.IntegerField(default=1)
    status = models.CharField(default="offline",max_length=10)

    def save(self,*args,**kwargs):
        self.password = make_password(self.password)
        super(User, self).save(*args,**kwargs)
def validPhone(value):
    if len(value) > 10 or len(value) < 10:
        raise ValueError("Phone number must be of 10 digits")
    for no in value:
        if no not in ["1","2","3","4","5","6","7","8","9","0"]:
            raise ValueError("Phone no must contain valid characters")
class Coordinator(models.Model):
    coordinatorName = models.CharField(max_length=20)
    coordinatorEmail = models.EmailField(max_length=254)
    coordinatorPhone = models.CharField(max_length=10,validators=[validPhone])
    CoordinatorPhoto = models.FileField(upload_to="image/coordinator")
#settiongs.py
