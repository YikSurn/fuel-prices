# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_station_brand'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fuel',
            name='price',
            field=models.DecimalField(max_digits=4, null=True, decimal_places=1),
        ),
    ]
