#!/usr/bin/env python
import os
import sys
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR/'.env')
config_mode = os.getenv("CONFIG_MODE")

def validate():
    if not config_mode:
        raise ImportError("Vui lòng cấu hình config_mode trong file env")

def main():
    validate()
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", config_mode)
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)

if __name__ == "__main__":
    main()
