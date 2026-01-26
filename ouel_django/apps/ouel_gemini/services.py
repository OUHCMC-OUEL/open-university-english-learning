import time, json
from django.conf import settings
from google import genai
from google.genai import types
from .models import Prompt
from .managers import PromptLogManagement

client = genai.Client(api_key=settings.GOOGLE_API_KEY)

def grammar_correction(user_input: str, prompt: Prompt):
    start_time = time.time()
    model_settings = {}
    response = ""
    status_code = 200
    token_usage = 0

    full_instruction = f"{prompt.instruction}\n\nRules: {prompt.context}"

    if prompt.settings:
        model_settings = prompt.settings

    temperature = model_settings.get('temperature', 0.5)

    try:
        response = client.models.generate_content(
            model=prompt.ai_model.name,
            contents=user_input,
            config=types.GenerateContentConfig(
                system_instruction=full_instruction,
                temperature=temperature,
                response_mime_type="application/json"
            )
        )
        response_text = response.text
        if response.usage_metadata:
            token_usage = response.usage_metadata.total_token_count
        try:
            result = json.loads(response_text)
            return result
        except json.JSONDecodeError:
            status_code = 500
            raise ValueError("AI trả về sai định dạng.")

    except Exception as ex:
        status_code = 500
        raise ex
    finally:
        end_time = time.time()
        validated_data = {
            "prompt": prompt,
            "input": user_input,
            "final_context": full_instruction,
            "response": response,
            "token": token_usage,
            "latency": int((end_time - start_time) * 1000),
            "status": status_code,
        }
        PromptLogManagement.create_prompt(validated_data)