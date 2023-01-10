from django.contrib import admin
from .models import Quiz
from .models import Question
# Register your models here.
admin.site.register(Quiz)
admin.site.register(Question)