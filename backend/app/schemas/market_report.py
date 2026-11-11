from datetime import datetime, timezone
from typing import List, Optional, Dict
from pydantic import BaseModel, Field


class CompanyOverview(BaseModel):
    """
    Structured breakdown of company/industry high-level facts.
    Why: Keeps core business fundamentals standardized across reports.
    """
    name: str = Field(..., description="Target company or primary industry name")
    industry: str = Field(..., description="Industry sector or vertical")
    summary: str = Field(..., description="2-3 sentence overview of what the company/industry does")
    business_model: str = Field(..., description="Monetization model (e.g. B2B SaaS, Marketplace, Usage-based)")
    value_proposition: str = Field(..., description="Core value proposition and unfair advantage")
    headquarters: Optional[str] = Field(None, description="Headquarters location or primary geography")
    founded_year: Optional[str] = Field(None, description="Founded year or inception period")
    stage: Optional[str] = Field("Growth", description="Maturity stage (Early, Growth, Mature, Public)")
    key_metrics: Dict[str, str] = Field(
        default_factory=dict,
        description="Key high-level indicators (e.g., Gross Margins, Average Deal Size)"
    )


class Competitor(BaseModel):
    """
    Direct and indirect market competitors.
    Why: Essential for the competitive positioning matrix and feature comparison.
    """
    name: str = Field(..., description="Competitor brand name")
    market_tier: str = Field(..., description="Market Leader, Direct Challenger, or Niche Specialist")
    strengths: List[str] = Field(default_factory=list, description="Top competitive strengths")
    weaknesses: List[str] = Field(default_factory=list, description="Key vulnerabilities or gaps")
    estimated_pricing: str = Field(..., description="Pricing structure (e.g., $49/seat/mo, Enterprise custom)")
    differentiator: str = Field(..., description="Primary differentiator vs the target company")


class MarketSizing(BaseModel):
    """
    TAM, SAM, SOM calculations with interactive baseline figures.
    Why: Allows frontend sliders to recalculate dynamically from real formulas.
    """
    tam_value: float = Field(..., description="Total Addressable Market value in Billions/Millions USD")
    tam_unit: str = Field("$B", description="Unit: '$B' for Billions or '$M' for Millions")
    tam_methodology: str = Field(..., description="How TAM was calculated (top-down or bottom-up)")

    sam_value: float = Field(..., description="Serviceable Addressable Market value")
    sam_unit: str = Field("$B", description="Unit: '$B' or '$M'")
    sam_methodology: str = Field(..., description="Target segment filtering used to derive SAM")

    som_value: float = Field(..., description="Serviceable Obtainable Market (near-term attainable)")
    som_unit: str = Field("$B", description="Unit: '$B' or '$M'")
    som_methodology: str = Field(..., description="Attainable market share assumption")
    default_som_percentage: float = Field(
        2.5,
        description="Assumed target market share percentage of SAM (e.g., 2.5%)"
    )

    cagr_rate: float = Field(..., description="Projected Compound Annual Growth Rate percentage (e.g. 15.4)")
    cagr_period: str = Field("2024-2030", description="Forecast period")
    growth_drivers: List[str] = Field(default_factory=list, description="Key tailwinds driving market expansion")


class SWOTAnalysis(BaseModel):
    """
    Structured 4-quadrant SWOT matrix.
    Why: Visualized directly into 2x2 grid in the UI.
    """
    strengths: List[str] = Field(default_factory=list, description="Internal advantages and core capabilities")
    weaknesses: List[str] = Field(default_factory=list, description="Internal gaps, resource limitations, or technical debt")
    opportunities: List[str] = Field(default_factory=list, description="External macro tailwinds, underserved niches, expansion vectors")
    threats: List[str] = Field(default_factory=list, description="External regulatory risks, commoditization, incumbent response")


class CustomerSegment(BaseModel):
    """
    Ideal Customer Profile (ICP) and buyer personas.
    Why: Grounded product-market fit analysis for go-to-market strategies.
    """
    persona: str = Field(..., description="Segment name (e.g., Enterprise SecOps Leaders, Seed-stage CTOs)")
    description: str = Field(..., description="Profile characteristics and role description")
    pain_points: List[str] = Field(default_factory=list, description="Key operational or strategic frustrations")
    willingness_to_pay: str = Field(..., description="Price sensitivity (Low, Medium, High, Very High)")
    acquisition_channels: List[str] = Field(default_factory=list, description="Primary channels to acquire this segment")


class SourceCitation(BaseModel):
    """
    Grounded source references retrieved from live web research.
    Why: Proves veracity and prevents hallucination claims.
    """
    title: str = Field(..., description="Source article or report title")
    url: str = Field(..., description="Direct link to original source")
    snippet: str = Field(..., description="Key factual excerpt used in analysis")
    domain: str = Field(..., description="Publisher domain (e.g. gartner.com, reuters.com)")


class MarketResearchReport(BaseModel):
    """
    The full composite market research report.
    This schema serves as the contract between the LLM output, SQLite storage,
    and React frontend components.
    """
    id: Optional[str] = None
    query: str = Field(..., description="Original user query / search target")
    created_at: Optional[str] = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    executive_summary: str = Field(..., description="High-impact synthesis for leadership and investors")
    overview: CompanyOverview
    market_sizing: MarketSizing
    competitors: List[Competitor] = Field(default_factory=list)
    swot: SWOTAnalysis
    customer_segments: List[CustomerSegment] = Field(default_factory=list)
    strategic_recommendations: List[str] = Field(
        default_factory=list,
        description="Actionable go-to-market and growth recommendations"
    )
    sources: List[SourceCitation] = Field(
        default_factory=list,
        description="Real verified sources & links gathered during research"
    )


class ResearchRequest(BaseModel):
    """Payload sent by the frontend to trigger research."""
    query: str = Field(..., min_length=2, max_length=200, description="Company or industry name")
    focus: Optional[str] = Field("full", description="Focus area: 'full', 'competitors', or 'tam'")
    provider: Optional[str] = Field(None, description="Optional override: 'openai', 'gemini', 'groq', or 'mock'")
    api_key: Optional[str] = Field(None, description="Optional user-provided API key")


class ReportListItem(BaseModel):
    """Lightweight metadata item for the reports history drawer."""
    id: str
    query: str
    created_at: str
    company_name: str
    industry: str
    tam_summary: str
