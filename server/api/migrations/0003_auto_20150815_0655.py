# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20150815_0614'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='station',
            name='price',
        ),
        migrations.AddField(
            model_name='fuel',
            name='price',
            field=models.DecimalField(max_digits=4, decimal_places=1, default=128.5),
            preserve_default=False,
        ),
    ]
