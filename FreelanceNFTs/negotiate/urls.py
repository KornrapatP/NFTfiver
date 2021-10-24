from django.urls import path

from . import views

urlpatterns = [
    path('index', views.index, name='index'),
    path('getInfo',views.getInfo, name='getInfo'),
    path('setInfo',views.setInfo, name='setInfo'),
    path('registerWork',views.registerWork, name='registerWork'),
    path('searchForSellers',views.searchForSellers, name='searchForSellers'),
]