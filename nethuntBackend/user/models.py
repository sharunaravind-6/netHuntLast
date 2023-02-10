from django.db import models
from django.contrib.auth.models import (AbstractUser, BaseUserManager)
# Create your models here.


class Role(models.TextChoices):
    COORDINATOR = "Coordinator", "COORDINATOR"
    CANDIDATE = "Candidate", "CANDIDATE"
    ADMIN = "Admin", "ADMIN"


class NethuntUserManager(BaseUserManager):
    def get_queryset(self):
        return super().get_queryset()

    def create_user(self, email, password, **extraField):
        user = self.model(email=self.normalize_email(email), **extraField)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extraField):
        extraField.setdefault("is_superuser", True)
        extraField.setdefault("is_staff", True)
        extraField.setdefault("is_active", True)
        extraField.setdefault("role", Role.ADMIN)
        return self.create_user(email, password, **extraField)


class NethuntUser(AbstractUser):
    email = models.EmailField(unique=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['username']
    username = None
    role = models.CharField(max_length=50, choices=Role.choices)
    objects = NethuntUserManager()


class NethuntCandidateManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(role=Role.CANDIDATE)


class NethuntCandidate(NethuntUser):
    class Meta:
        proxy = True


class College(models.Model):
    collegeName = models.CharField(max_length=100)
    collegeCity = models.CharField(max_length=50)
    def __str__(self):
        return self.collegeName
    


def validPhone(value):
    if len(value) > 10 or len(value) < 10:
        raise ValueError("Phone number must be of 10 digits")
    for no in value:
        if no not in ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]:
            raise ValueError("Phone no must contain valid characters")


class Candidate(models.Model):
    user = models.OneToOneField(NethuntCandidate, on_delete=models.CASCADE)
    college = models.ForeignKey(College, on_delete=models.CASCADE)
    current_level = models.IntegerField(default=1)
    status = models.CharField(default="offline", max_length=10)
    phone = models.CharField(max_length=10, validators=[validPhone])

class NethuntCoordinatorManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(role=Role.COORDINATOR)


class NethuntCoordinator(NethuntUser):
    class Meta:
        proxy = True

class Coordinator(models.Model):
    user = models.OneToOneField(NethuntCoordinator, on_delete=models.CASCADE)
    image = models.FileField(upload_to="images")
    phone = models.CharField(max_length=10, validators=[validPhone])
