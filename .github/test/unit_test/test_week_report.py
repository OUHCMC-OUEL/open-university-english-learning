import sys
import os
from pathlib import Path
import unittest
from unittest.mock import MagicMock, patch, PropertyMock
from datetime import datetime, timedelta, timezone

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
        self.mock_issue_open.created_at = datetime.now(timezone.utc) - timedelta(days=20)

        user_open = MagicMock()
        user_open.login = "JuniorThanhBQ"
        self.mock_issue_open.assignees = [user_open] 

        self.mock_issue_open.labels = [MagicMock(name="backend")]
        type(self.mock_issue_open.labels[0]).name = PropertyMock(return_value="backend")
        self.mock_issue_open.body = "Open task body" 

        self.mock_issue_closed = MagicMock()
        self.mock_issue_closed.title = "Task Done 1"
        self.mock_issue_closed.html_url = "http://url2"
        self.mock_issue_closed.state = "closed"
        self.mock_issue_closed.body = "Done task details"

        user_closed = MagicMock()
        user_closed.login = "ITPhongou23"
        self.mock_issue_closed.assignees = [user_closed]

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
        
        provider = main.GitHubDataProvider("dummy_token", "repo")
        
        mock_repo.get_issues.return_value = [self.mock_issue_open]
        issues = provider.fetch_issues("open")
        self.assertEqual(len(issues), 1)
        self.assertEqual(issues[0].title, "Task Open 1")

    @patch("generate_week_report.Github")
    def test_evidence_checker_body(self, mock_github):
        provider = main.GitHubDataProvider("dummy_token", "repo")
        
        issue_with_body = MagicMock()
        issue_with_body.body = "Detailed description of what was done."
        evidence = provider.get_issue_evidence(issue_with_body)
        
        self.assertIn("Desc:", evidence)

    @patch("generate_week_report.Github")
    def test_evidence_checker_comment(self, mock_github):
        provider = main.GitHubDataProvider("dummy_token", "repo")
        
        issue_empty_body = MagicMock()
        issue_empty_body.body = ""
        mock_comment = MagicMock()
        mock_comment.body = "Finished with image.png"
        issue_empty_body.get_comments.return_value = [mock_comment]
        
        evidence = provider.get_issue_evidence(issue_empty_body)
        self.assertIn("Last Comment:", evidence)

    @patch("generate_week_report.GitHubDataProvider") 
    def test_analyzer_workload(self, mock_gh_provider_class):
        mock_instance = mock_gh_provider_class.return_value
        mock_instance.extract_subtasks.return_value = "" 
        
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
        self.assertIn("Vietnamese", prompt)
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
        gh_instance.extract_subtasks.return_value = ""

        gemini_instance = mock_gemini.return_value
        gemini_instance.generate.return_value = "AI Generated Report Content"

        main.main()
        gemini_instance.generate.assert_called_once()

    def test_multi_assignees_handling(self):
        mock_issue = MagicMock()
        
        user_a = MagicMock(); user_a.login = "DevA_ID"
        user_b = MagicMock(); user_b.login = "DevB_ID"
        user_c = MagicMock(); user_c.login = "TesterC_ID"
        
        mock_issue.assignees = [user_a, user_b, user_c]

        custom_members = {
            "DevA_ID": {"name": "Dev A"},
            "DevB_ID": {"name": "Dev B"},
            "TesterC_ID": {"name": "Tester C"}
        }

        analyzer = main.ReportDataAnalyzer(custom_members)
        ids, display_str = analyzer._get_assignee_names(mock_issue)
        self.assertEqual(len(ids), 3)
        self.assertIn("Dev A", display_str)
        self.assertIn("Dev B", display_str)
        self.assertIn("Tester C", display_str)
        self.assertTrue(", " in display_str)

    @patch("generate_week_report.Github")
    def test_subtasks_extraction(self, mock_github):
        provider = main.GitHubDataProvider("dummy_token", "repo")

        body_content = """
        Mô tả công việc chính.
        - [x] Task con 1 (Done)
        - [ ] Task con 2 (Pending)
        """

        result = provider.extract_subtasks(body_content)

        self.assertIn("1/2 Done", result)
        self.assertIn("[x] Task con 1", result)
        self.assertIn("[ ] Task con 2", result)
        self.assertIn("<br>", result)

    def test_empty_data_robustness(self):
        mock_issue_no_assignee = MagicMock()
        mock_issue_no_assignee.assignees = [] 
        
        analyzer = main.ReportDataAnalyzer({})
        ids, display_str = analyzer._get_assignee_names(mock_issue_no_assignee)
        
        self.assertEqual(display_str, "Unassigned")
        self.assertEqual(ids, ["Unassigned"])

        with patch("generate_week_report.Github"):
            provider = main.GitHubDataProvider("dummy_token", "repo")

            res_none = provider.extract_subtasks(None)
            self.assertEqual(res_none, "")

            res_empty = provider.extract_subtasks("")
            self.assertEqual(res_empty, "")

            res_no_checklist = provider.extract_subtasks("Chỉ là mô tả thường, không có task.")
            self.assertEqual(res_no_checklist, "")

if __name__ == '__main__':
    unittest.main()