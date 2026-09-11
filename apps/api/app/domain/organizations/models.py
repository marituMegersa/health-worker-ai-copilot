from sqlalchemy import Column, String, DateTime
from sqlalchemy.orm import relationship
import datetime
from app.db.base import Base

class Organization(Base):
    __tablename__ = "organizations"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    region = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    facilities = relationship("Facility", back_populates="organization", cascade="all, delete-orphan")
