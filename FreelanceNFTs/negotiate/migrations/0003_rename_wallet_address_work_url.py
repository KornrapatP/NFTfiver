# Generated by Django 3.2.8 on 2021-10-24 00:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('negotiate', '0002_auto_20211023_2346'),
    ]

    operations = [
        migrations.RenameField(
            model_name='work',
            old_name='wallet_address',
            new_name='url',
        ),
    ]
