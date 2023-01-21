from django.contrib import admin
from .models import (NethuntUser,NethuntCandidate)
from django.contrib.auth.admin import UserAdmin
from .forms import (CustomUserChangeForm,CustomUserCreationForm)
# Register your models here.
class NethuntUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    add_fieldsets = (
        (None,{"fields":("email","password")})
    )
    model = NethuntUser
admin.site.register(NethuntUser,NethuntUserAdmin)
admin.site.register(NethuntCandidate)
