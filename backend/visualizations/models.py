from django.db import models

# Create your models here.
class UserSelection(models.Model):
    year = models.PositiveSmallIntegerField()
    racename = models.CharField(max_length=50)
    driver1 = models.PositiveSmallIntegerField()
    driver2 = models.PositiveSmallIntegerField()
    