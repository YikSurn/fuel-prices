from django.db import models

# Create your models here.
class Station(models.Model):
    """Petrol station details"""
    name = models.CharField(max_length=50)
    street = models.CharField(max_length=100, unique=True)
    suburb = models.CharField(max_length=50)
    postcode = models.CharField(max_length=4)
    address = models.CharField(max_length=200, unique=True)
    latitude = models.DecimalField(max_digits=10, decimal_places=6)
    longitude = models.DecimalField(max_digits=10, decimal_places=6)
    brand = models.CharField(max_length=50)

    class Meta:
        db_table = 'station'

class Fuel(models.Model):
    """All types of fuels available for cars"""
    name = models.CharField(max_length=30)
    price = models.DecimalField(max_digits=4, decimal_places=1)

    class Meta:
        db_table = 'fuel'

class StationFuel(models.Model):
    """Associative entity between station and fuel"""
    station = models.ForeignKey(Station)
    fuel = models.ForeignKey(Fuel)

    class Meta:
        db_table = 'station_fuel'


