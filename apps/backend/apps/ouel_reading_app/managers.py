from pydantic import ValidationError
from .models import PartHistory, UserAnswer

class PartHistoryManager:
    @staticmethod
    def create_part_history(part_history_data):
        try:
            part_history = PartHistory.objects.create(**part_history_data)
            return part_history
        except:
            raise ValidationError({"Lỗi trong quá trình tạo part_history"})

class UserAnswerManager:
    @staticmethod
    def create_user_answer(part_history, data):
        try:
            UserAnswer.objects.bulk_create([
                UserAnswer(part_history=part_history, **ans)
                for ans in data['answers']
            ])
            return UserAnswer
        except:
            raise ValidationError({"detail": "Lỗi trong quá trình tạo part_history"})