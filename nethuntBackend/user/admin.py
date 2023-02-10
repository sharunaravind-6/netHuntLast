from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .forms import (CustomUserChangeForm,CustomUserCreationForm)
# Register your models here.
from .models import (NethuntUser,Candidate,College,Coordinator,NethuntUser)
# admin.site.register(NethuntUser)
class NethuntUserAdmin(UserAdmin):
    list_display = ("email", "role")
    readonly_fields = ("last_login", "date_joined",)
    ordering = ("email",)
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email","password1", "password2","role","first_name","last_name"),
            },
        ),
    )
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = NethuntUser
    exclude=("username",)
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (("Personal info"), {"fields": ("first_name", "last_name",)}),
        (
            ("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        (("Important dates"), {"fields": ("last_login", "date_joined")}),
    )
class CollegeAdmin(admin.ModelAdmin):
    model = College
    # fields = ("collegeName",)
    exclude = ("collegeCity",)
    list_display = ("collegeName","collegeCity",)
    
admin.site.register(NethuntUser,NethuntUserAdmin)
admin.site.register(Candidate)
admin.site.register(College,CollegeAdmin)
admin.site.register(Coordinator)