import json
from django.contrib import admin
from config.admin import admin_site
from django.utils.safestring import mark_safe
from .models import AIModel, Prompt, PromptLog


class PromptInlineAdmin(admin.StackedInline):
    model = Prompt
    fk_name = "ai_model"
    extra = 0
    fields = ("name", "version", "active")
    show_change_link = True


class AIModelAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "provider", "created_date", "active"]
    list_filter = ["provider", "active"]
    search_fields = ["name", "provider"]
    fields = (
        "active",
        "name",
        "provider",
        "description",
    )
    inlines = (PromptInlineAdmin,)


class PromptAdmin(admin.ModelAdmin):
    list_select_related = ["ai_model"]
    list_display = [
        "id",
        "name",
        "version",
        "ai_model",
        "updated_date",
        "created_date",
        "active",
    ]
    list_filter = ["version", "active", "ai_model__provider"]
    search_fields = ["name"]
    readonly_fields = ("json_display",)
    fieldsets = (
        ("Thông tin Prompt", {"fields": ("active", "name", "version", "ai_model")}),
        (
            "Nội dung Prompt",
            {
                "fields": ("instruction", "context"),
                "classes": ("wide",),
            },
        ),
        (
            "Cấu hình cứng",
            {
                "fields": ("settings", "json_display"),
            },
        ),
    )

    def json_display(self, instance):
        response = json.dumps(instance.settings, indent=2)
        return mark_safe(f"<pre>{response}</pre>")


class PromptLogAdmin(admin.ModelAdmin):
    list_select_related = ["prompt", "prompt__ai_model"]
    list_display = ["id", "prompt_name", "latency", "token", "status", "created_date"]
    list_filter = ["prompt__name", "status", "created_date"]
    search_fields = ["prompt__name"]

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return True

    def prompt_name(self, log):
        if log.prompt.name:
            return log.prompt.name
        return f"Prompt thuộc provider: {log.prompt.provider}"


admin_site.register(AIModel, AIModelAdmin)
admin_site.register(Prompt, PromptAdmin)
admin_site.register(PromptLog, PromptLogAdmin)
