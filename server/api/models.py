from django.db import models

# Create your models here.
class Station(models.Model):
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=100, unique=True)
    price = models.DecimalField(max_digits=3, decimal_places=1, blank=True, null=True)
    suburbs = models.CharField(max_length=50)
    postcode = models.CharField(max_length=4)

    class Meta:
        db_name = 'station'

class StationFuel(models.Model):
    station = models.ForeignKey(Station)
    fuel = models.ForeignKey(Fuel)

    class Meta:
        db_name = 'station_fuel'

class Fuel(models.Model):
    name = models.CharField(max_length=30)

    class Meta:
        db_name = 'fuel'

