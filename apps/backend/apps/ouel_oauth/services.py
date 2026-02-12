from django.core.exceptions import ValidationError
from .managers import UserFollowManager
from .models import User, UserFollow

def follow_user(*, user_source: User, user_target: User) -> UserFollow:
    if user_source == user_target:
        raise ValidationError("Không thể tự follow chính mình.")

    return UserFollowManager.follow(user_source=user_source, user_target=user_target)

def unfollow_user(*, user_source: User, user_target: User) -> None:
    return UserFollowManager.unfollow(user_source=user_source, user_target=user_target)