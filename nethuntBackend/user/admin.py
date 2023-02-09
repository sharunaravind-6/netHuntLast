from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .forms import (CustomUserChangeForm,CustomUserCreationForm)
# Register your models here.
from .models import (NethuntUser,Candidate,College,Coordinator,NethuntUser)
# admin.site.register(NethuntUser)
class NethuntUserAdmin(UserAdmin):
    list_display = ("email", "is_staff", "is_superuser")
    readonly_fields = ("last_login", "date_joined",)
    ordering = ("email",)
    fieldsets = (
        (
            "Fields",
            {
                "fields": (
                    "email",
                    "uuid",
                    "date_joined",
                    "last_login",
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                    "password",
                )
            },
        ),
    )
    exclude = ["username"]
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = NethuntUser
admin.site.register(NethuntUser,NethuntUserAdmin)
admin.site.register(Candidate)
admin.site.register(College)
admin.site.register(Coordinator)