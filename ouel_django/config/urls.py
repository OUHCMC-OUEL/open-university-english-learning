from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from django.urls import path, re_path, include
from django.views.generic.base import RedirectView
from django.contrib.staticfiles.storage import staticfiles_storage
from config.admin import admin_site
from rest_framework import permissions
import debug_toolbar

schema_view = get_schema_view(
    openapi.Info(
        title="OUEL API",
        default_version='v0.1',
        description="Open University English Learning",
        contact=openapi.Contact(email="2351050164thanh@ou.edu.vn"),
        license=openapi.License(name="ouel@2026"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

app_list = {
    'gemini/': 'apps.ouel_gemini.urls',
    'oauth/': 'apps.ouel_oauth.urls',
    'quiz/': 'apps.ouel_quizapp.urls',
    'writing/': 'apps.ouel_writingapp.urls',
}

urlpatterns = [
    path(prefix, include(urls)) for prefix, urls in app_list.items()
]

urlpatterns += [
    path("admin/", admin_site.urls),
    path('o/', include('oauth2_provider.urls',
                       namespace='oauth2_provider')),
    path('__debug__/',include(debug_toolbar.urls)),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$',
            schema_view.without_ui(cache_timeout=0),
            name='schema-json'),
    re_path(r'^swagger/$',
            schema_view.with_ui('swagger', cache_timeout=0),
            name='schema-swagger-ui'),
    re_path(r'^redoc/$',
            schema_view.with_ui('redoc', cache_timeout=0),
            name='schema-redoc'),
    path('favicon.ico', RedirectView.as_view(url=staticfiles_storage.url('favicon.ico')))
]