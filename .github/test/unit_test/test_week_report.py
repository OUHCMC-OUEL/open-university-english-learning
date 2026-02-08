import sys
import os
from pathlib import Path
import unittest
from unittest.mock import MagicMock, patch, PropertyMock
from datetime import datetime, timedelta

base_folder = Path(__file__).resolve().parent.parent.parent
script_path = os.path.join(base_folder, "scripts")
sys.path.append(script_path)

try:
    import generate_week_report as main
except ImportError:
    print("Không tìm thấy file generate_week_report.py")
    sys.exit(1)

class TestWeeklyReport(unittest.TestCase):
    def setUp(self):
        self.mock_issue_open = MagicMock()
        self.mock_issue_open.title = "Task Open 1"
        self.mock_issue_open.html_url = "http://url1"
        self.mock_issue_open.state = "open"
        self.mock_issue_open.created_at = datetime.now() - timedelta(days=20) 
        self.mock_issue_open.assignee.login = "JuniorThanhBQ"
        self.mock_issue_open.labels = [MagicMock(name="backend")]
        type(self.mock_issue_open.labels[0]).name = PropertyMock(return_value="backend")

        self.mock_issue_closed = MagicMock()
        self.mock_issue_closed.title = "Task Done 1"
        self.mock_issue_closed.html_url = "http://url2"
        self.mock_issue_closed.state = "closed"
        self.mock_issue_closed.body = "Done task details"
        self.mock_issue_closed.assignee.login = "ITPhongou23"
        self.mock_issue_closed.labels = [MagicMock(name="frontend")]
        type(self.mock_issue_closed.labels[0]).name = PropertyMock(return_value="frontend")
        self.mock_issue_closed.pull_request = None

    def test_config_loader(self):
        with patch.dict(os.environ, {"TEST_VAR": "123"}):
            self.assertEqual(main.ConfigLoader.get_env("TEST_VAR"), "123")
        
        with self.assertRaises(ValueError):
            main.ConfigLoader.get_env("NON_EXISTENT_VAR")

    def test_date_manager(self):
        period = main.DateManager.get_reporting_period()
        self.assertIn("formatted_range", period)
        self.assertIsInstance(period["start_date"], datetime)

    @patch("generate_week_report.Github")
    def test_github_provider_fetch(self, mock_github):
        mock_repo = MagicMock()
        mock_github.return_value.get_repo.return_value = mock_repo
        
        provider = main.GitHubDataProvider("token", "repo")
        
        mock_repo.get_issues.return_value = [self.mock_issue_open]
        issues = provider.fetch_issues("open")
        self.assertEqual(len(issues), 1)
        self.assertEqual(issues[0].title, "Task Open 1")

    @patch("generate_week_report.Github")
    def test_evidence_checker_body(self, mock_github):
        provider = main.GitHubDataProvider("token", "repo")
        
        issue_with_body = MagicMock()
        issue_with_body.body = "Detailed description of what was done."
        evidence = provider.get_issue_evidence(issue_with_body)
        self.assertIn("Body:", evidence)

    @patch("generate_week_report.Github")
    def test_evidence_checker_comment(self, mock_github):
        provider = main.GitHubDataProvider("token", "repo")
        
        issue_empty_body = MagicMock()
        issue_empty_body.body = ""
        mock_comment = MagicMock()
        mock_comment.body = "Finished with image.png"
        issue_empty_body.get_comments.return_value = [mock_comment]
        
        evidence = provider.get_issue_evidence(issue_empty_body)
        self.assertIn("Comment:", evidence)

    @patch("generate_week_report.Github")
    def test_evidence_checker_none(self, mock_github):
        provider = main.GitHubDataProvider("token", "repo")
        issue_no_info = MagicMock()
        issue_no_info.body = ""
        issue_no_info.get_comments.return_value = []
        issue_no_info.pull_request = None
        
        evidence = provider.get_issue_evidence(issue_no_info)
        self.assertEqual(evidence, "No evidence provided")

    def test_analyzer_workload(self):
        analyzer = main.ReportDataAnalyzer(main.MEMBERS)
        data = analyzer.analyze_workload([self.mock_issue_open])
        
        self.assertIn("Văn Trung Thành", data["table_str"])
        self.assertIn("backend", data["table_str"])
        self.assertEqual(data["workload_stats"]["JuniorThanhBQ"], 1)
        self.assertTrue(len(data["stale_issues"]) > 0)

    def test_analyzer_performance(self):
        mock_provider = MagicMock()
        mock_provider.get_issue_evidence.return_value = "Verified"
        
        analyzer = main.ReportDataAnalyzer(main.MEMBERS)
        data = analyzer.analyze_performance([self.mock_issue_closed], mock_provider)
        
        self.assertIn("Nguyễn Thanh Phong", data["table_str"])
        self.assertIn("Verified", data["table_str"])

    def test_gemini_prompt_structure(self):
        generator = main.GeminiContentGenerator("key", "project")
        open_data = {"table_str": "open_row", "stale_issues": ["t1"], "workload_stats": {}}
        closed_data = {"table_str": "closed_row"}
        metrics = {"total_closed": 5, "total_open": 2, "progress_percent": 70}
        
        prompt = generator.create_prompt("01/01 - 07/01", open_data, closed_data, metrics)
        
        self.assertIn("Stale Tasks", prompt) 
        self.assertIn("70%", prompt)
        self.assertIn("VIETNAMESE", prompt)
        self.assertIn("open_row", prompt)
        self.assertIn("closed_row", prompt)

    @patch("generate_week_report.GitHubDataProvider")
    @patch("generate_week_report.GeminiContentGenerator")
    @patch("generate_week_report.ConfigLoader")
    def test_end_to_end(self, mock_config, mock_gemini, mock_gh_provider):
        mock_config.get_env.side_effect = lambda k, d=None: "dummy_value"
      
        gh_instance = mock_gh_provider.return_value
        gh_instance.fetch_issues.side_effect = [
            [self.mock_issue_open], 
            [self.mock_issue_closed] 
        ]
        gh_instance.get_issue_evidence.return_value = "Evidence OK"

        gemini_instance = mock_gemini.return_value
        gemini_instance.generate.return_value = "AI Generated Report Content"

        main.main()
        gemini_instance.generate.assert_called_once()
        
        gh_instance.repo.create_issue.assert_called_once()
        args, kwargs = gh_instance.repo.create_issue.call_args
        self.assertIn("Weekly Report", kwargs['title'])
        self.assertEqual(kwargs['body'], "AI Generated Report Content")

if __name__ == '__main__':
    unittest.main()
