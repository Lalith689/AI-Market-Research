import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.schemas.market_report import ResearchRequest, MarketResearchReport
from app.services.llm_service import LLMService
from app.services.search_service import SearchService
from app.services.pdf_service import PDFExportService

client = TestClient(app)


def test_health_check():
    """Verify system health endpoint responds."""
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_search_service_fallback():
    """Verify search service returns citations even if external web is simulated."""
    service = SearchService()
    citations = service.search_market_context("Notion")
    assert len(citations) >= 1
    assert citations[0].url.startswith("http")
    assert len(citations[0].title) > 0


def test_llm_service_mock_generation():
    """Verify LLM service generates valid MarketResearchReport without errors."""
    llm = LLMService()
    search = SearchService()
    citations = search.search_market_context("Linear")
    report = llm.generate_market_report("Linear", citations)

    assert isinstance(report, MarketResearchReport)
    assert report.overview.name != ""
    assert report.market_sizing.tam_value > 0
    assert len(report.competitors) >= 1
    assert len(report.swot.strengths) >= 1
    assert len(report.swot.weaknesses) >= 1


def test_pdf_generation():
    """Verify PDF export service compiles binary PDF without crashing."""
    llm = LLMService()
    search = SearchService()
    citations = search.search_market_context("Stripe")
    report = llm.generate_market_report("Stripe", citations)
    report.id = "test-123"

    pdf_service = PDFExportService()
    pdf_bytes = pdf_service.generate_pdf(report)

    assert isinstance(pdf_bytes, bytes)
    assert pdf_bytes.startswith(b"%PDF")  # Standard PDF magic header


def test_api_generate_and_fetch():
    """Integration test: Generate report via API, verify in history, and fetch PDF."""
    payload = {"query": "Figma", "focus": "full"}
    gen_res = client.post("/api/research/generate", json=payload)
    assert gen_res.status_code == 201
    data = gen_res.json()
    report_id = data["id"]
    assert data["overview"]["name"] != ""

    # Verify report is listed in history
    hist_res = client.get("/api/reports")
    assert hist_res.status_code == 200
    ids = [item["id"] for item in hist_res.json()]
    assert report_id in ids

    # Verify PDF export endpoint
    pdf_res = client.get(f"/api/reports/{report_id}/export-pdf")
    assert pdf_res.status_code == 200
    assert pdf_res.headers["content-type"] == "application/pdf"
