import pytest
from django.core.exceptions import ValidationError
from django.db.utils import IntegrityError
from model_bakery import baker
from apps.ouel_oauth.models import (
    User, Hobby, StudentProfile, InstructorProfile,
    LoginHistory, UserFollow, LevelType, RoleEnum
)

pytestmark = pytest.mark.django_db

class TestHobby:
    def test_hobby_str_method(self):
        hobby = baker.make(Hobby, name="Reading")
        assert str(hobby) == "Reading"

    def test_hobby_unique_name(self):
        baker.make(Hobby, name="Coding")
        with pytest.raises(IntegrityError):
            baker.make(Hobby, name="Coding")


class TestUser:
    def test_user_creation(self):
        user = baker.make(User, username="testuser", email="test@ou.edu.vn")
        assert user.username == "testuser"
        assert user.email == "test@ou.edu.vn"
        assert user.role == RoleEnum.STUDENT

    def test_user_roles_properties(self):
        student = baker.make(User, role=RoleEnum.STUDENT)
        assert student.is_student is True
        assert student.is_instructor is False

        instructor = baker.make(User, role=RoleEnum.INSTRUCTOR)
        assert instructor.is_instructor is True
        assert instructor.is_student is False


class TestUserFollow:
    def test_follow_creation(self):
        u1 = baker.make(User, username="u1")
        u2 = baker.make(User, username="u2")

        follow = baker.make(UserFollow, follower=u1, followed=u2)

        assert str(follow) == f"{u1.id} follow {u2.id}"
        assert u1.following.count() == 1
        assert u2.followers.count() == 1

    def test_prevent_self_follow(self):
        u1 = baker.make(User, username="u1")

        with pytest.raises(ValidationError) as excinfo:
            UserFollow.objects.create(follower=u1, followed=u1)

        assert "Bạn không thể tự theo dõi chính mình" in str(excinfo.value)

    def test_unique_follow_constraint(self):
        u1 = baker.make(User)
        u2 = baker.make(User)

        UserFollow.objects.create(follower=u1, followed=u2)

        with pytest.raises(IntegrityError):
            UserFollow.objects.create(follower=u1, followed=u2)


class TestStudentProfile:
    def test_student_profile_creation_defaults(self):
        profile = baker.make(StudentProfile)

        assert isinstance(profile.user, User)
        assert profile.pk == profile.user.pk
        assert profile.proficiency == LevelType.A1
        assert profile.biography == ""
        assert profile.about == ""

    def test_profile_str_method(self):
        user = baker.make(User, first_name="Thanh", last_name="Van")
        profile = baker.make(StudentProfile, user=user)

        assert str(profile) == "Profile: Van Thanh"

    def test_profile_interests_relationship(self):
        profile = baker.make(StudentProfile)
        h1 = baker.make(Hobby, name="Music")
        h2 = baker.make(Hobby, name="Games")

        profile.interests.add(h1, h2)

        assert profile.interests.count() == 2
        assert h1 in profile.interests.all()

    def test_cascade_delete(self):
        profile = baker.make(StudentProfile)
        user_id = profile.user.id

        assert StudentProfile.objects.filter(user_id=user_id).exists()

        profile.user.delete()

        assert not StudentProfile.objects.filter(user_id=user_id).exists()


class TestInstructorProfile:
    def test_instructor_profile_creation(self):
        profile = baker.make(InstructorProfile, title="Senior Lecturer")

        assert profile.title == "Senior Lecturer"
        assert hasattr(profile, 'biography')
        assert hasattr(profile, 'created_date')


class TestLoginHistory:
    def test_login_history_creation(self):
        history = baker.make(LoginHistory, user__username="student1")

        assert history.user.username == "student1"
        assert history.login_date is not None
        assert str(history) == f"student1 - {history.login_date}"

    def test_meta_db_table(self):
        assert LoginHistory._meta.db_table == "ouel_oauth_login_history"
        assert LoginHistory._meta.verbose_name == "Login log"