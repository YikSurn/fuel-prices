from api.models import *
from django.forms import widgets
from rest_framework import serializers

class FuelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fuel
        fields = ('name', 'price')

class StationFuelSerializer(serializers.HyperlinkedModelSerializer):
    name = serializers.ReadOnlyField(source='fuel.name')
    price = serializers.ReadOnlyField(source='fuel.price')
    class Meta:
        model = StationFuel
        fields = ('name', 'price')

class StationSerializer(serializers.HyperlinkedModelSerializer):
    fuels_offer = StationFuelSerializer(source='stationfuel_set', many=True)
    latitude = serializers.ReadOnlyField()
    longitude = serializers.ReadOnlyField()
    class Meta:
        model = Station
        fields = ('name', 'street', 'suburb', 'postcode', 'address', 'latitude', 'longitude', 'brand', 'fuels_offer')