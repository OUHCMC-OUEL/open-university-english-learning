from .managers import PartHistoryManager, UserAnswerManager
from .models import PartHistory, UserAnswer, Part

def submit_part_history(*,data: dict,part:Part) -> PartHistory:
    part_history_data = {
        "part": part,
        "user_id": data['user_id'],
        "total_answers": data['total_answers'],
        "correct_answers": data['correct_answers'],
        "score": data['score'],
        "time": data['time'],
    }
    part_history = PartHistoryManager.create_part_history(part_history_data)

    if part_history:
        UserAnswerManager.create_user_answer(part_history=part_history, data=data)

    # for ans in data['answers']:
    # UserAnswer.objects.create(
    #     part_history=part_history,
    #     **ans
    # )

    return part_history