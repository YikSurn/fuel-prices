# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20150815_2156'),
    ]

    operations = [
        migrations.AddField(
            model_name='station',
            name='brand',
            field=models.CharField(max_length=50, default='not specified'),
            preserve_default=False,
        ),
    ]
