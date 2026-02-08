import os
import logging
from datetime import datetime, timedelta
from typing import Dict, List, Any
from google import genai
from github import Github, Auth
from collections import defaultdict

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

MEMBERS = {
    "JuniorThanhBQ": {"name": "Văn Trung Thành", "id": "2351050164"},
    "ITPhongou23": {"name": "Nguyễn Thanh Phong", "id": "2351050133"},
    "PhongNguyen05": {"name": "Nguyễn Thanh Phong", "id": "2351050133"},
    "ngochine": {"name": "Hồ Thị Ngọc Trinh", "id": "2351050189"},
    "Thao225": {"name": "Bùi Thiên Hương Thảo", "id": "2351050165"},
    "thisismyhong": {"name": "Lê Thị Mai Hồng", "id": "2351050049"},
}

class ConfigLoader:
    @staticmethod
    def get_env(var_name, default=None):
        value = os.environ.get(var_name, default)
        if value is None:
            raise ValueError(f"Missing required environment variable: {var_name}")
        return value

class DateManager:
    @staticmethod
    def get_reporting_period():
        today = datetime.now()
        last_week = today - timedelta(days=7)
        return {
            "start_date": last_week,
            "end_date": today,
            "formatted_range": f"{last_week.strftime('%d/%m/%Y')} - {today.strftime('%d/%m/%Y')}"
        }

class GitHubDataProvider:
    def __init__(self, token, repo_name):
        auth = Auth.Token(token)
        self.g = Github(auth=auth)
        self.repo = self.g.get_repo(repo_name)

    def fetch_issues(self, state, since=None):
        if since:
            return list(self.repo.get_issues(state=state, since=since))
        return list(self.repo.get_issues(state=state))

    def get_issue_evidence(self, issue):
        if issue.body and len(issue.body) > 20:
            return f"Body: {issue.body[:100]}..."
        
        comments = list(issue.get_comments())
        if comments:
            last_comment = comments[-1]
            return f"Comment: {last_comment.body[:100]}..."
        
        if issue.pull_request:
            return "Linked Pull Request"
            
        return "No evidence provided"

class ReportDataAnalyzer:
    def __init__(self, members_dict):
        self.members = members_dict

    def analyze_workload(self, open_issues):
        workload = defaultdict(int)
        stale_issues = []
        formatted_rows = ""
        
        current_time = datetime.now()

        for issue in open_issues:
            assignee = issue.assignee.login if issue.assignee else "Unassigned"
            workload[assignee] += 1
            
            days_open = (current_time - issue.created_at).days
            if days_open > 14:
                stale_issues.append(f"{issue.title} ({days_open} days)")

            user_info = self.members.get(assignee, {"name": assignee})
            labels = ", ".join([l.name for l in issue.labels])
            formatted_rows += f"| {user_info['name']} | {labels} | {issue.title} | {days_open} days |\n"

        return {
            "workload_stats": dict(workload),
            "stale_issues": stale_issues,
            "table_str": formatted_rows
        }

    def analyze_performance(self, closed_issues, data_provider):
        completed_by_user = defaultdict(int)
        formatted_rows = ""

        for issue in closed_issues:
            assignee = issue.assignee.login if issue.assignee else "Unassigned"
            completed_by_user[assignee] += 1
            
            user_info = self.members.get(assignee, {"name": assignee})
            labels = ", ".join([l.name for l in issue.labels])
            evidence = data_provider.get_issue_evidence(issue)
            
            formatted_rows += f"| {user_info['name']} | {labels} | {issue.title} | {evidence} | [Link]({issue.html_url}) |\n"

        return {
            "performance_stats": dict(completed_by_user),
            "table_str": formatted_rows
        }

