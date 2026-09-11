import datetime

def format_iso_timestamp(dt: datetime.datetime = None) -> str:
    if dt is None:
        dt = datetime.datetime.utcnow()
    return dt.isoformat() + "Z"
