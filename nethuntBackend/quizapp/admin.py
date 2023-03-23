from django.contrib import admin
from .models import Info,Quiz,Question,Progress,CurrentStatus,Ordering
# Register your models here.
admin.site.register(Info)
admin.site.register(Quiz)
admin.site.register(Question)
admin.site.register(Progress)
admin.site.register(CurrentStatus)
admin.site.register(Ordering)