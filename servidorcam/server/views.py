# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from server.models import Foto
# Create your views here.
def hello(request):
    """Le manda a la vista las direcciones para renderizar las fotos"""
    fotos= Foto.objects.all()
    return render(request,'index.html',context={"fotos": fotos})
