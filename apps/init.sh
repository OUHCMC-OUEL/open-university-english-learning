#!/bin/bash

echo "=== Chạy khởi tạo ==="

if [ ! -d "venv" ]; then
    echo "Tạo môi trường venv"
    python -m venv venv
else
    echo "Đã có môi trường ảo."
fi

if [ -f "venv/Scripts/activate" ]; then
    source venv/Scripts/activate
elif [ -f "venv/bin/activate" ]; then
    source venv/bin/activate
else
    echo "Lỗi khi chạy venv"
    exit 1
fi

cd backend

echo "Cài đặt requirements"
if [ -f "requirements.txt" ]; then
    pip install -r requirements.txt
elif [ -f "requirements/base.txt" ]; then
    pip install -r requirements/base.txt
    if [ -f "requirements/development.txt" ]; then
        pip install -r requirements/development.txt
    fi
    if [ -f "requirements/production.txt" ]; then
        pip install -r requirements/production.txt
    fi
else
    echo "Không tìm thấy file requirements"
fi

read -p "Bạn đã cấu hình env và tạo csdl trong MySQL? [Y/N]: " confirm
if [[ "$confirm" == "Y" || "$confirm" == "y" ]]; then
    echo "Migrate cơ sở dữ liệu..."
    python manage.py migrate

    echo "Nap dữ liệu mẫu"
    python manage.py loaddata data.json

    echo "Khởi tạo Frontend"
    cd ../frontend
    npm install

else
    echo "Vui lòng cấu hình env và tạo csdl dưới MySQL trước khi chạy ứng dụng."
    cd ../
fi
