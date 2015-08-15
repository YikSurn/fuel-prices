# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20150815_0942'),
    ]

    operations = [
        migrations.RenameField(
            model_name='station',
            old_name='address',
            new_name='street',
        ),
    ]
