from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey
import datetime
from app.db.base import Base

class Practitioner(Base):
    __tablename__ = "practitioners"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    role = Column(String, nullable=False) # e.g. HEW, Nurse, Midwife, Health Officer
    facility_id = Column(String, ForeignKey("facilities.id"))
    active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
