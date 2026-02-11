import pytest
from django.db.utils import IntegrityError
from model_bakery import baker
from apps.ouel_gemini.models import AIModel, Prompt, PromptLog, Model, Provider

pytestmark = pytest.mark.django_db

<<<<<<< HEAD

=======
>>>>>>> e644c4a50a726e74720f3844f5a30c79a5583100
class TestAIModel:
    def test_ai_model_creation(self):
        ai_model = baker.make(AIModel, name=Model.version2_5)

        assert ai_model.name == Model.version2_5
        assert ai_model.provider == Provider.GEMINI
<<<<<<< HEAD
        assert ai_model.active is True
        assert ai_model.created_date is not None
=======
        assert ai_model.active is True  
        assert ai_model.created_date is not None 
>>>>>>> e644c4a50a726e74720f3844f5a30c79a5583100
        assert str(ai_model) == Model.version2_5

    def test_ai_model_str_method(self):
        ai_model = baker.make(AIModel, name=Model.version3)
        assert str(ai_model) == Model.version3

<<<<<<< HEAD

=======
>>>>>>> e644c4a50a726e74720f3844f5a30c79a5583100
class TestPrompt:
    def test_prompt_creation(self):
        prompt = baker.make(Prompt, name="Translate English")

        assert prompt.name == "Translate English"
        assert prompt.version == 1
        assert prompt.settings == {}
        assert isinstance(prompt.ai_model, AIModel)
        assert str(prompt) == "Translate English"

    def test_prompt_unique_constraint(self):
        baker.make(Prompt, name="Review Code", version=1)

        with pytest.raises(IntegrityError):
            baker.make(Prompt, name="Review Code", version=1)

    def test_prompt_version_increment(self):
        baker.make(Prompt, name="Review Code", version=1)

        try:
            baker.make(Prompt, name="Review Code", version=2)
        except IntegrityError:
            pytest.fail("Should allow different versions for the same name")

    def test_ordering(self):
        p1 = baker.make(Prompt, version=1)
        p2 = baker.make(Prompt, version=5)
        p3 = baker.make(Prompt, version=2)

        prompts = Prompt.objects.filter(id__in=[p1.id, p2.id, p3.id])
<<<<<<< HEAD

=======
        
>>>>>>> e644c4a50a726e74720f3844f5a30c79a5583100
        assert prompts[0] == p2
        assert prompts[1] == p3
        assert prompts[2] == p1

<<<<<<< HEAD

=======
>>>>>>> e644c4a50a726e74720f3844f5a30c79a5583100
class TestPromptLog:
    def test_prompt_log_creation(self):
        log = baker.make(PromptLog)

        assert isinstance(log.prompt, Prompt)
        assert log.input is not None
        assert log.final_context is not None
        assert log.response is not None
        assert log.token == 0
        assert log.latency == 0
        assert log.status == 200
        assert log.created_date is not None

    def test_cascade_delete(self):
        prompt = baker.make(Prompt)
        log = baker.make(PromptLog, prompt=prompt)

        assert PromptLog.objects.count() == 1

        prompt.delete()

<<<<<<< HEAD
        assert PromptLog.objects.count() == 0
=======
        assert PromptLog.objects.count() == 0
>>>>>>> e644c4a50a726e74720f3844f5a30c79a5583100
