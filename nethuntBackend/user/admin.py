from django.contrib import admin
from .models import NethuntUser
from django.contrib.auth.admin import UserAdmin
from .forms import (CustomUserChangeForm,CustomUserCreationForm)
# Register your models here.
class NethuntUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = NethuntUser
    list_display = ("email","is_active","is_admin","is_coordinator","is_candidate")
    list_filter = ("is_admin","is_coordinator","is_candidate")
admin.site.register(NethuntUser,NethuntUserAdmin)
