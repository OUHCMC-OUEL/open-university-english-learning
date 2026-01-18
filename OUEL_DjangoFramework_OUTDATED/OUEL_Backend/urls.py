from django.contrib import admin
from django.urls import include, path, re_path
from OUEL_Backend.swagger import schema_view
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', include("GeminiAPI.urls")),
    path('admin/', admin.site.urls),
    path('reading/', include('QuizApp.urls')),
    re_path('swagger/', schema_view.with_ui('swagger',
                                         cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$',
            schema_view.without_ui(cache_timeout=0),
            name='schema-json'),
    re_path("ckeditor5/", include('django_ckeditor_5.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)