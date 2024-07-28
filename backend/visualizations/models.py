from django.db import models

# Create your models here.
class UserSelection(models.Model):
    driver1 = models.CharField(max_length=50)
    driver2 = models.CharField(max_length=50)
    # circuit = models.CharField(max_length=50)
    # year = models.PositiveIntegerField()
    # plot = models.ImageField(allow_empty_file=True)