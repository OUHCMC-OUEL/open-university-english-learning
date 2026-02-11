import pytest
from django.db.utils import IntegrityError
from model_bakery import baker
from apps.ouel_oauth.models import User, Hobby, Profile, LoginHistory, LevelType

pytestmark = pytest.mark.django_db

<<<<<<< HEAD

=======
>>>>>>> e644c4a50a726e74720f3844f5a30c79a5583100
class TestHobby:
    def test_hobby_str_method(self):
        hobby = baker.make(Hobby, name="Reading")
        assert str(hobby) == "Reading"

    def test_hobby_unique_name(self):
        baker.make(Hobby, name="Coding")
<<<<<<< HEAD

        with pytest.raises(IntegrityError):
            baker.make(Hobby, name="Coding")


class TestUser:
    def test_user_creation(self):
        user = baker.make(User, username="testuser", email="test@ou.edu.vn")

        assert user.username == "testuser"
        assert user.email == "test@ou.edu.vn"
        assert user.check_password("raw_password") is False

=======
        
        with pytest.raises(IntegrityError):
            baker.make(Hobby, name="Coding")

class TestUser:
    def test_user_creation(self):
        user = baker.make(User, username="testuser", email="test@ou.edu.vn")
        
        assert user.username == "testuser"
        assert user.email == "test@ou.edu.vn"
        assert user.check_password("raw_password") is False 
>>>>>>> e644c4a50a726e74720f3844f5a30c79a5583100

class TestProfile:
    def test_profile_creation_defaults(self):
        profile = baker.make(Profile)

        assert isinstance(profile.user, User)
<<<<<<< HEAD
        assert profile.pk == profile.user.pk
        assert profile.level == LevelType.A1
        assert profile.biography == ""
        assert profile.about == ""

    def test_profile_str_method(self):
        profile = baker.make(Profile, user__first_name="Thanh", user__last_name="Van")

=======
        assert profile.pk == profile.user.pk  
        assert profile.level == LevelType.A1  
        assert profile.biography == "" 
        assert profile.about == ""

    def test_profile_str_method(self):
        profile = baker.make(Profile, 
                             user__first_name="Thanh", 
                             user__last_name="Van")
        
>>>>>>> e644c4a50a726e74720f3844f5a30c79a5583100
        assert str(profile) == "Hồ sơ của: Van Thanh"

    def test_profile_hobbies_relationship(self):
        profile = baker.make(Profile)
        h1 = baker.make(Hobby, name="Music")
        h2 = baker.make(Hobby, name="Games")

        profile.hobbies.add(h1, h2)

        assert profile.hobbies.count() == 2
        assert h1 in profile.hobbies.all()

    def test_cascade_delete(self):
        profile = baker.make(Profile)
        user_id = profile.user.id

        assert Profile.objects.filter(user_id=user_id).exists()

        profile.user.delete()
<<<<<<< HEAD

        assert not Profile.objects.filter(user_id=user_id).exists()


class TestLoginHistory:
    def test_login_history_creation(self):
        history = baker.make(LoginHistory, user__username="student1")

=======
        
        assert not Profile.objects.filter(user_id=user_id).exists()

class TestLoginHistory:
    def test_login_history_creation(self):
        history = baker.make(LoginHistory, user__username="student1")
        
>>>>>>> e644c4a50a726e74720f3844f5a30c79a5583100
        assert history.user.username == "student1"
        assert history.login_date is not None
        assert str(history) == f"student1 - {history.login_date}"

    def test_meta_db_table(self):
        assert LoginHistory._meta.db_table == "ouel_oauth_login_history"
<<<<<<< HEAD
        assert LoginHistory._meta.verbose_name == "Login historie"
=======
        assert LoginHistory._meta.verbose_name == "Login historie"
>>>>>>> e644c4a50a726e74720f3844f5a30c79a5583100
