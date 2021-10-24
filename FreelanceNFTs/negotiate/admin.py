from django.contrib import admin

# Register your models here.
from .models import Seller, Work

admin.site.register(Seller)
admin.site.register(Work)