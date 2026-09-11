from datetime import datetime, timedelta
from typing import Any, Union
import hmac
import hashlib
import json
import base64
from app.core.config import settings

def create_access_token(subject: Union[str, Any], expires_delta: timedelta = None) -> str:
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    header = {"alg": "HS256", "typ": "JWT"}
    payload = {"sub": str(subject), "exp": int(expire.timestamp())}
    
    header_bytes = base64.urlsafe_b64encode(json.dumps(header).encode()).rstrip(b'=')
    payload_bytes = base64.urlsafe_b64encode(json.dumps(payload).encode()).rstrip(b'=')
    
    signing_input = header_bytes + b'.' + payload_bytes
    signature = hmac.new(settings.SECRET_KEY.encode(), signing_input, hashlib.sha256).digest()
    signature_bytes = base64.urlsafe_b64encode(signature).rstrip(b'=')
    
    return (signing_input + b'.' + signature_bytes).decode()
