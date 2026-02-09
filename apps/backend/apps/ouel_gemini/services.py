import time, json, itertools
from django.conf import settings
from google import genai
from google.genai import types
from rest_framework.exceptions import ValidationError
from .models import Prompt
from .managers import PromptLogManagement

api_key_cycle = itertools.cycle(settings.GOOGLE_API_KEYS)
MAX_RETRY = len(settings.GOOGLE_API_KEYS)
# client = genai.Client(api_key=settings.GOOGLE_API_KEY)

def get_client():
    api_key = next(api_key_cycle)
    print (api_key)
    return genai.Client(api_key=api_key)

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
        for _ in range(MAX_RETRY):
            client = get_client()
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
        raise ValidationError("Tất cả API key đã vượt giới hạn.")
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

def highlight_passage(passage,question):
    prompt = f"""
                You are an AI powered answer suggestion system. Your task is to find the consecutive and complete text range in the provided Passage that suggests the answer to the Question.

                Passage:
                "{passage}"

                Question:
                "{question}"

                Your task:
                1. Identify the most accurate consecutive text range that suggests the correct answer in the passage.
                2. Calculate the start and end index based on the characters of the extracted text compared to the provided Passage above.
                3. Output only one JSON object.

                The JSON format must be strictly followed:
                {{
                    "answerText": "exact suggested text range copied from the Passage",
                    "startIndex": number,
                    "endIndex": number
                }}

                Rule:
                - Do not add, delete or change any characters in "answerText". The text in "answerText" must exactly match the Paragraph section and have at least 2 sentences.
                - Do not return additional text outside of JSON.
                """
    for _ in range(MAX_RETRY):
        client = get_client()
        try:
            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt
            )
            text = response.text.strip().replace("```json", "").replace("```", "").strip()
            return json.loads(text)
        except Exception as e:
            raise ValidationError(e)
    raise ValidationError("AI đang quá tải, vui lòng thử lại sau.")