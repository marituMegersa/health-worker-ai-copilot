from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Optional
from app.models.domain import ClinicalTriageRecord

class ClinicalTriageRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_id(self, record_id: str) -> Optional[ClinicalTriageRecord]:
        result = await self.db.execute(select(ClinicalTriageRecord).where(ClinicalTriageRecord.id == record_id))
        return result.scalars().first()

    async def get_multi(self, skip: int = 0, limit: int = 50) -> List[ClinicalTriageRecord]:
        result = await self.db.execute(select(ClinicalTriageRecord).offset(skip).limit(limit))
        return result.scalars().all()

    async def create(self, record: ClinicalTriageRecord) -> ClinicalTriageRecord:
        self.db.add(record)
        await self.db.commit()
        await self.db.refresh(record)
        return record
