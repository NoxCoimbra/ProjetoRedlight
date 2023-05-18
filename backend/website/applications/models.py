from typing import Any, Type
from django.db import models
from django.db.models.manager import BaseManager



class Role(models.Model):
    ROLE_CHOICES = (
        ('backend', 'Backend'),
        ('frontend', 'Frontend'),
        ('designer', 'Designer'),
    )
    title = models.CharField(max_length=50, choices=ROLE_CHOICES)
    description = models.TextField()
     
    def __str__(self):
        return self.title
    


class Applicant(models.Model):
    name=models.CharField(max_length=100)
    email=models.EmailField(max_length=100)
    phone=models.CharField(max_length=100)
    age=models.IntegerField()
    cv = models.FileField(upload_to='cv/')
    STATUS_CHOICES = (
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('under_analysis', 'Under Analysis'),
    )
    status = models.CharField(max_length=50, choices=STATUS_CHOICES,default='under_analysis')
    role=models.ForeignKey(Role,on_delete=models.CASCADE)

    def __str__(self):
        return self.name