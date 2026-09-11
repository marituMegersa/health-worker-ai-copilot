from pydantic import BaseModel, Field
from typing import List, Optional
from app.schemas.domain import ClinicalTriageEvalResponse

class TriageSearchQuery(BaseModel):
    category: Optional[str] = Field(None, example="AMBER")
    min_bp: Optional[float] = Field(None, example=130.0)
    page: int = Field(1, ge=1)
    page_size: int = Field(20, ge=1, le=100)

class PaginatedTriageResponse(BaseModel):
    items: List[ClinicalTriageEvalResponse]
    total: int
    page: int
    page_size: int
    total_pages: int
