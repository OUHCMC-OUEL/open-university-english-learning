from .models import Part, Question, PartType
from django.db.models import Count

def get_random_part_type(part_type:str) -> Part:
    part = Part.objects.none()
    if part_type in PartType.values:
        part = Part.objects.filter(type_part=part_type).order_by('?').first()
    if part:
        return part
    raise ValueError({'error': 'Không có part nào'})

def get_random_part() -> Part:
    part= Part.objects.order_by('?').first()
    if part:
        return part
    raise ValueError({'error': 'Không có part nào'})

def get_part_by_id(part_id: int) -> Part:
    return Part.objects.get(id=part_id)

def get_type_parts(part_type:str):
    if part_type not in PartType.values:
        raise ValueError({"error": "Type không hợp lệ"})
    parts = Part.objects.filter(type_part=part_type).annotate(question_count=Count("question"))
    if parts:
        return parts
    return None
def get_all_parts():
    parts = Part.objects.all().annotate(question_count=Count("question"))
    if parts:
        return parts
    return None


def get_questions_by_part(part: Part):
    return Question.objects.filter(part=part)