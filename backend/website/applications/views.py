from django.shortcuts import render, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import Applicant, Role, Status
from django.core.exceptions import ObjectDoesNotExist
import requests
import json
# Create your views here.


#View para adicionar um aplicante
@csrf_exempt
def add_applicant(request):



    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        age = request.POST.get('age')
        cv = request.FILES.get('cv')
        role_id = request.POST.get('role_id')
      
        applicant = Applicant(name=name, email=email, phone=phone, role_id=role_id, age=age, cv=cv)
        applicant.save()

        return JsonResponse({'status': 'success', 'message': 'Applicant added successfully'})

    return JsonResponse({'status': 'error'})


#View para dar delete a um aplicante ( dado um id)~
@csrf_exempt
def delete_applicant(request,applicant_id):
    applicant = Applicant.objects.get(id=applicant_id)
    applicant.is_deleted=True
    applicant.save()
    return JsonResponse({'status': 'success', 'message': 'Applicant deleted successfully'})


@csrf_exempt
def edit_applicant(request, applicant_id):
    client_id = "f508a33572dd6df"
    
    applicant = get_object_or_404(Applicant, id=applicant_id)
  
    if request.method == 'POST':
        image_file = request.FILES.get('avatar')
        print(image_file)
        applicant.name = request.POST.get('name', applicant.name)
        applicant.email = request.POST.get('email', applicant.email)
        applicant.phone = request.POST.get('phone', applicant.phone)
        applicant.age = request.POST.get('age', applicant.age)
        status_id = request.POST.get('status')
        role_id = request.POST.get('role')

        print("oi")

        if image_file:
            url = "https://api.imgur.com/3/image"
            headers = {"Authorization": f"Client-ID {client_id}"}
            files = {"image": image_file}
            try:
                    # Send the image file to Imgur API
                    response = requests.post(url, headers=headers, files=files)
                    data = json.loads(response.text)
                    image_url = data["data"]["link"]
                    
                    # Save the image URL to the applicant
                    applicant.avatar = image_url
            except requests.exceptions.RequestException as e:
                # Handle any API request errors
                return JsonResponse({'status': 'error', 'message': str(e)})

        if role_id:
            role = get_object_or_404(Role, id=role_id)
            applicant.role = role
        
        if status_id:
        
            status = get_object_or_404(Status, id=status_id)
           
            applicant.status = status

        if applicant.email:
            try:
                existing_applicant = Applicant.objects.exclude(id=applicant.id).get(email=applicant.email)
                return JsonResponse({'status': 'error', 'message': 'Email already exists in the database'})
            except ObjectDoesNotExist:
                pass

        if applicant.phone:
            try:
                existing_applicant = Applicant.objects.exclude(id=applicant.id).get(phone=applicant.phone)
                return JsonResponse({'status': 'error', 'message': 'Phone already exists in the database'})
            except ObjectDoesNotExist:
                pass
        
        applicant.save()
        return JsonResponse({'status': 'success'})
    else:
        return JsonResponse({'status': 'error'})

#View para listar todos os aplicantes
@csrf_exempt
def list_applicants(request):
    if request.method == 'GET':
        applicants = Applicant.active_objects.active()
        
        applicant_list = []
                  
        for applicant in applicants:
            print(applicant.status)
            applicant_data = {
                'id': applicant.id,
                'name': applicant.name,
                'email': applicant.email,
                'phone': applicant.phone,
                'age': applicant.age,
                'avatar': applicant.avatar,
                'status': {
                    'id':applicant.status.id,
                    'status': applicant.status.status
                    
                },
                'role': {
                    'id': applicant.role.id,
                    'title': applicant.role.title,
                    'description': applicant.role.description
                }
            }
            applicant_list.append(applicant_data)

        return JsonResponse(applicant_list, safe=False)
    else:
        return JsonResponse({'status': 'error'})

@csrf_exempt
def list_roles(request):
    if request.method == 'GET':
        roles = Role.active_objects.active()
        role_list = []
      

        for role in roles:
            role_data = {
                'id': role.id,
                'title': role.title,
                'description': role.description
            }
            role_list.append(role_data)
        
      

        return JsonResponse(role_list, safe=False)
    else:
        return JsonResponse({'status': 'error'})


#View to create a new role
@csrf_exempt
def create_role(request):
    
    if request.method == 'POST':
       
        title = request.POST.get('name')
        
        
        if title:
        
            role = Role(title=title)
            role.save()
            return JsonResponse({'success': True, 'message': 'Role created successfully'})
        else:
            return JsonResponse({'success': False, 'message': 'Title is required'}, status=400)
    else:
        return JsonResponse({'success': False, 'message': 'Invalid request method'}, status=405)

#view to delete a role
@csrf_exempt
def delete_role(request,role_id):
    if request.method == 'DELETE':
        role = Role.objects.get(id=role_id)
        role.is_deleted=True
        role.save()
        return JsonResponse({'status': 'success', 'message': 'Role deleted successfully'})