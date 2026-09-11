from datetime import datetime, timedelta
from typing import Any, Union
import hmac, hashlib, json, base64
from app.core.config import settings

def create_access_token(subject: Union[str, Any], expires_delta: timedelta = None) -> str:
    expire = datetime.utcnow() + (expires_delta if expires_delta else timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    header = {"alg": "HS256", "typ": "JWT"}
    payload = {"sub": str(subject), "exp": int(expire.timestamp())}
    header_bytes = base64.urlsafe_b64encode(json.dumps(header).encode()).rstrip(b'=')
    payload_bytes = base64.urlsafe_b64encode(json.dumps(payload).encode()).rstrip(b'=')
    signing_input = header_bytes + b'.' + payload_bytes
    signature = base64.urlsafe_b64encode(hmac.new(settings.SECRET_KEY.encode(), signing_input, hashlib.sha256).digest()).rstrip(b'=')
    return (signing_input + b'.' + signature).decode()
