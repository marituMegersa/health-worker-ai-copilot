import datetime
def format_iso_timestamp(dt: datetime.datetime = None) -> str:
    return (dt or datetime.datetime.utcnow()).isoformat() + 'Z'
