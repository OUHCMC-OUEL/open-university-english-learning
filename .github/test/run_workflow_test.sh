#!/bin/bash

read -p "Bạn đang đứng ở .github/test ? [Y/N]: " confirm
if [[ "$confirm" != "Y" && "$confirm" != "y" ]]; then
    chmod +x init.sh
    ./init.sh
fi

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
fi

echo "Cài đặt requirements"
if [ -f "test_requirements.txt" ]; then
    pip install -r test_requirements.txt
else
    echo "Không tìm thấy file test_requirements.txt"
fi

if [ -f "test.py" ]; then
    nl=$'\n'
    echo "
Lưu ý: 
1. Nếu có lỗi xảy ra, hãy kiểm tra lại logic code của bạn trước khi push. 
2. Hiện tại, test case đang chạy trên môi trường local của bạn thông qua run_local_test.sh.
3. Nếu có lỗi xảy ra, hãy đọc kỹ thông báo lỗi và kiểm tra lại code của bạn. 
${nl}
    "
    python test.py

    if [ $? -eq 0 ]; then
        echo "Tất cả các test case đều thông qua!"
    else
        echo "Thất bại: Có lỗi xảy ra trong quá trình test."
    fi
else
    echo "Lỗi: Không tìm thấy file 'test.py' để chạy."
fi
