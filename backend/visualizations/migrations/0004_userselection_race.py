# Generated by Django 5.0.7 on 2024-08-05 16:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('visualizations', '0003_userselection_year'),
    ]

    operations = [
        migrations.AddField(
            model_name='userselection',
            name='race',
            field=models.CharField(default='', max_length=50),
        ),
    ]
