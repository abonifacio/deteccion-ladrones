# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Foto(models.Model):
    db_table = 'server_foto'
    dir= models.CharField(max_length=200)

