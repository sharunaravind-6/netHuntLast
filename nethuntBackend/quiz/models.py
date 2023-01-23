from django.db import models
from user.models import Coordinator
# Create your models here.
class Info(models.Model):
    flag = models.BooleanField(default=False)
    logo = models.FileField(upload_to="images")
    coordinator1 = models.ForeignKey(Coordinator, on_delete=models.CASCADE,related_name="Coordinator1")
    coordinator2 = models.ForeignKey(Coordinator, on_delete=models.CASCADE,related_name="Coordinator2")
    startBy = models.DateTimeField()
    endtBy = models.DateTimeField()