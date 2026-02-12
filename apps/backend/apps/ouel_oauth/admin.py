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
from .models import User, StudentProfile, InstructorProfile, LoginHistory, Hobby, UserFollow

class StudentProfileInline(admin.StackedInline):
    model = StudentProfile
    can_delete = False
    verbose_name_plural = 'Student Profile'
    fk_name = 'user'


class InstructorProfileInline(admin.StackedInline):
    model = InstructorProfile
    can_delete = False
    verbose_name_plural = 'Instructor Profile'
    fk_name = 'user'

class MyUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'role', 'social_provider', 'is_staff')
    list_filter = ('role', 'social_provider', 'is_staff', 'is_active')
    fieldsets = UserAdmin.fieldsets + (
        ('Extra Info', {'fields': ('avatar', 'role', 'social_provider')}),
    )

    def get_inlines(self, request, obj=None):
        if not obj:
            return []
        if obj.role == 'student':
            return [StudentProfileInline]
        elif obj.role == 'instructor':
            return [InstructorProfileInline]
        return []


class MyLoginHistoryAdmin(admin.ModelAdmin):
    list_select_related = ["user"]
    list_display = ["user__username", "login_date"]
    search_fields = ["user__username"]

class UserFollowAdmin(admin.ModelAdmin):
    list_display = ('follower', 'followed', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('follower__username', 'follower__email', 'followed__username', 'followed__email')
    list_select_related = ('follower', 'followed')

    def has_change_permission(self, request, obj=None):
        return False

admin_site.register(User, MyUserAdmin)
admin_site.register(EmailAddress, EmailAddressAdmin)
admin_site.register(SocialApp, SocialAppAdmin)
admin_site.register(SocialAccount, SocialAccountAdmin)
admin_site.register(SocialToken, SocialTokenAdmin)
admin_site.register(LoginHistory, MyLoginHistoryAdmin)
admin_site.register(Site)
admin_site.register(Hobby)
admin_site.register(UserFollow, UserFollowAdmin)
