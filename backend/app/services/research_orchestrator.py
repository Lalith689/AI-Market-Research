import json
import uuid
from datetime import datetime, timezone
from typing import Optional
from sqlalchemy.orm import Session
from app.schemas.market_report import ResearchRequest, MarketResearchReport
from app.services.search_service import SearchService
from app.services.llm_service import LLMService
from app.models.report import ReportModel


class ResearchOrchestrator:
    """
    Core Research Pipeline Orchestrator.
    
    Why this file exists:
    In clean architecture, we maintain separation of concerns:
    - SearchService knows ONLY how to fetch web data.
    - LLMService knows ONLY how to prompt the model.
    - Database models know ONLY how to persist tables.
    
    The Orchestrator is the conductor:
    1. Coordinates the multi-step research pipeline.
    2. Enforces fault-tolerant transitions between search, AI generation, and persistence.
    3. Handles data transformation between Pydantic domain models and SQLAlchemy persistence models.
    """

    def __init__(self, db: Optional[Session] = None):
        self.db = db
        self.search_service = SearchService()
        self.llm_service = LLMService()

    def run_research_pipeline(self, request: ResearchRequest) -> MarketResearchReport:
        query = request.query.strip()
        report_id = str(uuid.uuid4())
        created_at = datetime.now(timezone.utc).isoformat()

        # Step 1: Live Web Search Grounding
        citations = self.search_service.search_market_context(query)

        # Step 2: LLM Synthesis with JSON Schema validation
        report = self.llm_service.generate_market_report(
            query=query,
            citations=citations,
            provider_override=request.provider,
            api_key_override=request.api_key
        )
        report.id = report_id
        report.created_at = created_at

        # Step 3: Database Persistence (if session is provided)
        if self.db:
            db_record = ReportModel(
                id=report.id,
                query=report.query,
                company_name=report.overview.name,
                industry=report.overview.industry,
                tam_summary=f"${report.market_sizing.tam_value}B TAM",
                data_json=report.model_dump_json(),
                created_at=datetime.now(timezone.utc)
            )
            self.db.add(db_record)
            self.db.commit()
            self.db.refresh(db_record)

        return report

