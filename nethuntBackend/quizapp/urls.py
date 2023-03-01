from django.urls import path
from . import views
from asgiref.sync import async_to_sync

urlpatterns = [
    path("config", views.is_configured),
    path("get_questions", views.get_questions),
    path("set_config", views.add_config),
    path("add_question",views.add_question),
    path("startBy",views.get_startDate),
    path("endBy",views.get_endDate),
    path("progress",views.get_quiz_status),
    path("status",views.get_quiz_info),
    path("check_answer",views.check_answer),
    path("bottest",views.get_log)
]
