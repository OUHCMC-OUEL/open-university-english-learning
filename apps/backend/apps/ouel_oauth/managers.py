from .models import Profile

class ProfileManager:
    @staticmethod
    def create_profile(user=None):
        return Profile.objects.get_or_create(user=user)

    @staticmethod
    def update_profile(user, profile_keys,**validated_data):
        profile_data = {}
        for field in profile_keys:
            if field in validated_data:
                profile_data[field] = validated_data.pop(field)

        hobbies = profile_data.pop('hobbies', None)
        profile, created = Profile.objects.update_or_create(
            user=user,
            defaults=profile_data
        )

        if hobbies is not None:
            profile.hobbies.set(hobbies)

        return profile
