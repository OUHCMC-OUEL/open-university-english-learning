import os
import logging
import re
from datetime import datetime, timedelta, timezone
from typing import Dict, List, Any
from google import genai
from google.genai import types
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

    @staticmethod
    def extract_subtasks(body):
        if not body:
            return ""

        pattern = r'- \[(x| )\] (.*)'
        matches = re.findall(pattern, body)
        
        if not matches:
            return ""

        summary = []
        total = len(matches)
        done = 0
        
        for status, content in matches:
            is_done = status.lower() == 'x'
            if is_done: done += 1
            mark = "[x]" if is_done else "[ ]"
            summary.append(f"{mark} {content[:40]}...")

        return f"<br>Sub-tasks: {done}/{total} Done<br>" + "<br>".join(summary)

    def get_issue_evidence(self, issue):
        evidence_parts = []
        
        if issue.body and len(issue.body) > 20:
            evidence_parts.append(f"Desc: {issue.body[:80]}...")
        
        comments = list(issue.get_comments()) 
        if comments:
            last_comment = comments[-1]
            evidence_parts.append(f"Last Comment: {last_comment.body[:80]}...")

        if issue.pull_request:
            evidence_parts.append("Linked PR: Yes")

        subtasks_info = GitHubDataProvider.extract_subtasks(issue.body)
        if subtasks_info:
            evidence_parts.append(subtasks_info)

        if not evidence_parts:
            return "No evidence provided"
            
        return "<br>".join(evidence_parts)

class ReportDataAnalyzer:
    def __init__(self, members_dict):
        self.members = members_dict

    def _get_assignee_names(self, issue):
        if not issue.assignees:
            return ["Unassigned"], "Unassigned"
        
        assignee_ids = [a.login for a in issue.assignees]
        display_names = []
        for login in assignee_ids:
            member_info = self.members.get(login, {"name": login})
            display_names.append(member_info["name"])
            
        return assignee_ids, ", ".join(display_names)

    def analyze_workload(self, open_issues):
        workload = defaultdict(int)
        stale_issues = []
        formatted_rows = ""
        active_assignees_ids = set()
        
        current_time = datetime.now(timezone.utc)

        for issue in open_issues:
            assignee_ids, assignee_display = self._get_assignee_names(issue)
            
            for uid in assignee_ids:
                if uid != "Unassigned":
                    active_assignees_ids.add(uid)
                    workload[uid] += 1
            
            days_open = (current_time - issue.created_at).days
            if days_open > 14:
                stale_issues.append(f"{issue.title} ({days_open} days)")

            labels = ", ".join([l.name for l in issue.labels])

            subtasks = GitHubDataProvider.extract_subtasks(issue.body)
            
            formatted_rows += f"| {assignee_display} | {labels} | {issue.title} {subtasks} | {days_open} days |\n"
        
        return {
            "workload_stats": dict(workload),
            "stale_issues": stale_issues,
            "table_str": formatted_rows
        }

    def analyze_performance(self, closed_issues, data_provider):
        completed_by_user = defaultdict(int)
        formatted_rows = ""

        for issue in closed_issues:
            assignee_ids, assignee_display = self._get_assignee_names(issue)
            
            for uid in assignee_ids:
                if uid != "Unassigned":
                    completed_by_user[uid] += 1
            
            labels = ", ".join([l.name for l in issue.labels])
            evidence = data_provider.get_issue_evidence(issue)
            
            formatted_rows += f"| {assignee_display} | {labels} | {issue.title} | {evidence} | [Link]({issue.html_url}) |\n"

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
        Role: Senior Project Manager.
        Task: Generate a Weekly Status Report for project "{self.project_name}" in **Vietnamese**.
        Period: {date_range}

        ---
        INPUT DATA:
        
        1. METRICS:
        - Completed: {metrics['total_closed']}
        - Remaining: {metrics['total_open']}
        - Completion Rate: {metrics['progress_percent']}%
        - Stale Tasks (>14 days): {len(open_data['stale_issues'])} ({stale_issues_str})

        2. COMPLETED TASKS (Done):
        | Assignees | Labels | Task | Evidence | Link |
        |---|---|---|---|---|
        {closed_data['table_str']}

        3. ONGOING/BACKLOG (Not Done):
        | Assignees | Labels | Task | Days Open |
        |---|---|---|---|
        {open_data['table_str']}

        ---
        INSTRUCTIONS (STRICTLY FOLLOW):
        
        1. **Tone & Style**: 
           - Professional, Objective, Data-driven, Concise.
           - NO emotional words (e.g., "tuyệt vời", "đáng tiếc", "buồn thay"). 
           - NO fluff or greetings. Start directly with the report content.
        
        2. **Report Structure**:
        
           **I. TỔNG QUAN (Executive Summary)**
           - State the Completion Rate clearly.
           - Assessment: "On Track" (if > 70%) or "At Risk" (if < 50%) or "Needs Attention".
           - Mention critical blockers (Stale Tasks) if any.

           **II. CHI TIẾT TIẾN ĐỘ (Progress Details)**
           - List completed key tasks (summarize from table 2).
           - Mention specific members who contributed (based on Assignees column).
           - **Review Evidence**: Verify column "Evidence" in table 2. If "No evidence provided", explicitly flag this as "Missing Documentation" for that member.

           **III. VẤN ĐỀ TỒN ĐỌNG (Issues & Risks)**
           - List tasks open > 14 days.
           - Identify members with high WIP (Work In Progress) from table 3.
           - Identify sub-tasks progress (e.g., "Task A has 0/5 sub-tasks done").

           **IV. KẾ HOẠCH TUẦN TỚI (Next Actions)**
           - Propose 3-5 specific actions to clear the backlog.
           - Assign checking documentation responsibility if evidence is missing.

        3. **Format**: Markdown. Use tables or bullet points for readability.
        """

    def generate(self, prompt):
        config = types.GenerateContentConfig(
            temperature=0.2, 
            top_p=0.8,
            top_k=40
        )
        response = self.client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config=config
        )
        return response.text

def main():
    try:
        GITHUB_TOKEN = ConfigLoader.get_env("GITHUB_TOKEN")
        REPO_NAME = ConfigLoader.get_env("GITHUB_REPOSITORY")
        GEMINI_API_KEY = ConfigLoader.get_env("GEMINI_API_KEY")
        PROJECT_NAME = ConfigLoader.get_env("PROJECT_NAME", "Open University English Learning")

        date_info = DateManager.get_reporting_period()
        logging.info(f"Generating report for: {date_info['formatted_range']}")

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

        logging.info(f"Report Generated Preview:\n{report_content[:500]}...")
        logging.info("Done.")

    except Exception as e:
        logging.error(f"Critical Error: {str(e)}")
        raise e

if __name__ == "__main__":
    main()