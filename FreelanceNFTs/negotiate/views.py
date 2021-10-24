from json.encoder import JSONEncoder
from django.http.response import HttpResponseBadRequest
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from negotiate.models import Seller, Work


def index(request):
    if request.GET.get('test', None):
        return HttpResponse(f"Hello {request.GET['test']}")
    else:
        return HttpResponse("Hello, world. You're at the negotiate index.")

def getInfo(request):
    if request.method == 'POST':
        seller_address = request.POST.get('wallet_address', None)
    else:
        seller_address = request.GET.get('wallet_address', None)
    if not seller_address:
        return HttpResponseBadRequest("Pass in the seller address for query")
    if not Seller.objects.filter(pk=seller_address).exists():
        return JsonResponse({})
    seller = Seller.objects.get(pk=seller_address)
    previous_work = [work.url for work in Work.objects.filter(seller=seller)]
    return JsonResponse({
        'success' : True,
        'wallet_address' : seller.wallet_address,
        'services' : seller.services,
        'description' : seller.description,
        'work' : previous_work
    })

def setInfo(request):
    # 127.0.0.1:8000/seller/setInfo?address=dummy&services=icon_maker&description=Nothing
    if request.method == 'POST':
        wallet_address = request.POST.get('wallet_address', None)
        services = request.POST.get('services', None)
        description = request.POST.get('description', None)
    else:
        wallet_address = request.GET.get('wallet_address', None)
        services = request.GET.get('services', None)
        description = request.GET.get('description', None)

    if not (wallet_address and services and description):
        return HttpResponseBadRequest("Pass in the seller address, services, and description for update")
    
    if Seller.objects.filter(pk=wallet_address).exists():
        seller = Seller.objects.get(pk=wallet_address)
        seller.wallet_address = wallet_address
        seller.services = services
        seller.description = description
    else:
        seller = Seller(wallet_address = wallet_address, services = services, description = description)
    
    seller.save()
    return JsonResponse({'success' : True})

def registerWork(request):
    if request.method == 'POST':
        seller_address = request.POST.get('wallet_address', None)
        url = request.POST.get('url', None)
    else:
        seller_address = request.GET.get('wallet_address', None)
        url = request.GET.get('url', None)
    if not (seller_address and url):
        return HttpResponseBadRequest("Pass in the seller address and url for registering work")
    if not Seller.objects.filter(pk=seller_address).exists():
        return HttpResponseBadRequest("Seller is not registered yet!")
    seller = Seller.objects.get(pk=seller_address)
    work = Work(seller = seller, url = url)
    work.save()
    return JsonResponse({'success' : True})

def searchForSellers(request):

    if request.method == 'POST':
        term = request.POST.get('query', None)
    else:
        term = request.GET.get('query', None)

    allSellers = Seller.objects.all()
    
    res = []    
    for seller in allSellers:
        if seller.services and term.lower().strip() in seller.services.lower().strip():
            previous_work = [work.url for work in Work.objects.filter(seller=seller)]
            res.append({
                'wallet_address' : seller.wallet_address,
                'services' : seller.services,
                'description' : seller.description,
                'work' : previous_work
            })
    return JsonResponse({'success' : True,
                        'result' : res})