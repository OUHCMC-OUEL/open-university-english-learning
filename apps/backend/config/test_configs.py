import pytest
from unittest.mock import patch, MagicMock
from django.urls import reverse
from django.contrib.auth import get_user_model

User = get_user_model()
pytestmark = pytest.mark.django_db

@pytest.fixture
def superuser_client(client):
    user = User.objects.create_superuser(username='admin', password='password', email='admin@test.com')
    client.login(username='admin', password='password')
    return client

class TestSystemUpdateView:
    
    def mock_subprocess_run(self, *args, **kwargs):
        command = args[0]
        mock_result = MagicMock()
        mock_result.stdout = "Success output"
        mock_result.stderr = ""
        mock_result.returncode = 0 

        if 'rev-parse' in command:
            mock_result.stdout = "abc123commit"
        elif 'pull' in command and self.simulated_error == 'pull':
            mock_result.returncode = 1
            mock_result.stderr = "Merge conflict!"
        elif 'migrate' in command and self.simulated_error == 'migrate':
            mock_result.returncode = 1
            mock_result.stderr = "Table already exists!"

        return mock_result

    @patch.dict('os.environ', {'USER': 'tester_ảo', 'PYTHONANYWHERE_DOMAIN': 'pythonanywhere.com'}) 
    @patch('subprocess.run')
    @patch('os.path.exists', return_value=True)
    @patch('os.utime')
    def test_update_success(self, mock_utime, mock_exists, mock_run, superuser_client):
        self.simulated_error = None
        mock_run.side_effect = self.mock_subprocess_run


        url = reverse('admin:system-update') 
        response = superuser_client.post(url)

        assert response.status_code == 200
 
        assert mock_run.call_count == 4

        mock_utime.assert_called_once()

        messages = list(response.context['messages'])
        assert "thành công" in str(messages[0])

    @patch('subprocess.run')
    def test_update_git_pull_fails(self, mock_run, superuser_client):
        self.simulated_error = 'pull'
        mock_run.side_effect = self.mock_subprocess_run

        url = reverse('admin:system-update')
        response = superuser_client.post(url)


        assert mock_run.call_count == 2 
        messages = list(response.context['messages'])
        assert "Git pull thất bại" in str(messages[0])

    @patch('subprocess.run')
    def test_update_migrate_fails_and_rollback(self, mock_run, superuser_client):
        self.simulated_error = 'migrate'
        mock_run.side_effect = self.mock_subprocess_run

        url = reverse('admin:system-update')
        response = superuser_client.post(url)

        assert mock_run.call_count == 4
        
        last_call_args = mock_run.call_args_list[-1][0][0]
        assert 'reset' in last_call_args
        assert '--hard' in last_call_args
        assert 'abc123commit' in last_call_args
        
        messages = list(response.context['messages'])
        assert "Đã khôi phục" in str(messages[0])