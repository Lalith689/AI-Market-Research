import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime, Text
from app.core.database import Base


class ReportModel(Base):
    """
    SQLAlchemy Database Model for Storing Research Reports.
    
    Why this file exists:
    Decouples persistent database storage from in-memory Pydantic schemas.
    - Pydantic models (in schemas/) define input/output data shapes and validation.
    - SQLAlchemy models (in models/) define database table schemas and disk persistence.
    
    Storing the report payload as structured JSON (`data_json`) allows us to store complex,
    nested market research models (SWOT arrays, competitor matrices, citations) without needing
    10 separate join tables, while still keeping indexed columns (id, query, company_name, created_at)
    for fast lookups and history filtering.
    """
    __tablename__ = "reports"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    query = Column(String(255), nullable=False, index=True)
    company_name = Column(String(255), nullable=False, index=True)
    industry = Column(String(255), nullable=False)
    tam_summary = Column(String(100), nullable=True)
    
    # Stores the complete validated MarketResearchReport JSON
    data_json = Column(Text, nullable=False)
    
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)


    def __repr__(self):
        return f"<Report {self.company_name} ({self.industry}) - {self.id}>"
