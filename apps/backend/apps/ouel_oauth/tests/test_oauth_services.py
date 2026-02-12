import pytest
from unittest.mock import patch
from django.core.exceptions import ValidationError
from model_bakery import baker
from apps.ouel_oauth.models import User
from apps.ouel_oauth import services

pytestmark = pytest.mark.django_db

class TestFollowServices:

    @patch("apps.ouel_oauth.services.UserFollowManager.follow")
    def test_follow_user_success(self, mock_manager_follow):
        source = baker.make(User)
        target = baker.make(User)

        expected_result = "MockUserFollowInstance"
        mock_manager_follow.return_value = expected_result

        result = services.follow_user(user_source=source, user_target=target)

        assert result == expected_result

        mock_manager_follow.assert_called_once_with(
            user_source=source,
            user_target=target
        )

    @patch("apps.ouel_oauth.services.UserFollowManager.follow")
    def test_follow_user_self_failure(self, mock_manager_follow):
        user = baker.make(User)

        with pytest.raises(ValidationError) as exc:
            services.follow_user(user_source=user, user_target=user)

        assert "Không thể tự follow chính mình" in str(exc.value)

        mock_manager_follow.assert_not_called()

    @patch("apps.ouel_oauth.services.UserFollowManager.unfollow")
    def test_unfollow_user_calls_manager(self, mock_manager_unfollow):
        source = baker.make(User)
        target = baker.make(User)

        services.unfollow_user(user_source=source, user_target=target)

        mock_manager_unfollow.assert_called_once_with(
            user_source=source,
            user_target=target
        )