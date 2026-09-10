from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey
import datetime
from app.db.base import Base

class Facility(Base):
    __tablename__ = "facilities"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    organization_id = Column(String, ForeignKey("organizations.id"))
    woreda = Column(String, nullable=False)
    region = Column(String, nullable=False)
    active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
