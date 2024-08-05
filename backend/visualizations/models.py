from django.db import models

# Create your models here.
class UserSelection(models.Model):
    driver1 = models.CharField(max_length=50)
    driver2 = models.CharField(max_length=50)
    race = models.CharField(max_length=50, default="")
    year = models.PositiveIntegerField(default=2018)
    session = models.CharField(max_length=2, default="")
    # plot = models.ImageField(allow_empty_file=True)