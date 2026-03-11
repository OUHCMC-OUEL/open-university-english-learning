from rest_framework.permissions import IsAuthenticated

class IsEnrollmentOwner(IsAuthenticated):
    message = "Chỉ có sinh viên đăng ký mới được xem thông tin"

    def has_object_permission(self, request, view, enrollment):
        return super().has_permission(request, view) and enrollment.user == request.user