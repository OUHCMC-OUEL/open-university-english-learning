#Xử lý backend
if [ -f "venv/Scripts/activate" ]; then
    echo "Đã cài đặt môi trường ảo"
else
    echo "Chưa cài đặt môi trường ảo"
    echo "Tiến hành cài đặt môi trường ảo"
    python -m venv venv
fi

source venv/Scripts/activate

cd OUEL_DjangoFramework || exit
pip install -r requirements.txt

if python manage.py migrate; then
    echo "Migrate thành công"
    python manage.py loaddata data.json

    echo "=== Tạo superuser ==="
    export DJANGO_SUPERUSER_USERNAME=admin
    export DJANGO_SUPERUSER_EMAIL=admin@example.com
    export DJANGO_SUPERUSER_PASSWORD=Admin@123

    python manage.py createsuperuser --no-input || echo "SuperUser đã tồn tại!"

    #Xử lý frontend
    cd ../OUEL_ViteFramework || exit
    npm install

    echo "Giờ bạn có thể chạy project bằng lệnh:"
    echo "Backend: cd OUEL_DjangoFramework && python manage.py runserver"
    echo "Frontend: cd OUEL_ViteFramework && npm run dev"
else
    echo "Lỗi khi migrate, vui lòng kiểm tra cấu hình Database!"
fi

