from django.urls import path
from . import views

urlpatterns = [
    path("user_selections/", views.get_user_selections),
    path("races/<int:year>/", views.get_races),
    path("drivers/<int:year>/<str:racename>/", views.get_drivers),
    path("laps/<int:year>/<str:racename>/<str:driver1>/<str:driver2>/", views.get_laps)
]