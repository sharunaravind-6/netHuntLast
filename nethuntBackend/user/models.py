from django.db import models
from django.contrib.auth.models import AbstractUser,BaseUserManager
# Create your models here.
class NethuntUserManager(BaseUserManager):
    def create_user(self,email,password,**extraFields):
        email = self.normalize_email(email)
        user = self.model(email=email,**extraFields)
        user.set_password(password)
        user.save()
        return user
class NethuntUser(AbstractUser):
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["is_admin","is_coordinator","is_candidate"]
    email = models.EmailField( unique=True)
    objects = NethuntUserManager
    is_admin = models.BooleanField(default=False)
    is_candidate = models.BooleanField(default=True)
    is_coordinator = models.BooleanField(default=False)