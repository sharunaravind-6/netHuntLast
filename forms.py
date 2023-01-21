from django.contrib.auth.forms import UserChangeForm,UserCreationForm
from .models import NethuntUser
class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = NethuntUser
        fields=("email",)
class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = NethuntUser
        fields=("email",)
     