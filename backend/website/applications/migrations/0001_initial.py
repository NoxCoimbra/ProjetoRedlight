# Generated by Django 4.1.7 on 2023-05-26 19:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Role",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=50)),
                ("description", models.TextField(blank=True, null=True)),
                ("is_deleted", models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name="Status",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "status",
                    models.CharField(
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
            ],
        ),
        migrations.CreateModel(
            name="Applicant",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("avatar", models.CharField(blank=True, max_length=100, null=True)),
                ("name", models.CharField(max_length=100)),
                (
                    "email",
                    models.EmailField(
                        blank=True, max_length=100, null=True, unique=True
                    ),
                ),
                (
                    "phone",
                    models.CharField(
                        blank=True, max_length=100, null=True, unique=True
                    ),
                ),
                ("age", models.IntegerField(blank=True, null=True)),
                ("cv", models.FileField(blank=True, null=True, upload_to="cv/")),
                ("is_deleted", models.BooleanField(default=False)),
                (
                    "role",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="applications.role",
                    ),
                ),
                (
                    "status",
                    models.ForeignKey(
                        default=1,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="applications.status",
                    ),
                ),
            ],
        ),
    ]
