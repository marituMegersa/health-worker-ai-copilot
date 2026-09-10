from sqlalchemy import Column, String, DateTime, ForeignKey
import datetime
from app.db.base import Base

class Facility(Base):
    __tablename__ = "facilities"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    facility_type = Column(String, nullable=False)
    organization_id = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
