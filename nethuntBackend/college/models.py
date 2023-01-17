from django.db import models

# Create your models here.
class College(models.Model):
    collegeName = models.CharField(max_length=200)
    collegeCity = models.CharField(max_length=50)
    def __str__(self):
        return self.collegeName
    