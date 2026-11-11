import io
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    HRFlowable,
    KeepTogether
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from app.schemas.market_report import MarketResearchReport


class PDFExportService:
    """
    Server-side Executive PDF Report Generator.
    
    Why this file exists:
    While browser-side window.print() can work, a dedicated server-side PDF engine
    using ReportLab guarantees:
    1. Exact pixel-perfect pagination without page break collisions.
    2. Professional executive styling suitable for investors and board meetings.
    3. Headless export capability accessible directly via REST API.
    """

    def generate_pdf(self, report: MarketResearchReport) -> bytes:
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(
            buffer,
            pagesize=letter,
            rightMargin=40,
            leftMargin=40,
            topMargin=40,
            bottomMargin=40
        )

        styles = getSampleStyleSheet()
        
        # Custom typography hierarchy
        title_style = ParagraphStyle(
            'DocTitle',
            parent=styles['Normal'],
            fontName='Helvetica-Bold',
            fontSize=22,
            leading=26,
            textColor=colors.HexColor('#0F172A')
        )
        
        subtitle_style = ParagraphStyle(
            'DocSubtitle',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=11,
            leading=15,
            textColor=colors.HexColor('#64748B')
        )

        h1_style = ParagraphStyle(
            'Heading1',
            parent=styles['Normal'],
            fontName='Helvetica-Bold',
            fontSize=14,
            leading=18,
            textColor=colors.HexColor('#1E293B'),
            spaceBefore=14,
            spaceAfter=6
        )

        body_style = ParagraphStyle(
            'Body',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=9.5,
            leading=14,
            textColor=colors.HexColor('#334155')
        )

        badge_style = ParagraphStyle(
            'Badge',
            parent=styles['Normal'],
            fontName='Helvetica-Bold',
            fontSize=8,
            textColor=colors.HexColor('#2563EB')
        )

        story = []

        # Header Section
        story.append(Paragraph(f"MARKETLENS RESEARCH REPORT", badge_style))
        story.append(Spacer(1, 4))
        story.append(Paragraph(f"{report.overview.name}: Strategic Market Analysis", title_style))
        story.append(Spacer(1, 4))
        story.append(Paragraph(f"Industry Vertical: {report.overview.industry} | Stage: {report.overview.stage} | Generated: {report.created_at[:10]}", subtitle_style))
        story.append(Spacer(1, 8))
        story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor("#2563EB"), spaceAfter=14))

        # Executive Summary
        story.append(Paragraph("1. Executive Summary", h1_style))
        story.append(Paragraph(report.executive_summary, body_style))
        story.append(Spacer(1, 10))

        # Market Sizing (TAM / SAM / SOM)
        story.append(Paragraph("2. Market Sizing (TAM / SAM / SOM)", h1_style))
        
        market_data = [
            [
                Paragraph("<b>Metric</b>", body_style),
                Paragraph("<b>Estimated Size</b>", body_style),
                Paragraph("<b>Methodology & Strategic Criteria</b>", body_style)
            ],
            [
                Paragraph("<b>TAM (Total Addressable)</b>", body_style),
                Paragraph(f"<b>{report.market_sizing.tam_unit}{report.market_sizing.tam_value}B</b>", body_style),
                Paragraph(report.market_sizing.tam_methodology, body_style)
            ],
            [
                Paragraph("<b>SAM (Serviceable Addressable)</b>", body_style),
                Paragraph(f"<b>{report.market_sizing.sam_unit}{report.market_sizing.sam_value}B</b>", body_style),
                Paragraph(report.market_sizing.sam_methodology, body_style)
            ],
            [
                Paragraph("<b>SOM (Serviceable Obtainable)</b>", body_style),
                Paragraph(f"<b>{report.market_sizing.som_unit}{report.market_sizing.som_value}B</b>", body_style),
                Paragraph(report.market_sizing.som_methodology, body_style)
            ],
            [
                Paragraph("<b>CAGR Projection</b>", body_style),
                Paragraph(f"<b>{report.market_sizing.cagr_rate}%</b>", body_style),
                Paragraph(f"Projected compound annual growth horizon ({report.market_sizing.cagr_period})", body_style)
            ]
        ]

        market_table = Table(market_data, colWidths=[140, 90, 300])
        market_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#F1F5F9')),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E1')),
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#F8FAFC')]),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
            ('TOPPADDING', (0, 0), (-1, -1), 6),
        ]))
        story.append(market_table)
        story.append(Spacer(1, 14))

        # SWOT Analysis Quadrants
        story.append(Paragraph("3. SWOT Analysis", h1_style))
        swot_data = [
            [
                Paragraph(f"<b>STRENGTHS</b><br/>• " + "<br/>• ".join(report.swot.strengths), body_style),
                Paragraph(f"<b>WEAKNESSES</b><br/>• " + "<br/>• ".join(report.swot.weaknesses), body_style)
            ],
            [
                Paragraph(f"<b>OPPORTUNITIES</b><br/>• " + "<br/>• ".join(report.swot.opportunities), body_style),
                Paragraph(f"<b>THREATS</b><br/>• " + "<br/>• ".join(report.swot.threats), body_style)
            ]
        ]
        swot_table = Table(swot_data, colWidths=[265, 265])
        swot_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (0, 0), colors.HexColor('#EFF6FF')),  # Strengths blue
            ('BACKGROUND', (1, 0), (1, 0), colors.HexColor('#FEF2F2')),  # Weaknesses rose
            ('BACKGROUND', (0, 1), (0, 1), colors.HexColor('#F0FDF4')),  # Opportunities green
            ('BACKGROUND', (1, 1), (1, 1), colors.HexColor('#FFFBEB')),  # Threats amber
            ('BOX', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E1')),
            ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E1')),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('TOPPADDING', (0, 0), (-1, -1), 8),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
            ('LEFTPADDING', (0, 0), (-1, -1), 8),
            ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ]))
        story.append(swot_table)
        story.append(Spacer(1, 14))

        # Competitor Matrix
        story.append(KeepTogether([
            Paragraph("4. Competitor Comparison", h1_style),
            Table([
                [
                    Paragraph("<b>Competitor</b>", body_style),
                    Paragraph("<b>Tier</b>", body_style),
                    Paragraph("<b>Pricing</b>", body_style),
                    Paragraph("<b>Key Differentiator</b>", body_style)
                ]
            ] + [
                [
                    Paragraph(f"<b>{c.name}</b>", body_style),
                    Paragraph(c.market_tier, body_style),
                    Paragraph(c.estimated_pricing, body_style),
                    Paragraph(c.differentiator, body_style)
                ] for c in report.competitors
            ], colWidths=[120, 100, 110, 200], style=[
                ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#F1F5F9')),
                ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E1')),
                ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#F8FAFC')]),
                ('VALIGN', (0, 0), (-1, -1), 'TOP'),
                ('TOPPADDING', (0, 0), (-1, -1), 5),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
            ])
        ]))
        story.append(Spacer(1, 14))

        # Strategic Recommendations
        story.append(KeepTogether([
            Paragraph("5. Strategic Recommendations", h1_style),
            Paragraph("<br/>".join([f"<b>{idx+1}.</b> {rec}" for idx, rec in enumerate(report.strategic_recommendations)]), body_style),
            Spacer(1, 12),
            Paragraph("6. Research Sources & Grounding Citations", h1_style),
            Paragraph("<br/>".join([f"• <b>{c.title}</b> ({c.domain}) - <font color='#2563EB'>{c.url}</font>" for c in report.sources[:5]]), body_style)
        ]))

        doc.build(story)
        buffer.seek(0)
        return buffer.getvalue()
