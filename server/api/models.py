from django.db import models

# Create your models here.
class Station(models.Model):
    """Petrol station details"""
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=100, unique=True)
    price = models.DecimalField(max_digits=3, decimal_places=1, blank=True, null=True)
    suburbs = models.CharField(max_length=50)
    postcode = models.CharField(max_length=4)

    class Meta:
        db_table = 'station'

class Fuel(models.Model):
    """All types of fuels available for cars"""
    name = models.CharField(max_length=30)

    class Meta:
        db_table = 'fuel'

class StationFuel(models.Model):
    """Associative entity between station and fuel"""
    station = models.ForeignKey(Station)
    fuel = models.ForeignKey(Fuel)

    class Meta:
        db_table = 'station_fuel'


