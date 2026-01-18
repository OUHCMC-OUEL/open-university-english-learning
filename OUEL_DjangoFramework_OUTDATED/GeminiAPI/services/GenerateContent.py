# This is a guide from GeminiAI and I have already validated the code below
import google.generativeai as genai
from django.conf import settings
from GeminiAPI.models import OUELApp
from .normalize_field import normalize_field
import json

genai.configure(api_key=settings.GOOGLE_API_KEY)


def GeminiGenerateContent(user_input, app_id):
    if not isinstance(user_input, str):
        raise "Invalid input data"

    try:
        try:
            app_instance = OUELApp.objects.get(id=app_id)
        except OUELApp.DoesNotExist:
            raise ValueError("App_id không hợp lệ")

        prompt_config = app_instance.prompt_config
        if not prompt_config:
            raise ValueError("App này chưa được cấu hình Prompt")

        full_prompt = f"""
        Role: {prompt_config.prompt_role}
        Instruction: {prompt_config.prompt_instructions}
        constraints: {prompt_config.prompt_constraints}
        Output: {prompt_config.prompt_output}
        User Question: {user_input}
        """

        model = genai.GenerativeModel('gemini-2.5-flash')
        response = model.generate_content(full_prompt)
        result = response.text

        try:
            start = result.find("{")
            end = result.rfind("}") + 1
            if start == -1 or end == 0:

                return {"raw_output": result, "parsed": False}

            json_str = result[start:end]
            data = json.loads(json_str)

            return {
                "result": normalize_field(data.get("result")),
                "vocabulary": normalize_field(data.get("vocabulary")),
                "grammar": normalize_field(data.get("grammar")),
                "coh": normalize_field(data.get("coh")),
                "issues": data.get("issues", [])
            }

        except Exception as e:
            raise ValueError(f"Định dạng JSON không hợp lệ: {str(e)}")

    except Exception as e:
        raise Exception(f"Lỗi xử lý dữ liệu nội bộ: {str(e)}")
