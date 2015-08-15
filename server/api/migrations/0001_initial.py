# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Fuel',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True, serialize=False)),
                ('name', models.CharField(max_length=30)),
            ],
            options={
                'db_table': 'fuel',
            },
        ),
        migrations.CreateModel(
            name='Station',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('address', models.CharField(max_length=100, unique=True)),
                ('price', models.DecimalField(max_digits=3, null=True, decimal_places=1, blank=True)),
                ('suburbs', models.CharField(max_length=50)),
                ('postcode', models.CharField(max_length=4)),
            ],
            options={
                'db_table': 'station',
            },
        ),
        migrations.CreateModel(
            name='StationFuel',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True, serialize=False)),
                ('fuel', models.ForeignKey(to='api.Fuel')),
                ('station', models.ForeignKey(to='api.Station')),
            ],
            options={
                'db_table': 'station_fuel',
            },
        ),
    ]
