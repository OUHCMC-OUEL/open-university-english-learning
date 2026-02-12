from django.db import migrations
from django.contrib.auth.hashers import make_password
from apps.ouel_oauth.models import RoleEnum

def create_superadmin(apps, schema_editor):
    user = apps.get_model("ouel_oauth", "User")

    if not user.objects.filter(username="admin").exists():
        user.objects.create(
            username="admin",
            email="admin@example.com",
            password=make_password("123"),
            is_superuser=True,
            is_staff=True,
            is_active=True,
            role=RoleEnum.ADMIN
        )


def remove_superadmin(apps, schema_editor):
    user = apps.get_model("ouel_oauth", "User")
    user.objects.filter(username="admin").delete()


class Migration(migrations.Migration):
    dependencies = [
        ("ouel_oauth", "0004_instructorprofile_alter_loginhistory_options_and_more"),
    ]

    operations = [
        migrations.RunPython(create_superadmin, reverse_code=remove_superadmin),
    ]
