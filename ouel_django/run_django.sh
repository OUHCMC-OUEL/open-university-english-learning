#!/bin/bash
set -e
cd "../"

echo "=== Kiểm tra và khởi tạo môi trường ảo ==="
if [ ! -d "venv" ]; then
    python -m venv venv || python3 -m venv venv
fi

echo "=== Kích hoạt môi trường ảo ==="
if [ -f "venv/Scripts/activate" ]; then
    source venv/Scripts/activate
elif [ -f "venv/bin/activate" ]; then
    source venv/bin/activate
else
    echo "Có lỗi xảy ra"
    exit 1
fi

echo "=== Cài đặt và cập nhật thư viện ==="
cd ouel_django
pip install --upgrade pip
pip install -r requirements/requirements.txt

echo "=== Thực thi migrate cơ sở dữ liệu ==="
python manage.py migrate

echo "=== Khởi chạy server Django ==="
python manage.py runserver