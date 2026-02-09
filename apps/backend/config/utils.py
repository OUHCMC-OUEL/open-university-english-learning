import os, re

def get_keys_by_pattern(pattern):
    api_keys = []
    regex = re.compile(pattern, re.IGNORECASE)
    
    for key, value in os.environ.items():
        if regex.match(key):
            clean_value = value.strip()
            if clean_value:
                api_keys.append(clean_value)
    
    return list(set(api_keys)) 