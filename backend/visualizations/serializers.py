from rest_framework import serializers
from .models import UserSelection

class UserSelectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSelection
        fields = ['id', 'driver1', 'driver2', 'year', 'race', 'session']