from django.shortcuts import render, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import Applicant, Role, Status
from django.core.exceptions import ObjectDoesNotExist
import requests
import json
from django.db.models import Q
# Create your views here.


#View para adicionar um aplicante
#Neste momento apenas é necssario o nome e a role ( visto que no frontend não é possivel adicionar um aplicante com mais campos, sendo apenas possivel
# editar o aplicante depois de adicionado
@csrf_exempt
def add_applicant(request):
    if request.method == 'POST':
        name = request.POST.get('name')
       
        role_id = request.POST.get('role_id')
        
        applicant = Applicant(name=name, role_id=role_id)
        applicant.save()
        return JsonResponse({'status': 'success', 'message': 'Applicant added successfully'})
    return JsonResponse({'status': 'error'})


#View para dar delete a um aplicante ( dado um id), com o soft delete apenas é necessario alterar o campo is_deleted para Truv
@csrf_exempt
def delete_applicant(request,applicant_id):
    applicant = Applicant.objects.get(id=applicant_id)
    applicant.is_deleted=True
    applicant.save()
    return JsonResponse({'status': 'success', 'message': 'Applicant deleted successfully'})


#View para editar um aplicante ( dado um id), para o avatar é necessario fazer um post para o imgur e guardar o link da imagem
@csrf_exempt
def edit_applicant(request, applicant_id):
    client_id = "f508a33572dd6df"   
    applicant = get_object_or_404(Applicant, id=applicant_id)
    if request.method == 'POST':
        image_file = request.FILES.get('avatar')
        applicant.name = request.POST.get('name', applicant.name)
        applicant.email = request.POST.get('email', applicant.email)
        applicant.phone = request.POST.get('phone', applicant.phone)
        applicant.age = request.POST.get('age', applicant.age)
        status_name = request.POST.get('status')        # Do frontend vem o status em string ( approved/ rejected/ under_analysis)
        status = Status.objects.filter(Q(status=status_name)).first() # É feita uma filtragem para encontrar o objeto correspondente ao valor que é recebido
        role_id = request.POST.get('role')

        # Se for recebido um ficheiro de imagem, é feito um post para o imguur e é guardado o link da imagem
        if image_file:
            url = "https://api.imgur.com/3/image"
            headers = {"Authorization": f"Client-ID {client_id}"}
            files = {"image": image_file}
            try:
                    # Envio da imagem para o imgur
                    response = requests.post(url, headers=headers, files=files)
                    data = json.loads(response.text)
                    image_url = data["data"]["link"]
                    
                    # Guardar o link da imagem no campo avatar
                    applicant.avatar = image_url
            except requests.exceptions.RequestException as e:
                return JsonResponse({'status': 'error', 'message': str(e)})

        if role_id:
            role = get_object_or_404(Role, id=role_id)
            applicant.role = role
        
        if status:
            #O id do novo status do aplicante é guardado
            status = get_object_or_404(Status, id=status.id)
           
            applicant.status = status

        #Caso o email já exista na base de dados é enviada uma mensagem de erro para o frontend ( e o aplicante não é editado)
        if applicant.email:
            try:
                existing_applicant = Applicant.objects.exclude(id=applicant.id).get(email=applicant.email)
                return JsonResponse({'status': 'error', 'message': 'Email already exists in the database'})
            except ObjectDoesNotExist:
                pass
        
        #Caso o telefone já exista na base de dados é enviada uma mensagem de erro para o frontend ( e o aplicante não é editado)
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
        # Para cada aplicante é criado um dicionario com os dados do aplicante e adicionado à lista de aplicantes   
        for applicant in applicants:
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
                   
                }
            }
            applicant_list.append(applicant_data)
        return JsonResponse(applicant_list, safe=False)
    else:
        return JsonResponse({'status': 'error'})

@csrf_exempt
def list_roles(request):
    #Esta view serve para listar todas as roles existentes ( visto que pode haver roles sem aplicantes associados)
    if request.method == 'GET':
        roles = Role.active_objects.active()
        role_list = []

        for role in roles:
            role_data = {
                'id': role.id,
                'title': role.title,
                
            }
            role_list.append(role_data)

        return JsonResponse(role_list, safe=False)
    else:
        return JsonResponse({'status': 'error'})


#View para criar uma roles, esta role é criada sem aplicantes associados
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

#view para apagar uma role, com o soft delete apenas é necessario alterar o campo is_deleted para Truv
@csrf_exempt
def delete_role(request,role_id):
    if request.method == 'DELETE':
        role = Role.objects.get(id=role_id)
        role.is_deleted=True
        role.save()
        return JsonResponse({'status': 'success', 'message': 'Role deleted successfully'})