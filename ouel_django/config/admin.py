from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import GroupAdmin
from oauth2_provider.models import Application, AccessToken, RefreshToken, IDToken
from oauth2_provider.admin import ApplicationAdmin, AccessTokenAdmin, RefreshTokenAdmin, IDTokenAdmin

class OUELApplicationAdmin(ApplicationAdmin):
    fields = ('name', 'user','client_id','hash_client_secret' ,'client_secret', 'client_type','authorization_grant_type', 'algorithm', 'redirect_uris','allowed_origins' ,'skip_authorization')

class OUELAdminSite(admin.AdminSite):
    site_header = "OUEL - Open University English Learning"
    site_title = "OUEL"

    apps_ordering = {
        "auth": 1,
        "oauth2_provider": 2,
        "ouel_writingapp": 3,
        "ouel_quizapp": 4,
    }

    models_ordering = {
        "Applications": 1,
        "Access tokens": 2,
        "Refresh tokens": 3,
        "Id tokens": 4,
    }

    def get_app_list(self, request, app_label=None):
        app_dict = self._build_app_dict(request, app_label)
        app_list = sorted(app_dict.values(), key=lambda x: self.apps_ordering.get(x['app_label'],10))

        for app in app_list:
            app['models'].sort(key=lambda x: self.models_ordering.get(x['name'], 99))

        return app_list

admin_site = OUELAdminSite(name='OUEL')
admin_site.register(Group, GroupAdmin)
admin_site.register(Application, OUELApplicationAdmin)
admin_site.register(AccessToken, AccessTokenAdmin)
admin_site.register(RefreshToken, RefreshTokenAdmin)
admin_site.register(IDToken, IDTokenAdmin)