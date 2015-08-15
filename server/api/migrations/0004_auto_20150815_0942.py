# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20150815_0655'),
    ]

    operations = [
        migrations.AddField(
            model_name='station',
            name='latitude',
            field=models.DecimalField(max_digits=10, default=-37.823903, decimal_places=6),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='station',
            name='longitude',
            field=models.DecimalField(max_digits=10, default=144.991286, decimal_places=6),
            preserve_default=False,
        ),
    ]
