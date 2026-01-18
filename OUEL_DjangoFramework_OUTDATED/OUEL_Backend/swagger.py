#Swagger guide: https://www.geeksforgeeks.org/python/swagger-integration-with-python-django/
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="OUEL API Swagger Manager",
        default_version='v1',
        description="OUEL_SWAGGER",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="2351050164thanh@ou.edu.vn"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)