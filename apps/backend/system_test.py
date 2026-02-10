import os
import sys
import pytest
import time

class Colors:
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'

def print_banner():
    print(f"{Colors.CYAN}{Colors.BOLD}")
    print("="*60)
    print("                  DJANGO TESTING UTILITY    " )
    print("="*60)
    print(f"{Colors.ENDC}")

def main():
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.development")
    
    print_banner()
    print(f"{Colors.HEADER}Chọn chế độ kiểm thử unit test:{Colors.ENDC}")
    print("1. Fast Test (Bỏ qua migrations, dùng lại DB cũ)")
    print("2. Full Test (Chạy migrations từ đầu)")
    print("3. Coverage Report (Xem độ phủ unit test)")
    print("4. Re-run Failed (Chạy lại các test vừa bị lỗi)")
    print("5. Kiểm thử clean-code (radon)")
    print("6. Kiểm thử bảo mật (bandit)")
    print("0. Thoát")
    print("-" * 60)

    try:
        choice = input(f"{Colors.GREEN}Nhập lựa chọn (1-6): {Colors.ENDC}").strip()
    except KeyboardInterrupt:
        sys.exit(0)

    args = []
    
    if choice == '1':
        print(f"\n{Colors.WARNING}>>> Đang chạy Fast Test...{Colors.ENDC}")
        args = ["-v", "--nomigrations", "--reuse-db"]
        
    elif choice == '2':
        print(f"\n{Colors.BLUE}>>> Đang chạy Full Test System...{Colors.ENDC}")
        args = ["-v"]
        
    elif choice == '3':
        print(f"\n{Colors.CYAN}>>> Đang tính toán độ phủ code (Coverage)...{Colors.ENDC}")
        args = ["--cov=apps", "--cov-report=term-missing"]
        
    elif choice == '4':
        print(f"\n{Colors.FAIL}>>> Đang chạy lại các test bị lỗi (Last Failed)...{Colors.ENDC}")
        args = ["-v", "--lf"]    

    elif choice == '5':
        print(f"\n{Colors.HEADER}>>> Đang kiểm thử clean-code với radon...{Colors.ENDC}")
        print(f"{Colors.CYAN}Cyclomatic Complexity Report:{Colors.ENDC}")
        os.system("radon cc apps/ -s -a")
        print(f"\n{Colors.CYAN}Maintainability Index Report:{Colors.ENDC}")
        os.system("radon mi apps/ -s")
        sys.exit(0)
    
    elif choice == '6':
        print(f"\n{Colors.HEADER}>>> Đang kiểm thử bảo mật với bandit...{Colors.ENDC}")
        os.system("bandit -r apps/ -x tests")
        sys.exit(0)

    elif choice == '0':
        sys.exit(0)
    else:
        print("Lựa chọn mặc định: Fast Test")
        args = ["-v", "--nomigrations", "--reuse-db"]

    start_time = time.time() 
    exit_code = pytest.main(args + ["."])    
    end_time = time.time()
    duration = end_time - start_time

    if exit_code == 0:
        print(f"{Colors.GREEN}{Colors.BOLD} NGỦ NGON RỒI - Tất cả tests passed! ({duration:.2f} giây){Colors.ENDC}")
    else:
        print(f"{Colors.FAIL}{Colors.BOLD}>>> MẤT NGỦ RỒI - Có lỗi trong tests! ({duration:.2f} giây){Colors.ENDC}")
    
    sys.exit(exit_code)

if __name__ == "__main__":
    main()