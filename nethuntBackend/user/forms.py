from django.contrib.auth.forms import UserChangeForm,UserCreationForm
from .models import NethuntUser
from django.forms import EmailField

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = NethuntUser
        fields=("email",)
        field_classes = {"email": EmailField}
class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = NethuntUser
        fields=("email",)
        field_classes = {"email": EmailField}