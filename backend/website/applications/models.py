from typing import Any, Type
from django.db import models
from django.db.models.manager import BaseManager

    
#A base de dados tem 3 modelos: Applicant, Role e Status
#Cada aplicante pode ter uma role e um status
#As roles e os aplicantes são entidades soft deletable, controladas pelo campo is_deleted. 
# Para alem disso as classes RoleQuerySet e ApplicantQuerySet permitem filtrar os objetos que não estão apagados


class RoleQuerySet(models.QuerySet):
    def active(self):
        return self.filter(is_deleted=False)

class Role(models.Model):
    
    title = models.CharField(max_length=50 )
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
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default=1, null=True, blank=True)

    def __int__(self):
        return self.status.id



class ApplicantQuerySet(models.QuerySet):
    def active(self):
        return self.filter(is_deleted=False)
    
class Applicant(models.Model):
    avatar = models.CharField(max_length=100, null=True, blank=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, null=True, blank=True, unique=True)
    phone = models.CharField(max_length=100, null=True, blank=True, unique=True)
    age = models.IntegerField(null=True, blank=True)
    cv = models.FileField(upload_to='cv/', null=True, blank=True)         
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    status = models.ForeignKey(Status, on_delete=models.CASCADE,default=1)        # O estado default de um aplicante é under_analysis
    is_deleted = models.BooleanField(default=False)

    objects = models.Manager()  
    active_objects = ApplicantQuerySet.as_manager()  

    def __str__(self):
        return self.name


