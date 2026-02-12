from .models import StudentProfile, InstructorProfile, UserFollow, RoleEnum
from django.db import transaction

class ProfileManager:
    @staticmethod
    def create_student_profile(user=None):
        return StudentProfile.objects.get_or_create(user=user)

    @staticmethod
    def create_instructor_profile(user=None):
        return InstructorProfile.objects.get_or_create(user=user)

    @staticmethod
    def update_profile(user, profile_keys, **validated_data):
        profile_data = {}
        for field in profile_keys:
            if field in validated_data:
                profile_data[field] = validated_data.pop(field)

        if user.role == RoleEnum.STUDENT:
            interests = profile_data.pop("interests", None)
            profile, created = StudentProfile.objects.update_or_create(
                user=user, defaults=profile_data
            )

            if interests is not None:
                profile.interests.set(interests)
        else:
            profile, created = InstructorProfile.objects.update_or_create(
                user=user, defaults=profile_data
            )

        return profile

class UserFollowManager:
    @staticmethod
    @transaction.atomic
    def follow(user_source, user_target):
        follow_instance, created = UserFollow.objects.get_or_create(
            follower=user_source,
            followed=user_target
        )
        return follow_instance

    @staticmethod
    @transaction.atomic
    def unfollow(user_source, user_target):
        try:
            UserFollow.objects.filter(
                follower=user_source,
                followed=user_target
            ).delete()
        except Exception as e:
            return f"Lỗi unfollow: ${e}"


