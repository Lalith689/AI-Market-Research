import json
import logging
from typing import Dict, Any, List
from app.core.config import get_settings
from app.schemas.market_report import (
    MarketResearchReport,
    CompanyOverview,
    Competitor,
    MarketSizing,
    SWOTAnalysis,
    CustomerSegment,
    SourceCitation
)

logger = logging.getLogger(__name__)


class LLMService:
    """
    LLM Integration Adapter.
    
    Why this file exists:
    Decouples the core market research orchestration from specific LLM vendors (OpenAI, Gemini).
    By implementing the 'Adapter Pattern':
    1. We can switch between OpenAI, Gemini, or local models via a single config line.
    2. We provide a deterministic 'Mock Engine' that produces hyper-realistic structured
       data offline without needing paid API keys. This makes your GitHub repository
       100% testable by anyone cloning it.
    3. Structured Outputs: We enforce JSON schema responses to guarantee data shapes.
    """

    def __init__(self):
        self.settings = get_settings()

    def generate_market_report(
        self,
        query: str,
        citations: List[SourceCitation]
    ) -> MarketResearchReport:
        """
        Synthesizes grounded market research into a strongly-typed Pydantic model.
        """
        provider = self.settings.LLM_PROVIDER.lower()

        if provider == "openai" and self.settings.OPENAI_API_KEY:
            try:
                return self._call_openai(query, citations)
            except Exception as e:
                logger.error(f"OpenAI generation failed: {e}. Falling back to intelligent mock generator.")
                return self._generate_intelligent_mock(query, citations)

        elif provider == "gemini" and self.settings.GEMINI_API_KEY:
            try:
                return self._call_gemini(query, citations)
            except Exception as e:
                logger.error(f"Gemini generation failed: {e}. Falling back to intelligent mock generator.")
                return self._generate_intelligent_mock(query, citations)

        # Default fallback / mock mode
        return self._generate_intelligent_mock(query, citations)

    def _call_openai(self, query: str, citations: List[SourceCitation]) -> MarketResearchReport:
        """Invokes OpenAI with JSON-object structured response formatting."""
        from openai import OpenAI
        client = OpenAI(api_key=self.settings.OPENAI_API_KEY)

        grounding_text = "\n\n".join(
            [f"Source [{c.domain}]: {c.title}\n{c.snippet}" for c in citations]
        )

        prompt = f"""
You are an elite management consultant and market research analyst (ex-McKinsey / Sequoia).
Generate a comprehensive, highly rigorous market research report on: "{query}".

Utilize the following live web grounding intel when available:
{grounding_text}

You MUST return a valid JSON object strictly matching this schema structure:
{{
  "query": "{query}",
  "executive_summary": "Thorough 2-3 paragraph executive summary with macro context",
  "overview": {{
    "name": "Target Company or Sector Name",
    "industry": "Industry vertical",
    "summary": "Concise summary",
    "business_model": "Monetization model",
    "value_proposition": "Core differentiated value proposition",
    "headquarters": "Location or N/A",
    "founded_year": "Year or N/A",
    "stage": "Growth / Mature / Early / Public",
    "key_metrics": {{"Key 1": "Value 1", "Key 2": "Value 2"}}
  }},
  "market_sizing": {{
    "tam_value": 45.0,
    "tam_unit": "$B",
    "tam_methodology": "Clear formulaic explanation of Total Addressable Market calculation",
    "sam_value": 12.5,
    "sam_unit": "$B",
    "sam_methodology": "Clear explanation of Serviceable Addressable Market criteria",
    "som_value": 0.85,
    "som_unit": "$B",
    "som_methodology": "Target market share calculation assumptions",
    "default_som_percentage": 2.5,
    "cagr_rate": 18.2,
    "cagr_period": "2024-2030",
    "growth_drivers": ["Driver 1", "Driver 2", "Driver 3"]
  }},
  "competitors": [
    {{
      "name": "Competitor Name",
      "market_tier": "Market Leader / Challenger / Niche",
      "strengths": ["Strength 1", "Strength 2"],
      "weaknesses": ["Weakness 1", "Weakness 2"],
      "estimated_pricing": "Pricing model & tiers",
      "differentiator": "How they differentiate"
    }}
  ],
  "swot": {{
    "strengths": ["Strengths list"],
    "weaknesses": ["Weaknesses list"],
    "opportunities": ["Opportunities list"],
    "threats": ["Threats list"]
  }},
  "customer_segments": [
    {{
      "persona": "Persona title",
      "description": "Profile details",
      "pain_points": ["Pain 1", "Pain 2"],
      "willingness_to_pay": "High / Medium / Low",
      "acquisition_channels": ["Channel 1", "Channel 2"]
    }}
  ],
  "strategic_recommendations": [
    "Actionable Strategic Recommendation 1",
    "Actionable Strategic Recommendation 2",
    "Actionable Strategic Recommendation 3"
  ]
}}
"""

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            response_format={"type": "json_object"},
            messages=[
                {"role": "system", "content": "You are a senior market research analyst who outputs only valid JSON conforming strictly to the requested schema."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.4
        )

        raw_json = json.loads(response.choices[0].message.content)
        report = MarketResearchReport.model_validate(raw_json)
        report.sources = citations
        return report

    def _call_gemini(self, query: str, citations: List[SourceCitation]) -> MarketResearchReport:
        """Invokes Google Gemini with JSON output mode."""
        import httpx
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={self.settings.GEMINI_API_KEY}"
        grounding_text = "\n\n".join(
            [f"Source [{c.domain}]: {c.title}\n{c.snippet}" for c in citations]
        )
        prompt = f"""Generate a structured JSON market research report for '{query}'.
Grounding: {grounding_text}
Output JSON matching the keys: query, executive_summary, overview, market_sizing, competitors, swot, customer_segments, strategic_recommendations."""

        payload = {
            "contents": [{"parts": [{"text": prompt}]}],
            "generationConfig": {"response_mime_type": "application/json"}
        }

        with httpx.Client(timeout=30.0) as client:
            resp = client.post(url, json=payload)
            resp.raise_for_status()
            data = resp.json()
            text_response = data["candidates"][0]["content"]["parts"][0]["text"]
            raw_json = json.loads(text_response)
            report = MarketResearchReport.model_validate(raw_json)
            report.sources = citations
            return report

    def _generate_intelligent_mock(
        self,
        query: str,
        citations: List[SourceCitation]
    ) -> MarketResearchReport:
        """
        Procedural, realistic research generator.
        Provides rich, domain-aware reports immediately out of the box,
        ensuring smooth local developer testing without requiring external API keys.
        """
        clean_target = query.strip().title()
        q_lower = query.lower()

        # Context-aware heuristics based on common market types
        if any(term in q_lower for term in ["ai", "copilot", "llm", "agent", "code"]):
            industry = "Artificial Intelligence & Developer Tools"
            tam_val, sam_val, som_val = 68.4, 18.2, 1.45
            cagr = 28.5
            competitors = [
                Competitor(
                    name="GitHub Copilot (Microsoft)",
                    market_tier="Market Leader",
                    strengths=["Deep IDE integration", "Vast existing GitHub userbase", "Enterprise compliance"],
                    weaknesses=["High token latency on multi-file edits", "Limited autonomous agentic reasoning"],
                    estimated_pricing="$19 - $39 / user / month",
                    differentiator="Ecosystem scale and native GitHub pull request workflows"
                ),
                Competitor(
                    name="Cursor (Anysphere)",
                    market_tier="Direct Challenger",
                    strengths=["Native VS Code fork with seamless multi-file agentic editing", "Rapid developer adoption"],
                    weaknesses=["Standalone editor lock-in", "Enterprise security audit friction"],
                    estimated_pricing="$20 / user / month (Pro)",
                    differentiator="Context-aware agent workflows and codebase indexing"
                ),
                Competitor(
                    name="Anthropic Claude Code",
                    market_tier="High-Growth Innovator",
                    strengths=["State-of-the-art multi-step reasoning", "High architectural comprehension"],
                    weaknesses=["Terminal-first experience appeals mainly to power developers"],
                    estimated_pricing="Usage-based API / $20 Pro seat",
                    differentiator="Frontier reasoning models and direct terminal execution"
                )
            ]
            segments = [
                CustomerSegment(
                    persona="Enterprise Engineering Leaders (VP / CTO)",
                    description="Managing 100+ software engineers looking to increase developer velocity and reduce boilerplate.",
                    pain_points=["Context switching", "Code maintainability debt", "Lengthy onboarding ramp-up"],
                    willingness_to_pay="Very High ($50k - $250k annual contract value)",
                    acquisition_channels=["Enterprise direct sales", "SOC-2 compliant security reviews", "Executive networking"]
                ),
                CustomerSegment(
                    persona="Individual Fullstack & AI Engineers",
                    description="Fast-moving developers building SaaS products and open-source packages.",
                    pain_points=["Repetitive unit tests", "Async API boilerplate", "Documentation updates"],
                    willingness_to_pay="Medium ($20 - $40 / month)",
                    acquisition_channels=["Product-led growth (PLG)", "Twitter/X tech demos", "Developer Discords"]
                )
            ]
        elif any(term in q_lower for term in ["fintech", "stripe", "payment", "bank", "crypto"]):
            industry = "Financial Technology & Embedded Payments"
            tam_val, sam_val, som_val = 142.0, 36.5, 3.2
            cagr = 16.8
            competitors = [
                Competitor(
                    name="Stripe",
                    market_tier="Market Leader",
                    strengths=["World-class developer documentation", "Global payments infrastructure", "Ecosystem billing tools"],
                    weaknesses=["Higher take rate on low-margin interchange", "Account freeze complaints"],
                    estimated_pricing="2.9% + 30¢ per transaction",
                    differentiator="Developer-first API integration and global regulatory licensing"
                ),
                Competitor(
                    name="Adyen",
                    market_tier="Enterprise Leader",
                    strengths=["Single global platform architecture", "Lower fees for massive enterprise volume"],
                    weaknesses=["Complex setup for early-stage startups"],
                    estimated_pricing="Tiered interchange-plus pricing",
                    differentiator="Unified omnichannel commerce for global conglomerates"
                )
            ]
            segments = [
                CustomerSegment(
                    persona="SaaS Platform Founders",
                    description="Companies building multi-tenant SaaS that want to monetize payments and subscriptions.",
                    pain_points=["Multi-currency tax handling", "Churn due to failed credit cards", "Compliance (PCI-DSS)"],
                    willingness_to_pay="High (Revenue-share percentage)",
                    acquisition_channels=["Developer advocacy", "Self-serve signup", "Accelerator partnerships"]
                )
            ]
        else:
            # General technology / business market
            industry = f"{clean_target} Sector & Software Solutions"
            tam_val, sam_val, som_val = 52.0, 14.8, 1.15
            cagr = 14.2
            competitors = [
                Competitor(
                    name=f"{clean_target} Incumbent Alpha",
                    market_tier="Market Leader",
                    strengths=["Established brand equity", "Broad distribution channels", "Deep enterprise salesforce"],
                    weaknesses=["Legacy technical debt", "High implementation overhead", "Slow release velocity"],
                    estimated_pricing="Custom annual contracts ($20k+)",
                    differentiator="Enterprise brand recognition and compliance certifications"
                ),
                Competitor(
                    name="NextGen Challenger Labs",
                    market_tier="Direct Challenger",
                    strengths=["Modern intuitive UX", "Cloud-native architecture", "Transparent tiered pricing"],
                    weaknesses=["Limited international sales presence", "Shorter operating track record"],
                    estimated_pricing="$49 - $199 / month",
                    differentiator="Agile product iteration and seamless self-serve onboarding"
                )
            ]
            segments = [
                CustomerSegment(
                    persona="Mid-Market Operations Directors",
                    description="Operational decision makers seeking cost efficiency and automated workflow consolidation.",
                    pain_points=["Fragmented legacy tooling", "Manual data reconciliation", "Rising software overhead"],
                    willingness_to_pay="Medium-High ($500 - $2,500 / month)",
                    acquisition_channels=["LinkedIn outbound", "Industry webinars", "Targeted Google search ads"]
                )
            ]

        swot = SWOTAnalysis(
            strengths=[
                f"Proprietary focus on {clean_target} automation delivers 3x faster time-to-value than horizontal tools.",
                "Modern, API-first architecture enabling effortless plug-and-play integrations with existing toolchains.",
                "Lean operating model allowing rapid execution and competitive unit economics."
            ],
            weaknesses=[
                "Nascent market presence compared to legacy incumbents with decades of established enterprise relationships.",
                "Dependence on third-party foundational infrastructure and upstream cloud compute providers.",
                "Need to continuously expand localized compliance and international data residency footprints."
            ],
            opportunities=[
                f"Accelerating enterprise budget reallocations toward modernized {industry} solutions.",
                "Expansion into underserved mid-market segments overlooked by monolithic legacy vendors.",
                "Creation of proprietary data flywheels that compound competitive advantage over time."
            ],
            threats=[
                "Aggressive feature replication by well-capitalized tech incumbents.",
                "Potential macroeconomic tightening pressuring IT discretionary spending and procurement cycles.",
                "Shifting regulatory standards across cross-border privacy and AI governance."
            ]
        )

        overview = CompanyOverview(
            name=clean_target,
            industry=industry,
            summary=f"{clean_target} is positioned at the intersection of modern workflow automation and {industry}. The platform optimizes operational throughput and delivers data-driven market clarity for modern enterprises.",
            business_model="B2B SaaS with Tiered Subscriptions + Value-Add Enterprise Modules",
            value_proposition="Reduces research overhead by 80% while delivering structured, verified strategic insights in seconds.",
            headquarters="San Francisco, CA / Global Remote",
            founded_year="2023",
            stage="Growth Stage",
            key_metrics={
                "Primary Revenue Stream": "Recurring Annual Subscriptions (ARR)",
                "Gross Margin Profile": "78% - 84%",
                "Net Retention Benchmark": "118%",
                "Core Value Driver": "Automated Market Intelligence & Actionable Analytics"
            }
        )

        market_sizing = MarketSizing(
            tam_value=tam_val,
            tam_unit="$B",
            tam_methodology=f"Top-down sizing calculated from global enterprise expenditure across {industry}, encompassing ~450,000 addressable global organizations.",
            sam_value=sam_val,
            sam_unit="$B",
            sam_methodology=f"Target segment constrained to digital-forward mid-market and enterprise organizations in North America & Europe seeking modernized intelligence.",
            som_value=som_val,
            som_unit="$B",
            som_methodology="Calculated on capturing ~2.5% market share of SAM over a 36-month horizon through product-led growth and inbound partner channels.",
            default_som_percentage=2.5,
            cagr_rate=cagr,
            cagr_period="2024-2030",
            growth_drivers=[
                "Rapid enterprise transition from fragmented manual spreadsheets to centralized AI analytics.",
                "Surge in cross-functional demand for real-time market signals among product and strategy teams.",
                "Increasing corporate investments in automated decision intelligence to counter margin pressures."
            ]
        )

        recommendations = [
            f"Double down on product-led growth (PLG) to establish an organic wedge in the {clean_target} developer and analyst community.",
            "Form strategic distribution partnerships with complementary platforms to accelerate enterprise trust.",
            "Introduce transparent self-serve pricing tiers to compress sales cycles from 90 days to same-week onboarding.",
            "Establish proprietary benchmark indices and industry reports to build organic search authority and thought leadership."
        ]

        exec_summary = (
            f"The market landscape surrounding {clean_target} reflects significant expansion potential, driven by an estimated "
            f"${tam_val}B Total Addressable Market (TAM) growing at an aggressive {cagr}% CAGR through 2030. "
            f"While legacy incumbents currently hold substantial market presence, their vulnerability stems from sluggish innovation cycles "
            f"and prohibitive enterprise pricing models. By leveraging specialized workflows, modern cloud architecture, and "
            f"instant time-to-value, {clean_target} is uniquely positioned to capture an initial ${som_val}B Serviceable Obtainable Market (SOM) "
            f"across high-growth mid-market and modern enterprise segments."
        )

        return MarketResearchReport(
            query=query,
            executive_summary=exec_summary,
            overview=overview,
            market_sizing=market_sizing,
            competitors=competitors,
            swot=swot,
            customer_segments=segments,
            strategic_recommendations=recommendations,
            sources=citations
        )
