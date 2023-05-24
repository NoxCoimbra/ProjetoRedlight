from django.shortcuts import render, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import Applicant, Role, Status

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
    
   
    applicant = get_object_or_404(Applicant, id=applicant_id)
    
    if request.method == 'POST':
        
        applicant.name = request.POST.get('name', applicant.name)
        applicant.email = request.POST.get('email', applicant.email)
        applicant.phone = request.POST.get('phone', applicant.phone)
        applicant.age = request.POST.get('age', applicant.age)
        status_id = request.POST.get('status')
        role_id = request.POST.get('role')
    
        if role_id:
            role = get_object_or_404(Role, id=role_id)
            applicant.role = role
        
        if status_id:
        
            status = get_object_or_404(Status, id=status_id)
           
            applicant.status = status
         
        
        applicant.save()
        return JsonResponse({'status': 'success', 'message': 'Applicant edited successfully'})
    else:
        return JsonResponse({'status': 'error'})

#View para listar todos os aplicantes
@csrf_exempt
def list_applicants(request):
    if request.method == 'GET':
        applicants = Applicant.objects.all()
        applicant_list = []

        for applicant in applicants:
            applicant_data = {
                'id': applicant.id,
                'name': applicant.name,
                'email': applicant.email,
                'phone': applicant.phone,
                'age': applicant.age,
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
        roles = Role.objects.all()
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
    print("oi?")
    if request.method == 'POST':
        print("han")
        title = request.POST.get('name')
        
        
        if title:
            print("bro")
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
        return JsonResponse({'status': 'success', 'message': 'Role deleted successfully'})