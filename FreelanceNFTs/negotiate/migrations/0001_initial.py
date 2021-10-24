# Generated by Django 3.2.8 on 2021-10-23 18:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Buyer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('wallet_address', models.CharField(max_length=100, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Seller',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('wallet_address', models.CharField(max_length=100, unique=True)),
                ('services', models.CharField(max_length=250, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Request',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=500)),
                ('response_description', models.CharField(max_length=500)),
                ('response_link', models.CharField(max_length=150)),
                ('buyer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='negotiate.buyer')),
                ('seller', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='negotiate.seller')),
            ],
        ),
        migrations.CreateModel(
            name='Negotiation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('initial_agreement_price', models.FloatField(default=None, null=True)),
                ('agree', models.BooleanField(default=False)),
                ('request', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='negotiate.request')),
            ],
        ),
    ]
