# Generated by Django 5.0.7 on 2024-12-29 07:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("visualizations", "0006_alter_userselection_driver1_and_more"),
    ]

    operations = [
        migrations.RenameField(
            model_name="userselection",
            old_name="race",
            new_name="racename",
        ),
        migrations.RemoveField(
            model_name="userselection",
            name="session",
        ),
        migrations.AlterField(
            model_name="userselection",
            name="driver1",
            field=models.PositiveSmallIntegerField(),
        ),
        migrations.AlterField(
            model_name="userselection",
            name="driver2",
            field=models.PositiveSmallIntegerField(),
        ),
        migrations.AlterField(
            model_name="userselection",
            name="year",
            field=models.PositiveSmallIntegerField(),
        ),
    ]
