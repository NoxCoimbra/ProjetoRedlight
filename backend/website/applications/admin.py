from django.contrib import admin
from .models import Role,Applicant,Status

# Register your models here.
admin.site.register(Role)
admin.site.register(Applicant)
admin.site.register(Status)