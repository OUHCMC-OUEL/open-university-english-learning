from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from config.admin import admin_site
from .models import User

class MyUserAdmin(UserAdmin):
    fieldsets = [*UserAdmin.fieldsets, ('Avatar', {'fields': ('avatar',)})]

admin_site.register(User,MyUserAdmin)
