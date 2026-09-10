from sqlalchemy import Column, String, DateTime
import datetime
from app.db.base import Base

class Practitioner(Base):
    __tablename__ = "practitioners"

    id = Column(String, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    role = Column(String, nullable=False)
    facility_id = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
