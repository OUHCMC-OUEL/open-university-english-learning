#!/bin/bash

read -p "Bạn đã khởi tạo môi trường ảo và cài đặt dependencies chưa? [Y/N]: " confirm
if [[ "$confirm" != "Y" && "$confirm" != "y" ]]; then
    chmod +x init.sh
    ./init.sh
fi

read -p "Bạn chắc chắn muốn chạy ứng dụng? [Y/N]: " confirm
if [[ "$confirm" != "Y" && "$confirm" != "y" ]]; then
    echo "Hủy bỏ khởi động ứng dụng."
    exit 1
fi

if [ -f "venv/Scripts/activate" ]; then
    source venv/Scripts/activate
elif [ -f "venv/bin/activate" ]; then
    source venv/bin/activate
else
    echo "Không tìm thấy file kích hoạt venv."
    exit 1
fi

if [ -d "backend" ]; then
    cd backend
elif [ -d "apps/backend" ]; then
    cd apps/backend
else
    echo "Không tìm thấy thư mục backend."
    exit 1
fi

echo "Khởi động Django"
python manage.py runserver &
DJANGO_PID=$!
trap "kill $DJANGO_PID" EXIT INT TERM

cd ../frontend 
echo "Khởi động Frontend"
if grep -q "\"dev\":" package.json; then
    npm run dev
else
    npm start
fi

cd ../