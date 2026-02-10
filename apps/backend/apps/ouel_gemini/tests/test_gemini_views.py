import pytest
from rest_framework import status
from rest_framework.test import APIRequestFactory
from unittest.mock import patch, MagicMock
from apps.ouel_gemini.views import WritingAppView, ReadingAppView
from apps.ouel_gemini.serializers import GrammarInputSerializer, HighlightInputSerializer

class TestWritingAppView:
    @pytest.fixture
    def factory(self):
        return APIRequestFactory()

    @pytest.fixture
    def view(self):
        return WritingAppView.as_view({'post': 'correct_grammar'})

    @patch("apps.ouel_gemini.views.services.grammar_correction")
    @patch("apps.ouel_gemini.views.selectors.get_active_prompt")
    def test_correct_grammar_path(self, mock_selector, mock_service, factory, view):
        mock_selector.return_value = MagicMock(name="PromptObj")
        mock_service.return_value = {"corrected": "Hello World"}

        data = {"input": "Hillo Warld"}
        request = factory.post('/fake-url/grammar', data, format='json')

        response = view(request)

        assert response.status_code == status.HTTP_200_OK
        assert response.data == {"corrected": "Hello World"}
        
        mock_service.assert_called_once()
        assert mock_service.call_args[1]['user_input'] == "Hillo Warld"

    def test_correct_grammar_validation_error(self, factory, view):
        request = factory.post('/fake-url/grammar', {}, format='json')
        
        response = view(request)

        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "input" in response.data 

    @patch("apps.ouel_gemini.views.selectors.get_active_prompt")
    def test_correct_grammar_prompt_not_found(self, mock_selector, factory, view):
        mock_selector.side_effect = ValueError("Prompt not found")

        request = factory.post('/fake-url/grammar', {"input": "Test"}, format='json')
        response = view(request)

        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert response.data["error"] == "Prompt not found"

    @patch("apps.ouel_gemini.views.selectors.get_active_prompt")
    def test_correct_grammar_internal_error(self, mock_selector, factory, view):
        mock_selector.side_effect = Exception("Database crash")

        request = factory.post('/fake-url/grammar', {"input": "Test"}, format='json')
        response = view(request)

        assert response.status_code == status.HTTP_500_INTERNAL_SERVER_ERROR
        assert response.data["error"] == "Internal Server Error"


class TestReadingAppView:
    @pytest.fixture
    def factory(self):
        return APIRequestFactory()

    @pytest.fixture
    def view(self):
        return ReadingAppView.as_view({'post': 'highlight'})

    @patch("apps.ouel_gemini.views.services.highlight_passage")
    @patch("apps.ouel_gemini.views.selectors.get_active_prompt")
    def test_highlight_path(self, mock_selector, mock_service, factory, view):
        mock_selector.return_value = MagicMock()
        mock_service.return_value = {"highlighted": "Text"}

        data = {
            "passage": "Long text...",
            "question": "Where is logic?"
        }
        request = factory.post('/fake-url/highlight', data, format='json')
        response = view(request)

        assert response.status_code == status.HTTP_200_OK
        assert response.data == {"highlighted": "Text"}

    def test_highlight_validation_error(self, factory, view):
        data = {"passage": "Only passage"}
        request = factory.post('/fake-url/highlight', data, format='json')
        
        response = view(request)

        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "question" in response.data

    @patch("apps.ouel_gemini.views.services.highlight_passage")
    @patch("apps.ouel_gemini.views.selectors.get_active_prompt")
    def test_highlight_api_crash(self, mock_selector, mock_service, factory, view):
        mock_selector.return_value = MagicMock()
        mock_service.side_effect = Exception("Gemini API Timeout")

        data = {"passage": "Text", "question": "Q?"}
        request = factory.post('/fake-url/highlight', data, format='json')
        response = view(request)

        assert response.status_code == status.HTTP_500_INTERNAL_SERVER_ERROR
        assert response.data["error"] == "Gemini API error"