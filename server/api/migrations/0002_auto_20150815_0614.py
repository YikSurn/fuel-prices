# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='station',
            name='price',
            field=models.DecimalField(decimal_places=1, null=True, max_digits=4, blank=True),
        ),
    ]
