from django.contrib import admin

# Register your models here.
from .models import (NethuntUser,Candidate,College,Coordinator)
# admin.site.register(NethuntUser)
admin.site.register(Candidate)
admin.site.register(College)
admin.site.register(Coordinator)