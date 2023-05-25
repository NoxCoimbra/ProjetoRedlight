from typing import Any, Type
from django.db import models
from django.db.models.manager import BaseManager

    

class RoleQuerySet(models.QuerySet):
    def active(self):
        return self.filter(is_deleted=False)

class Role(models.Model):
    ROLE_CHOICES = (
        ('backend', 'Backend'),
        ('frontend', 'Frontend'),
        ('designer', 'Designer'),
    )
    title = models.CharField(max_length=50, choices=ROLE_CHOICES)
    description = models.TextField(null=True, blank=True)
    is_deleted = models.BooleanField(default=False)
    objects = models.Manager()
    active_objects = RoleQuerySet.as_manager()
    
    def __str__(self):
        return self.title




class Status(models.Model):
    STATUS_CHOICES = (
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('under_analysis', 'Under Analysis'),
    )
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='under_analysis', null=True, blank=True)

    def __str__(self):
        return self.status



class ApplicantQuerySet(models.QuerySet):
    def active(self):
        return self.filter(is_deleted=False)
    
class Applicant(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, null=True, blank=True, unique=True)
    phone = models.CharField(max_length=100, null=True, blank=True, unique=True)
    age = models.IntegerField(null=True, blank=True)
    cv = models.FileField(upload_to='cv/', null=True, blank=True)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    status = models.ForeignKey(Status, on_delete=models.CASCADE, null=True, blank=True, default=1)
    is_deleted = models.BooleanField(default=False)

    objects = models.Manager()  # Default manager
    active_objects = ApplicantQuerySet.as_manager()  # Manager for active (non-deleted) applicants

    def __str__(self):
        return self.name


