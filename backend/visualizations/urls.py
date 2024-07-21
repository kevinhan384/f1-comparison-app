from django.urls import path
from .views import plot_laptimes

urlpatterns = [
    path('plot_laptimes/', plot_laptimes, name='plot_laptimes')
]