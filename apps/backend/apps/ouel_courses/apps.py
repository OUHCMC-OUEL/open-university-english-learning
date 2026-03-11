from django.apps import AppConfig
class OeulCoursesConfig(AppConfig):
    name = "apps.ouel_courses"
    default_auto_field = 'django.db.models.BigAutoField'

    def ready(self):
        import apps.ouel_courses.signals