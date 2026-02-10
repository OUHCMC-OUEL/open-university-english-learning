import unittest
from unittest.mock import MagicMock, patch
from datetime import datetime
import sys
import os
from pathlib import Path

base_folder = Path(__file__).resolve().parent.parent.parent
script_path = os.path.join(base_folder, "scripts")
sys.path.append(script_path)

import team_reminder

class TestDailyReminder(unittest.TestCase):
    def test_create_html_body(self):
        mock_issue = MagicMock()
        mock_issue.title = "Fix Bug Login"
        mock_issue.html_url = "http://github.com/issue/1"

        mock_issue.created_at = datetime.now(team_reminder.timezone.utc)
        
        html = team_reminder.create_html_body("Thành", [mock_issue])
        
        self.assertIn("Xin chào <strong>Thành</strong>", html)
        self.assertIn("Fix Bug Login", html)
        self.assertIn("http://github.com/issue/1", html)

    @patch('team_reminder.datetime')
    def test_is_working_day_weekend(self, mock_datetime):
        mock_now = MagicMock()
        mock_now.weekday.return_value = 6 
        mock_datetime.now.return_value = mock_now
        
        self.assertFalse(team_reminder.is_working_day())

    @patch('team_reminder.datetime')
    def test_is_working_day_holiday(self, mock_datetime):
        mock_now = MagicMock()
        mock_now.weekday.return_value = 2
        mock_now.strftime.return_value = "30/04"
        mock_datetime.now.return_value = mock_now
        
        self.assertFalse(team_reminder.is_working_day())

if __name__ == '__main__':
    unittest.main()