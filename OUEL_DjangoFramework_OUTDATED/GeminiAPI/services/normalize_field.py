import json

def normalize_field(field):
    if field is None:
        return None

    if isinstance(field, str):
        return field

    if isinstance(field, list):
        out = []
        for item in field:
            if isinstance(item, (dict, list)):
                # chuyển dict/list thành JSON string
                try:
                    out.append(json.dumps(item, ensure_ascii=False))
                except:
                    out.append(str(item))
            else:
                out.append(str(item))
        return "\n".join(out)

    # Dict → JSON string
    if isinstance(field, dict):
        try:
            return json.dumps(field, ensure_ascii=False)
        except:
            return str(field)

    # Kiểu khác → ép string
    return str(field)


