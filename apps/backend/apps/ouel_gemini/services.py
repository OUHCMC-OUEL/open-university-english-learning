import time, json, logging
from django.conf import settings
from google import genai
from google.genai import types
from rest_framework.exceptions import ValidationError, APIException 
from typing import List, Optional, Any, Dict, TypedDict
from .models import Prompt, AIModel
from .managers import PromptLogManagement

logger = logging.getLogger(__name__)

class NoKeysAvailable(APIException):
    status_code = 503
    default_detail = 'Hệ thống đang quá tải. Vui lòng thử lại sau.'
    default_code = 'service_unavailable'

class AIServiceResult(TypedDict):
    result: Dict[str, Any]
    token_usage: int
    latency: int

class GeminiClientWrapper:  
    @staticmethod
    def get_api_keys() -> List[str]:
        keys = getattr(settings, 'GOOGLE_API_KEYS', [])

        if not keys:
            single_key = getattr(settings, 'GOOGLE_API_KEY', None)
            if single_key:
                return [single_key]
            raise ValueError("GOOGLE_API_KEYS chưa được cấu hình trong settings.")
        return keys

    @classmethod
    def generate_content(cls, model_name: str, contents: str, system_instruction: Optional[str] = None, 
                         temperature: float = 0.5, response_mime_type: str = "text/plain") -> types.GenerateContentResponse:
        api_keys = cls.get_api_keys()
        last_exception = None

        for index, api_key in enumerate(api_keys):
            try:
                client = genai.Client(api_key=api_key)

                config = types.GenerateContentConfig(
                    temperature=temperature,
                    response_mime_type=response_mime_type
                )
                
                if system_instruction:
                    config.system_instruction = system_instruction

                response = client.models.generate_content(
                    model=model_name,
                    contents=contents,
                    config=config
                )

                return response

            except Exception as e:
                error_str = str(e).lower()
                is_auth_error = "403" in error_str or "permission" in error_str or "invalid" in error_str
                is_quota_error = "429" in error_str or "quota" in error_str or "resource exhausted" in error_str

                if is_auth_error or is_quota_error:
                    logger.warning(f"Key ***{api_key[-4:]} failed (Index {index}). Error: {e}. Switching to next key...")
                    last_exception = e
                    continue 
                else:                 
                    logger.error(f"Lỗi không xác định  ***{api_key[-4:]}: {e}")
                    last_exception = e
                    continue

        logger.critical("Không còn keys nào khả dụng.")
        if last_exception:
            logger.error(f"Lỗi gần đây nhất: {last_exception}")
        
        raise NoKeysAvailable()

def clean_parse_json(raw_text: str) -> Dict[str, Any]:
    cleaned = raw_text.strip()
    if cleaned.startswith("```"):
        cleaned = cleaned.replace("```json", "").replace("```", "").strip()   
    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        logger.error(f"JSON Decode Error. Content: {raw_text[:200]}")
        raise ValueError("AI trả về sai định dạng dữ liệu.")

def write_log_prompt(prompt: Prompt, user_input: str, full_instruction: str, 
                      response_text: str, token: int, latency: int, status_code: int):
    try:
        data = {
            "prompt": prompt,
            "input": user_input,
            "final_context": full_instruction,
            "response": response_text,
            "token": token,
            "latency": latency,
            "status": status_code,
        }
        PromptLogManagement.create_prompt(data)
    except Exception as e:
        logger.error(f"Failed to write PromptLog: {e}")

def run_prompt_flow(user_input: str, prompt: Prompt, prompt_vars: dict = None) -> Dict[str, Any]:
    start_time = time.time()
    status_code = 200
    token_usage = 0
    response_text = ""

    settings_dict = prompt.settings or {}
    temperature = settings_dict.get('temperature', 0.5)
    model_name = prompt.ai_model.name if prompt.ai_model else "gemini-2.5-flash"
    
    full_instruction = f"{prompt.instruction}\n\nContext: {prompt.context}"

    content_payload = user_input
    if prompt_vars:
        pass 

    try:
        response = GeminiClientWrapper.generate_content(
            model_name=model_name,
            contents=content_payload,
            system_instruction=full_instruction,
            temperature=temperature,
            response_mime_type="application/json"
        )
        
        response_text = response.text
        if response.usage_metadata:
            token_usage = response.usage_metadata.total_token_count

        return clean_parse_json(response_text)

    except Exception as e:
        status_code = 500 if not isinstance(e, NoKeysAvailable) else 503
        response_text = str(e)
        raise e
        
    finally:
        latency = int((time.time() - start_time) * 1000)
        write_log_prompt(
            prompt=prompt,
            user_input=str(user_input)[:5000], 
            full_instruction=full_instruction,
            response_text=response_text,
            token=token_usage,
            latency=latency,
            status_code=status_code
        )

def grammar_correction(user_input: str, prompt: Prompt) -> Dict[str, Any]:
    return run_prompt_flow(user_input, prompt)

def highlight_passage(passage: str, question: str):
    prompt_content = f"""
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
    # Hard code
    model = AIModel.objects.filter(name='gemini-2.5-flash').first()
    prompt, created = Prompt.objects.get_or_create(
        name="Highlight Passage Prompt (Auto-generated)", 
        defaults={
            "version": 1,
            "instruction": prompt_content, 
            "context": "Context mặc định cho highlight",
            "ai_model": model,
            "active": True
        }
    )

    return run_prompt_flow("", prompt)
