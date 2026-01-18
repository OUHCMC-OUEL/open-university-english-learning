from django.contrib import admin
from .models import Prompt, OUELApp

class AppAdmin(admin.ModelAdmin):
    list_display = ['id','app_name','description', 'created_date']
    search_fields = ['app_name']
    list_filter = ['id', 'app_name', 'created_date']

class PromptAdmin(admin.ModelAdmin):
    list_display = ['id', 'prompt_name', 'prompt_role', 'created_date']
    search_fields = ['prompt_name']
    list_filter = ['id', 'prompt_name', 'created_date']

class MyAdminSite(admin.AdminSite):
    site_header = 'GeminiAPI Online Management'


admin_site = MyAdminSite(name='GeminiAPI Online Management')

admin.site.register(Prompt, PromptAdmin)
admin.site.register(OUELApp, AppAdmin)