import pytest
import json
from unittest.mock import patch, MagicMock
from django.conf import settings
from model_bakery import baker
from rest_framework.exceptions import APIException
from apps.ouel_gemini.services import GeminiClientWrapper, clean_parse_json, run_prompt_flow, NoKeysAvailable
from apps.ouel_gemini.models import Prompt, AIModel

pytestmark = pytest.mark.django_db

class TestGeminiClientWrapper:
    def test_get_api_keys_from_list(self, settings):
        settings.GOOGLE_API_KEYS = ["KEY1", "KEY2"]
        keys = GeminiClientWrapper.get_api_keys()
        assert keys == ["KEY1", "KEY2"]

    def test_get_api_keys_single(self):
        settings.GOOGLE_API_KEYS = []
        settings.GOOGLE_API_KEY = "SINGLE_KEY"

        keys = GeminiClientWrapper.get_api_keys()
        assert keys == ["SINGLE_KEY"]

    def test_get_api_keys_missing(self):
        settings.GOOGLE_API_KEYS = []
        settings.GOOGLE_API_KEY = None

        with pytest.raises(ValueError, match="GOOGLE_API_KEYS chưa được cấu hình"):
            GeminiClientWrapper.get_api_keys()

    @patch("apps.ouel_gemini.services.genai.Client")
    def test_generate_content_success(self, mock_client_cls):
        mock_instance = mock_client_cls.return_value
        mock_response = MagicMock()
        mock_response.text = '{"result": "ok"}'
        mock_instance.models.generate_content.return_value = mock_response
        settings.GOOGLE_API_KEYS=["VALID_KEY"]

        response = GeminiClientWrapper.generate_content(
            model_name="gemini-pro", 
            contents="Hello"
        )

        assert response == mock_response
        mock_client_cls.assert_called_with(api_key="VALID_KEY")

    @patch("apps.ouel_gemini.services.genai.Client")
    def test_generate_content_rotate_keys_quota_error(self, mock_client_cls):
        mock_instance = mock_client_cls.return_value
 
        error_429 = Exception("429 Resource Exhausted")
        success_response = MagicMock()
        success_response.text = "Success"
   
        mock_instance.models.generate_content.side_effect = [error_429, success_response]
        settings.GOOGLE_API_KEYS = ["BAD_KEY", "GOOD_KEY"]

        response = GeminiClientWrapper.generate_content("model", "content")

        assert response == success_response
        assert mock_client_cls.call_count == 2

    @patch("apps.ouel_gemini.services.genai.Client")
    def test_generate_content_all_keys_failed(self, mock_client_cls):
        mock_instance = mock_client_cls.return_value
        mock_instance.models.generate_content.side_effect = Exception("403 Permission Denied")
        settings.GOOGLE_API_KEYS = ["KEY1", "KEY2"]

        with pytest.raises(NoKeysAvailable):
            GeminiClientWrapper.generate_content("model", "content")


class TestCleanParseJson:
    def test_clean_json_path(self):
        raw = '{"answer": "A"}'
        assert clean_parse_json(raw) == {"answer": "A"}

    def test_clean_json_with_markdown(self):
        raw = '```json\n{"answer": "B"}\n```'
        assert clean_parse_json(raw) == {"answer": "B"}

    def test_clean_json_invalid(self):
        raw = "I am not JSON"
        with pytest.raises(ValueError, match="AI trả về sai định dạng"):
            clean_parse_json(raw)

class TestRunPromptFlow:
    @pytest.fixture
    def setup_data(self):
        ai_model = baker.make(AIModel, name="gemini-2.5-flash")
        prompt = baker.make(Prompt, ai_model=ai_model, instruction="Translate", settings={"temperature": 0.7})
        return prompt

    @patch("apps.ouel_gemini.services.PromptLogManagement.create_prompt")
    @patch("apps.ouel_gemini.services.GeminiClientWrapper.generate_content")
    def test_flow_path(self, mock_generate, mock_create_log, setup_data):
        mock_response = MagicMock()
        mock_response.text = '{"translated": "Xin chào"}'
        mock_response.usage_metadata.total_token_count = 100
        mock_generate.return_value = mock_response
        result = run_prompt_flow(user_input="Hello", prompt=setup_data)
        assert result == {"translated": "Xin chào"}
  
        mock_generate.assert_called_once()
        args, kwargs = mock_generate.call_args
        assert kwargs['temperature'] == 0.7 
        assert kwargs['model_name'] == "gemini-2.5-flash"

        mock_create_log.assert_called_once()
        log_data = mock_create_log.call_args[0][0] 
        assert log_data['status'] == 200
        assert log_data['token'] == 100
        assert log_data['response'] == '{"translated": "Xin chào"}'

    @patch("apps.ouel_gemini.services.PromptLogManagement.create_prompt")
    @patch("apps.ouel_gemini.services.GeminiClientWrapper.generate_content")
    def test_flow_api_exception(self, mock_generate, mock_create_log, setup_data):
        mock_generate.side_effect = NoKeysAvailable()

        with pytest.raises(NoKeysAvailable):
            run_prompt_flow(user_input="Hello", prompt=setup_data)

        mock_create_log.assert_called_once()
        log_data = mock_create_log.call_args[0][0]
        assert log_data['status'] == 503
        assert log_data['token'] == 0

    @patch("apps.ouel_gemini.services.PromptLogManagement.create_prompt")
    @patch("apps.ouel_gemini.services.GeminiClientWrapper.generate_content")
    def test_flow_json_error(self, mock_generate, mock_create_log, setup_data):
        mock_response = MagicMock()
        mock_response.text = "Error Message from AI" 
        mock_response.usage_metadata.total_token_count = 50
        mock_generate.return_value = mock_response

        with pytest.raises(ValueError):
            run_prompt_flow("Hello", setup_data)

        log_data = mock_create_log.call_args[0][0]
        assert log_data['status'] == 500
        assert log_data['response'] == "Error Message from AI"