from django.urls import path
# from .views import plot_laptimes
from . import views

urlpatterns = [
    # path('plot_laptimes/', plot_laptimes, name='plot_laptimes')
    path('userselections/', views.UserSelectionList.as_view(), name='userselections-view'),
    path('userselections/<int:pk>/', views.UserSelectionRetrieveUpdateDestroy.as_view(), name='userselections-update'),
    path('speedplot/', views.UserSelectionSpeedPlot.as_view(), name='speedplot-view'),
    path('positionplot/', views.UserSelectionPositionPlot.as_view(), name='positionplot-view')
]