from django.db import models
from django.db.models.expressions import F


class Seller(models.Model):
    wallet_address = models.CharField(max_length=100, unique=True, null=False, primary_key=True)
    services = models.CharField(max_length=250, unique=False, null=True)
    description = models.CharField(max_length=500, unique=False, null=True)

    def __str__(self) -> str:
        return self.wallet_address + ' ' + (self.services if self.services != None else '') + ' ' + (self.description if self.description != None else '')

class Work(models.Model):
    seller = models.ForeignKey(Seller, on_delete=models.CASCADE)
    url = models.CharField(max_length=100, unique=True)

    def __str__(self) -> str:
        return str(self.seller) + ' ' + self.url


