import os
import json
import logging
from datetime import datetime, timedelta
from google import genai
from github import Github, Auth 

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

MEMBERS_DEFAULT = {
    "JuniorThanhBQ": {"name": "Văn Trung Thành", "id": "2351050164"},
    "ITPhongou23": {"name": "Nguyễn Thanh Phong", "id": "2351050133"},
    "PhongNguyen05": {"name": "Nguyễn Thanh Phong", "id": "2351050133"},
    "ngochine": {"name": "Hồ Thị Ngọc Trinh", "id": "2351050189"},
    "Thao225": {"name": "Bùi Thiên Hương Thảo", "id": "2351050165"},
    "thisismyhong": {"name": "Lê Thị Mai Hồng", "id": "2351050049"},
}

def get_env_variable(var_name, default=None):
    value = os.environ.get(var_name, default)
    if value is None:
        raise ValueError(f"Missing required environment variable: {var_name}")
    return value

def generate_weekly_report():
    try:
        GITHUB_TOKEN = get_env_variable("GITHUB_TOKEN")
        REPO_NAME = get_env_variable("GITHUB_REPOSITORY")
        GEMINI_API_KEY = get_env_variable("GEMINI_API_KEY")
        PROJECT_NAME = get_env_variable("PROJECT_NAME", "open-university-english-learning")
        
        client = genai.Client(api_key=GEMINI_API_KEY)
        auth = Auth.Token(GITHUB_TOKEN)
        g = Github(auth=auth) 
        repo = g.get_repo(REPO_NAME)

        today = datetime.now()
        last_week = today - timedelta(days=7)
        date_range = f"{last_week.strftime('%d/%m/%Y')} - {today.strftime('%d/%m/%Y')}"
        logging.info(f"Generating report for: {date_range}")

        closed_issues = list(repo.get_issues(state='closed', since=last_week))

        open_issues = list(repo.get_issues(state='open'))
        
        total_open = len(open_issues)
        total_closed_week = len(closed_issues)
        total_tasks = total_open + total_closed_week 
        progress_percent = round((total_closed_week / (total_tasks if total_tasks > 0 else 1)) * 100, 2)

        done_table_str = ""
        for issue in closed_issues:
            assignee = issue.assignee.login if issue.assignee else "N/A"
            user_info = MEMBERS_DEFAULT.get(assignee, {"name": assignee, "id": "N/A"})
            labels = ", ".join([l.name for l in issue.labels])
            done_table_str += f"| {user_info['name']} | {labels} | {issue.title} | [Link]({issue.html_url}) |\n"

        plan_table_str = ""
        for issue in open_issues:
            assignee = issue.assignee.login if issue.assignee else "N/A"
            user_info = MEMBERS_DEFAULT.get(assignee, {"name": "Chưa giao"})
            labels = ", ".join([l.name for l in issue.labels])
            plan_table_str += f"| {user_info['name']} | {labels} | {issue.title} |\n"

        prompt = f"""
        Bạn là thư ký dự án AI chuyên nghiệp. Hãy viết báo cáo tiến độ tuần dựa trên dữ liệu chính xác dưới đây.

        THÔNG TIN DỰ ÁN:
        - Tên: {PROJECT_NAME}
        - Tuần: {date_range}
        - Trưởng nhóm: Văn Trung Thành (2351050164)

        SỐ LIỆU THỐNG KÊ (Đã tính toán chính xác, vui lòng sử dụng số này):
        - Công việc hoàn thành trong tuần: {total_closed_week}
        - Công việc tồn đọng: {total_open}
        - Tỷ lệ xử lý tuần này: {progress_percent}%

        DỮ LIỆU CHI TIẾT:
        [DANH SÁCH HOÀN THÀNH]
        | Thành viên | Loại task | Công việc | Link |
        |---|---|---|---|
        {done_table_str}

        [DANH SÁCH KẾ HOẠCH/TỒN ĐỌNG]
        | Thành viên | Loại task | Công việc |
        |---|---|---|
        {plan_table_str}

        YÊU CẦU ĐẦU RA (Markdown):
        1. Giữ nguyên format tiêu đề và thông tin chung.
        2. Phần "Công việc đã hoàn thành": Liệt kê dạng bảng.
        3. Phần "Tiến độ tổng thể": Viết một đoạn ngắn nhận xét dựa trên số liệu % ở trên. Nếu > 50% khen ngợi, < 50% nhắc nhở.
        4. Phần "Vấn đề cần xem xét": Dựa vào tên các issue đang mở (open), hãy gợi ý các rủi ro kỹ thuật hoặc quản lý tiềm ẩn.
        """

        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt
        )

        report_title = f"Weekly Report: {date_range}"
        repo.create_issue(title=report_title, body=response.text, labels=["report", "weekly"])
        logging.info(f"Successfully created issue: {report_title}")

    except Exception as e:
        logging.error(f"Error generating report: {str(e)}")
        raise e

if __name__ == "__main__":
    generate_weekly_report()