from django.db.models import QuerySet, Count
from .models import User, UserFollow

def get_followers(user: User) -> QuerySet[User]:
    return User.objects.filter(
        following__followed=user
    ).order_by('-following__created_at')

def get_following(user: User) -> QuerySet[User]:
    return User.objects.filter(
        followers__follower=user
    ).order_by('-followers__created_at')

def get_follow_stats(user: User) -> dict:
    return {
        "followers_count": user.followers.count(),
        "following_count": user.following.count()
    }

def check_is_following(user_source: User, user_target: User) -> bool:
     return UserFollow.objects.filter(
        follower=user_source,
        followed=user_target
    ).exists()