from django.shortcuts import render, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import Applicant

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


      
        applicant = Applicant(name=name, email=email, phone_number=phone, role_id=role_id)
        applicant.save()

        return JsonResponse({'status': 'success', 'message': 'Applicant added successfully'})

    return JsonResponse({'status': 'error'})


#View para dar delete a um aplicante ( dado um id)
def delete_applicant(request,applicant_id):
    applicant = Applicant.objects.get(id=applicant_id)
    applicant.delete()
    return JsonResponse({'status': 'success', 'message': 'Applicant deleted successfully'})

def edit_applicant(request,applicant_id):
    applicant = get_object_or_404(Applicant, id=applicant_id)
    if request.method == 'POST':
        applicant.name = request.POST.get('name')
        applicant.email = request.POST.get('email')
        applicant.phone = request.POST.get('phone')
        applicant.age = request.POST.get('age')
        applicant.cv = request.FILES.get('cv')
        applicant.role_id = request.POST.get('role_id')
        applicant.save()
        return JsonResponse({'status': 'success', 'message': 'Applicant edited successfully'})
    else:
        return JsonResponse({'status': 'error'})




#View para listar todos os aplicantes
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