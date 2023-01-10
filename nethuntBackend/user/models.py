from django.db import models
from college.models import College
from django.contrib.auth.hashers import make_password
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