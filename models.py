from django.db import models
from django.contrib.auth.models import (AbstractUser, BaseUserManager)
# Create your models here.


def validCollege(value):
    if User.objects.filter(collegeName=value).count() >= 2:
        raise ValueError("College already with two participants")


class NethuntUserManager(BaseUserManager):
    def get_queryset(self):
        return super().get_queryset().all()


class NethuntUser(AbstractUser):
    def create_user(self, email, password):
        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.save()

    def create_superuser(self, email, password):
        extraField.setdefault("is_superuser", True)
        extraField.setdefault("is_staff", True)
        extraField.setdefault("is_active", True)
        self.create_user(email, password)

    class Role(models.TextChoices):
        COORDINATOR = "Coordinator", "COORDINATOR"
        CANDIDATE = "Candidate", "CANDIDATE"
        ADMIN = "Admin", "ADMIN"
    USERNAME_FIELD = "email"
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=50, choices=Role.choices)
    objects = NethuntUserManager()


class College(models.Model):
    collegeName = models.CharField(max_length=200)
    collegeCity = models.CharField(max_length=50)

    def __str__(self):
        return self.collegeName


class NethuntCandidate(NethuntUser):
    class Meta:
        proxy = True


class CandidateDetails(models.Model):
    user = models.OneToOneField(NethuntCandidate, models.CASCADE)
    collegeName = models.ForeignKey(
        to=College, on_delete=models.CASCADE, validators=[validCollege])
    current_level = models.IntegerField(default=1)
    status = models.CharField(default="offline", max_length=10)
