# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20150815_1039'),
    ]

    operations = [
        migrations.AddField(
            model_name='station',
            name='address',
            field=models.CharField(unique=True, max_length=200, default='not available'),
            preserve_default=False,
        ),
    ]
