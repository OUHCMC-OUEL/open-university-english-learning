import os
import smtplib
import logging
from datetime import datetime, timedelta, timezone
from collections import defaultdict
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from github import Github, Auth

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

MEMBERS_EMAIL = {
    "JuniorThanhBQ": {"email": "2351050164thanh@ou.edu.vn", "name": "Văn Trung Thành"},
    "ITPhongou23": {"email": "2351050133@ou.edu.vn", "name": "Nguyễn Thanh Phong"},
    "ngochine": {"email": "2351050189@ou.edu.vn", "name": "Hồ Thị Ngọc Trinh"},
    "Thao225": {"email": "2351050165@ou.edu.vn", "name": "Bùi Thiên Hương Thảo"},
    "thisismyhong": {"email": "2351050049@ou.edu.vn", "name": "Lê Thị Mai Hồng"},
}

HOLIDAYS_FIXED = ["01/01", "30/04", "01/05", "02/09"]
HOLIDAYS_DYNAMIC = ["15/02","16/02", "17/02", "18/02", "19/02", "20/02", "21/02", "22/02"] #tet 2026

def get_env(var_name):
    value = os.environ.get(var_name)
    if not value:
        raise ValueError(f"Missing env var: {var_name}")
    return value

def is_working_day():
    vn_timezone = timezone(timedelta(hours=7))
    now_vn = datetime.now(vn_timezone)
    
    # if now_vn.weekday() >= 6: đáng lý là nên mở nhưng tôi cần demo
    #     return False

    today_str = now_vn.strftime("%d/%m")
    if today_str in HOLIDAYS_FIXED or today_str in HOLIDAYS_DYNAMIC:
        return False
        
    return True

def create_html_body(member_name, issues):
    rows = ""
    for issue in issues:
        days_open = (datetime.now(timezone.utc) - issue.created_at).days
        color = "red" if days_open > 7 else "black"
        
        rows += f"""
        <tr>
            <td style="padding: 8px; border: 1px solid #ddd;">{issue.title}</td>
            <td style="padding: 8px; border: 1px solid #ddd;">
                <a href="{issue.html_url}" style="text-decoration: none; color: #0366d6;">Xem Task</a>
            </td>
            <td style="padding: 8px; border: 1px solid #ddd; color: {color}; font-weight: bold;">
                {days_open} ngày
            </td>
        </tr>
        """

    html = f"""
    <html>
    <body style="font-family: 'Segoe UI', Helvetica, Arial, sans-serif; line-height: 1.6; color: #24292e; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e4e8; border-radius: 8px;">
        
        <div style="margin-bottom: 24px;">
            <h2 style="font-size: 18px; font-weight: 600; color: #0366d6; margin-top: 0;">
                Thông báo: Danh sách công việc đang chờ xử lý
            </h2>
            <p style="margin: 0;">Xin chào <strong>{member_name}</strong>,</p>
            <p style="margin: 8px 0 0;">Dưới đây là tổng hợp các công việc (Open Issues) đang được gán cho bạn tính đến <strong>09:00 AM hôm nay</strong>:</p>
        </div>

        <table style="border-collapse: collapse; width: 100%; margin-bottom: 24px;">
            <thead>
                <tr style="background-color: #f6f8fa;">
                    <th style="padding: 12px 8px; border: 1px solid #d1d5da; text-align: left; font-size: 13px;">Tên công việc</th>
                    <th style="padding: 12px 8px; border: 1px solid #d1d5da; text-align: center; font-size: 13px; width: 80px;">Liên kết</th>
                    <th style="padding: 12px 8px; border: 1px solid #d1d5da; text-align: left; font-size: 13px; width: 120px;">Thời gian tồn tại</th>
                </tr>
            </thead>
            <tbody style="font-size: 14px;">
                {rows}
            </tbody>
        </table>

        <div style="text-align: center; margin: 30px 0;">
            <a href="https://github.com/orgs/OUHCMC-OUEL/projects/2" 
            style="background-color: #2ea44f; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px; display: inline-block;">
                Truy cập Kanban Board
            </a>
        </div>

        <hr style="border: 0; border-top: 1px solid #e1e4e8; margin: 24px 0;">
        
        <footer style="font-size: 12px; color: #586069; line-height: 1.5;">
            <p style="margin: 0;"><strong>Lưu ý:</strong> Email này được gửi tự động từ hệ thống quản lý dự án.</p>
            <p style="margin: 4px 0;">Vui lòng cập nhật trạng thái trên <i>GitHub Kanban</i> sau khi hoàn thành để đội ngũ nắm bắt tiến độ kịp thời.</p>
            <p style="margin: 15px 0 0;">Chúc bạn một ngày làm việc hiệu quả!</p>
        </footer>
    </body>
    </html>
    """
    return html

def send_email(to_email, subject, html_content, username, password):
    try:
        msg = MIMEMultipart()
        msg['From'] = username
        msg['To'] = to_email
        msg['Subject'] = subject
        msg.attach(MIMEText(html_content, 'html'))

        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.login(username, password)
        server.send_message(msg)
        server.quit()
        logging.info(f"Đã gửi mail thành công cho: {to_email}")
    except Exception as e:
        logging.error(f"Lỗi gửi mail cho {to_email}: {str(e)}")

def main():
    if not is_working_day():
        return

    try:
        GITHUB_TOKEN = get_env("GITHUB_TOKEN")
        EMAIL_USER = get_env("EMAIL_USERNAME")
        EMAIL_PASS = get_env("EMAIL_PASSWORD")
        REPO_NAME = get_env("GITHUB_REPOSITORY")

        auth = Auth.Token(GITHUB_TOKEN)
        g = Github(auth=auth)
        repo = g.get_repo(REPO_NAME)

        open_issues = repo.get_issues(state='open')
 
        user_issues = defaultdict(list)
        for issue in open_issues:
            if issue.assignee:
                user_issues[issue.assignee.login].append(issue)

        for github_user, issues in user_issues.items():
            if github_user in MEMBERS_EMAIL:
                user_info = MEMBERS_EMAIL[github_user]
                subject = f"[Daily Reminder] Danh sách công việc ngày {datetime.now().strftime('%d/%m')}"
                body = create_html_body(user_info['name'], issues)
                
                send_email(user_info['email'], subject, body, EMAIL_USER, EMAIL_PASS)
            else:
                logging.warning(f"User {github_user} có task nhưng chưa cấu hình email trong MEMBERS_EMAIL.")

    except Exception as e:
        logging.error(f"Lỗi script: {str(e)}")

if __name__ == "__main__":
    main()