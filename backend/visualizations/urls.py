from django.urls import path
from . import views

urlpatterns = [
    # path('plot_laptimes/', plot_laptimes, name='plot_laptimes')
    # path('userselections/', views.UserSelectionList.as_view(), name='userselections-view'),
    # path('userselections/<int:pk>/', views.UserSelectionRetrieveUpdateDestroy.as_view(), name='userselections-update'),
    # path('speedplot/', views.UserSelectionSpeedPlot.as_view(), name='speedplot-view'),
    # path('positionplot/', views.UserSelectionPositionPlot.as_view(), name='positionplot-view')
    path("user_selections/", views.get_user_selections),
    path("races/<int:year>/", views.get_races),
    path("drivers/<int:year>/<str:racename>/", views.get_drivers),
    path("laps/<int:year>/<str:racename>/<int:driver1>/<int:driver2>/", views.get_laps)
]