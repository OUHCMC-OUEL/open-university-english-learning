import os
import sys
import subprocess
from django.contrib import admin
from django.urls import path
from django.shortcuts import render
from django.contrib import messages
from django.conf import settings
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
    
    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('up-to-date/', self.admin_view(self.system_update_view), name='system-update'),
        ]
        return custom_urls + urls

    def system_update_view(self, request):
        context = dict(
            self.each_context(request),
            title="Cập nhật hệ thống",
            logs=""
        )

        if request.method == 'POST':
            logs = []
            repo_dir = settings.BASE_DIR
            python_bin = sys.executable 

            try:

                current_commit_cmd = subprocess.run(['git', 'rev-parse', 'HEAD'], cwd=repo_dir, capture_output=True, text=True)
                current_commit = current_commit_cmd.stdout.strip()
                logs.append(f"0. CURRENT COMMIT: {current_commit}")


                logs.append("\n1. GIT PULL ")
                git_pull = subprocess.run(['git', 'pull', 'origin', 'main'], cwd=repo_dir, capture_output=True, text=True)
                logs.append(git_pull.stdout + "\n" + git_pull.stderr)

                if git_pull.returncode != 0:
                    messages.error(request, "Git pull thất bại (Có thể do Conflict). Cập nhật bị hủy.")
                    context['logs'] = "\n".join(logs)
                    return render(request, "admin/update_system.html", context)


                logs.append("2. MIGRATE DATABASE")
                migrate = subprocess.run([python_bin, 'manage.py', 'migrate'], cwd=repo_dir, capture_output=True, text=True)
                logs.append(migrate.stdout + "\n" + migrate.stderr)


                if migrate.returncode != 0:
                    logs.append(f"\n[!] PHÁT HIỆN LỖI MIGRATE. ĐANG ROLLBACK VỀ: {current_commit}...")
                    subprocess.run(['git', 'reset', '--hard', current_commit], cwd=repo_dir)
                    messages.error(request, "Migrate thất bại. Đã khôi phục (Rollback) mã nguồn về phiên bản cũ.")
                    context['logs'] = "\n".join(logs)
                    return render(request, "admin/update_system.html", context)


                logs.append("3. COLLECTSTATIC ")
                static = subprocess.run([python_bin, 'manage.py', 'collectstatic', '--noinput'], cwd=repo_dir, capture_output=True, text=True)
                logs.append(static.stdout + "\n" + static.stderr)


                logs.append("4. RELOAD SERVER ")
                username = os.environ.get('USER')
                if not username:
                    try:
                        parts = os.getcwd().replace('\\', '/').split('/')
                        username = parts[2] if len(parts) > 2 else 'local_dev'
                    except Exception:
                        username = 'local_dev'
                domain = os.environ.get('PYTHONANYWHERE_DOMAIN', 'pythonanywhere.com').replace('.', '_')
                wsgi_path = f"/var/www/{username}_{domain}_wsgi.py"
                
                if os.path.exists(wsgi_path):
                    os.utime(wsgi_path, None)
                    logs.append(f"Successfully touched {wsgi_path} to reload server.")
                else:
                    logs.append(f"WARNING: WSGI file not found at {wsgi_path}.")

                messages.success(request, "Hệ thống đã được cập nhật thành công!")

            except Exception as e:
                logs.append(f"\nLỗi nghiêm trọng (Exception): {str(e)}")
                messages.error(request, "Có lỗi nghiêm trọng xảy ra. Đã dừng tiến trình.")

            context['logs'] = "\n".join(logs)

        return render(request, "admin/update_system.html", context)

admin_site = OUELAdminSite(name='OUEL')

admin_site.register(Group, GroupAdmin)
admin_site.register(Application, OUELApplicationAdmin)
admin_site.register(AccessToken, AccessTokenAdmin)
admin_site.register(RefreshToken, RefreshTokenAdmin)
admin_site.register(IDToken, IDTokenAdmin)