# Generated by Django 4.1.7 on 2023-05-20 15:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("applications", "0002_applicant_status"),
    ]

    operations = [
        migrations.AlterField(
            model_name="applicant",
            name="age",
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="applicant",
            name="cv",
            field=models.FileField(blank=True, null=True, upload_to="cv/"),
        ),
        migrations.AlterField(
            model_name="applicant",
            name="email",
            field=models.EmailField(blank=True, max_length=100, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name="applicant",
            name="phone",
            field=models.CharField(blank=True, max_length=100, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name="applicant",
            name="status",
            field=models.CharField(
                blank=True,
                choices=[
                    ("approved", "Approved"),
                    ("rejected", "Rejected"),
                    ("under_analysis", "Under Analysis"),
                ],
                default="under_analysis",
                max_length=50,
                null=True,
            ),
        ),
        migrations.AlterField(
            model_name="role",
            name="description",
            field=models.TextField(blank=True, null=True),
        ),
    ]
