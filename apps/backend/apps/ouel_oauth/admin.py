from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from allauth.account.models import EmailAddress
from allauth.account.admin import EmailAddressAdmin
from allauth.socialaccount.models import SocialApp, SocialAccount, SocialToken
from allauth.socialaccount.admin import (
    SocialAppAdmin,
    SocialAccountAdmin,
    SocialTokenAdmin,
)
from config.admin import admin_site
from django.contrib.sites.models import Site
from .models import User, Profile, LoginHistory, Hobby


class ProfileInlinesAdmin(admin.StackedInline):
    model = Profile
    extra = 0


class MyUserAdmin(UserAdmin):
    fieldsets = [*UserAdmin.fieldsets, ("Avatar", {"fields": ("avatar",)})]
    inlines = (ProfileInlinesAdmin,)


class MyLoginHistoryAdmin(admin.ModelAdmin):
    list_select_related = ["user"]
    list_display = ["user__username", "login_date"]
    search_fields = ["user__username"]


admin_site.register(User, MyUserAdmin)
admin_site.register(EmailAddress, EmailAddressAdmin)
admin_site.register(SocialApp, SocialAppAdmin)
admin_site.register(SocialAccount, SocialAccountAdmin)
admin_site.register(SocialToken, SocialTokenAdmin)
admin_site.register(LoginHistory, MyLoginHistoryAdmin)
admin_site.register(Site)
admin_site.register(Hobby)
