from django.contrib import admin
from .models import Coordinator
# Register your models here.
from user.models import User
admin.site.register(User)
admin.site.register(Coordinator)