class GeminiContentGenerator:
    def __init__(self, api_key, project_name):
        self.client = genai.Client(api_key=api_key)
        self.project_name = project_name

    def create_prompt(self, date_range, open_data, closed_data, metrics):
        stale_issues_str = ', '.join(open_data['stale_issues']) if open_data['stale_issues'] else "None"
        
        return f"""
        You are an AI Project Manager. Your task is to generate a Weekly Progress Report in **Vietnamese**.
        
        TONE & STYLE:
        - Professional, strict, data-driven, yet constructive.
        - Do not be afraid to point out failures directly.
        
        PROJECT CONTEXT:
        - Project Name: {self.project_name}
        - Reporting Period: {date_range}
        
        KEY METRICS:
        - Tasks Completed: {metrics['total_closed']}
        - Tasks Remaining (Open): {metrics['total_open']}
        - Completion Rate: {metrics['progress_percent']}%
        - Stale Tasks (> 14 days): {len(open_data['stale_issues'])}

        DATASETS:

        1. COMPLETED TASKS TABLE (Review "Evidence/Content" column carefully):
        | Member | Labels | Task Title | Evidence/Content | Link |
        |---|---|---|---|---|
        {closed_data['table_str']}

        2. BACKLOG/OPEN TASKS TABLE (Review "Days Open" column):
        | Member | Labels | Task Title | Days Open |
        |---|---|---|---|
        {open_data['table_str']}

        ---------------------------------------------------------
        
        OUTPUT INSTRUCTIONS (Generate the response in VIETNAMESE):

        1. **TỔNG QUAN TIẾN ĐỘ (Progress Overview)**:
           - Evaluate the week based on the completion rate ({metrics['progress_percent']}%) and the number of stale tasks.
           - If the rate is < 50%, express disappointment. If > 80%, give praise.

        2. **ĐÁNH GIÁ CÁ NHÂN (Individual Performance Review)** - CRITICAL SECTION:
           - Analyze EACH member listed in the tables.
           - **STRICT RULE**: Look at the "Evidence/Content" column in the Completed Tasks table. If any task has "No evidence provided", you MUST harshy criticize that member for lack of professionalism and transparency.
           - **Bottleneck Check**: Look at the "Days Open" column in the Backlog table. Warn specific members who are holding tasks for too long.
           - Acknowledge high performers who have clear evidence and high completion rates.

        3. **RỦI RO & VẤN ĐỀ (Risks & Issues)**:
           - Address the stale issues specifically: {stale_issues_str}.
           - Analyze the workload distribution: {open_data['workload_stats']}. Point out if someone is overloaded or if the work is unevenly distributed.

        4. **KẾ HOẠCH TUẦN TỚI (Next Week Plan)**:
           - Provide 3-4 bullet points of actionable suggestions based on the current backlog.

        FORMAT: Use Markdown. Be direct and clear.
        """

    def generate(self, prompt):
        response = self.client.models.generate_content(
            model='gemini-2.5-pro',
            contents=prompt
        )
        return response.text

def main():
    try:
        GITHUB_TOKEN = ConfigLoader.get_env("GITHUB_TOKEN")
        REPO_NAME = ConfigLoader.get_env("GITHUB_REPOSITORY")
        GEMINI_API_KEY = ConfigLoader.get_env("GEMINI_API_KEY")
        PROJECT_NAME = ConfigLoader.get_env("PROJECT_NAME", "open-university-english-learning")

        date_info = DateManager.get_reporting_period()
        logging.info(f"Processing report for: {date_info['formatted_range']}")

        gh_provider = GitHubDataProvider(GITHUB_TOKEN, REPO_NAME)
        analyzer = ReportDataAnalyzer(MEMBERS)

        open_issues_raw = gh_provider.fetch_issues(state='open')
        closed_issues_raw = gh_provider.fetch_issues(state='closed', since=date_info['start_date'])

        open_data = analyzer.analyze_workload(open_issues_raw)
        closed_data = analyzer.analyze_performance(closed_issues_raw, gh_provider)

        total_tasks = len(open_issues_raw) + len(closed_issues_raw)
        progress = round((len(closed_issues_raw) / total_tasks * 100), 2) if total_tasks > 0 else 0

        metrics = {
            "total_open": len(open_issues_raw),
            "total_closed": len(closed_issues_raw),
            "progress_percent": progress
        }

        generator = GeminiContentGenerator(GEMINI_API_KEY, PROJECT_NAME)
        prompt = generator.create_prompt(date_info['formatted_range'], open_data, closed_data, metrics)
        
        report_content = generator.generate(prompt)

        report_title = f"Weekly Report: {date_info['formatted_range']}"
        gh_provider.repo.create_issue(title=report_title, body=report_content, labels=["report", "weekly"])
        logging.info(f"Report created successfully: {report_title}")

    except Exception as e:
        logging.error(f"Failed to generate report: {str(e)}")
        raise e

if __name__ == "__main__":
    main()