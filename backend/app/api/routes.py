import json
from typing import List
from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.report import ReportModel
from app.schemas.market_report import (
    ResearchRequest,
    MarketResearchReport,
    ReportListItem
)
from app.services.research_orchestrator import ResearchOrchestrator
from app.services.pdf_service import PDFExportService

router = APIRouter(prefix="/api", tags=["Market Research"])


@router.get("/health", status_code=status.HTTP_200_OK)
def health_check():
    """
    Health check endpoint for deployment monitoring, Docker healthchecks, and uptime pings.
    """
    return {"status": "ok", "service": "MarketLens API"}


@router.post("/research/generate", response_model=MarketResearchReport, status_code=status.HTTP_201_CREATED)
def generate_research(request: ResearchRequest, db: Session = Depends(get_db)):
    """
    Trigger comprehensive market research for a target company or industry.
    1. Executes live web grounding
    2. Synthesizes structured data using the LLM adapter
    3. Persists report to database
    4. Returns strictly-typed JSON schema
    """
    orchestrator = ResearchOrchestrator(db=db)
    try:
        report = orchestrator.run_research_pipeline(request)
        return report
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Research generation pipeline error: {str(e)}"
        )


@router.get("/reports", response_model=List[ReportListItem])
def list_reports(db: Session = Depends(get_db)):
    """
    Fetch history of previously generated reports for the sidebar drawer.
    Uses lightweight projection for fast network payload.
    """
    records = db.query(ReportModel).order_by(ReportModel.created_at.desc()).all()
    results = []
    for r in records:
        results.append(
            ReportListItem(
                id=r.id,
                query=r.query,
                created_at=r.created_at.isoformat(),
                company_name=r.company_name,
                industry=r.industry,
                tam_summary=r.tam_summary or "N/A"
            )
        )
    return results


@router.get("/reports/{report_id}", response_model=MarketResearchReport)
def get_report_by_id(report_id: str, db: Session = Depends(get_db)):
    """
    Retrieve full structured report by ID.
    """
    record = db.query(ReportModel).filter(ReportModel.id == report_id).first()
    if not record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Report not found")
    
    report_dict = json.loads(record.data_json)
    return MarketResearchReport.model_validate(report_dict)


@router.delete("/reports/{report_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_report(report_id: str, db: Session = Depends(get_db)):
    """
    Delete a saved report from history.
    """
    record = db.query(ReportModel).filter(ReportModel.id == report_id).first()
    if not record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Report not found")
    
    db.delete(record)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.get("/reports/{report_id}/export-pdf")
def export_report_pdf(report_id: str, db: Session = Depends(get_db)):
    """
    Generate and stream an executive-styled PDF report download.
    """
    record = db.query(ReportModel).filter(ReportModel.id == report_id).first()
    if not record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Report not found")
    
    report_dict = json.loads(record.data_json)
    report = MarketResearchReport.model_validate(report_dict)

    pdf_service = PDFExportService()
    pdf_bytes = pdf_service.generate_pdf(report)

    filename = f"MarketLens_{report.overview.name.replace(' ', '_')}_Report.pdf"
    
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f'attachment; filename="{filename}"'
        }
    )
