# -*- coding: utf-8 -*-
# Generated by Django 1.11.20 on 2019-02-25 06:47
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('photos', '0002_auto_20190224_2119'),
    ]

    operations = [
        migrations.AlterField(
            model_name='camera',
            name='created_at',
            field=models.DateTimeField(blank=True, db_index=True),
        ),
        migrations.AlterField(
            model_name='lens',
            name='created_at',
            field=models.DateTimeField(blank=True, db_index=True),
        ),
        migrations.AlterField(
            model_name='photo',
            name='created_at',
            field=models.DateTimeField(blank=True, db_index=True),
        ),
        migrations.AlterField(
            model_name='photofile',
            name='created_at',
            field=models.DateTimeField(blank=True, db_index=True),
        ),
        migrations.AlterField(
            model_name='phototag',
            name='created_at',
            field=models.DateTimeField(blank=True, db_index=True),
        ),
        migrations.AlterField(
            model_name='tag',
            name='created_at',
            field=models.DateTimeField(blank=True, db_index=True),
        ),
        migrations.AlterField(
            model_name='task',
            name='created_at',
            field=models.DateTimeField(blank=True, db_index=True),
        ),
        migrations.AlterField(
            model_name='task',
            name='subject_id',
            field=models.UUIDField(db_index=True),
        ),
    ]