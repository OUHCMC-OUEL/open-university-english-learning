from django.apps import AppConfig

class OuelOauthConfig(AppConfig):
    name = 'apps.ouel_oauth'

    def ready(self):
        import apps.ouel_oauth.signals
