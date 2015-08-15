from api.models import *
from django.forms import widgets
from rest_framework import serializers

class StationFuelSerializer(serializers.HyperlinkedModelSerializer):
    name = serializers.ReadOnlyField(source='fuel.name')
    class Meta:
        model = StationFuel
        fields = ('name',)

class Station(serializers.ModelSerializer):
    fuels_offer = StationFuelSerializer(source='stationfuel_set', many=True)
    class Meta:
        model = Station
        fields = ('name', 'address', 'suburbs', 'price', 'postcode', 'fuels_offer')


