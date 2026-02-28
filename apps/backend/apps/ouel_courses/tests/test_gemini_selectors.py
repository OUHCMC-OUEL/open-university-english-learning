import pytest
from model_bakery import baker
from apps.ouel_gemini.models import Prompt
from apps.ouel_gemini.selectors import get_active_prompt

pytestmark = pytest.mark.django_db


class TestGetActivePrompt:
    def test_get_latest_active_version(self):
        name = "Translation"
        baker.make(Prompt, name=name, version=1, active=True)
        baker.make(Prompt, name=name, version=2, active=True)
        p3 = baker.make(Prompt, name=name, version=3, active=True)

        result = get_active_prompt(name)

        assert result == p3
        assert result.version == 3

    def test_ignore_inactive_versions(self):
        name = "Grammar Check"
        p1 = baker.make(Prompt, name=name, version=1, active=True)
        baker.make(Prompt, name=name, version=2, active=False)

        result = get_active_prompt(name)

        assert result == p1
        assert result.version == 1

    def test_prompt_not_found_wrong_name(self):
        with pytest.raises(ValueError, match="Không tìm thấy Prompt phù hợp"):
            get_active_prompt("NonExistentPrompt")

    def test_prompt_not_found_all_inactive(self):
        name = "InactiveFeature"
        baker.make(Prompt, name=name, version=1, active=False)

        with pytest.raises(
            ValueError, match=f"Không tìm thấy Prompt phù hợp cho model: {name}"
        ):
            get_active_prompt(name)
