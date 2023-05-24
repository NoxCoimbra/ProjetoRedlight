from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path("list/", views.list_applicants, name="list_applicants"),
    path("add/", views.add_applicant, name="add_applicant"),
    path("delete/<int:applicant_id>/", views.delete_applicant, name="delete_applicant"),
    path("edit/<int:applicant_id>/", views.edit_applicant, name="edit_applicant"),
    path("list_roles/", views.list_roles, name="list_roles"),
    path("add_role/", views.create_role, name="add_role"),
    path("delete_role/<int:role_id>/", views.delete_role, name="delete_role"),
   
]   
