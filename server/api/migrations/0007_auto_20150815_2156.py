# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_station_address'),
    ]

    operations = [
        migrations.RenameField(
            model_name='station',
            old_name='suburbs',
            new_name='suburb',
        ),
    ]
