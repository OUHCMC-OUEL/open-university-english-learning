from pydantic import ValidationError

from .models import PromptLog

class PromptLogManagement:
    @staticmethod
    def create_prompt(validated_data):
        try:
            log = PromptLog.objects.create(**validated_data)
            return log
        except:
            raise ValidationError({"detail": "Có lỗi khi lưu prompt log"})