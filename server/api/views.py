from django.shortcuts import render

import django_filters
# import rest_framework_filters as filters

# import rest framework libraries 
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse
from rest_framework import status, renderers, generics, permissions
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.decorators import detail_route

# import models and their respective serializer
from api.models import *
from api.serializer import StationSerializer, FuelSerializer

class StationFilter(django_filters.FilterSet):
    """Declare filter field"""
    fuel = django_filters.CharFilter(name="stationfuel__fuel__name")
    class Meta:
        model = Station
        fields = ['fuel']

class StationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Station.objects.all()
    serializer_class = StationSerializer
    filter_class = StationFilter

class FuelViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Fuel.objects.all()
    serializer_class = FuelSerializer
