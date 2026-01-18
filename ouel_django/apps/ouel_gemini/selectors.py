from .models import Prompt

def get_active_prompt(name: str) -> Prompt:
    prompt = Prompt.objects.filter(name=name, active=True).order_by('-version').first()
    if prompt:
        return prompt

    raise ValueError(f"Không tìm thấy Prompt phù hợp cho model: {name}")
