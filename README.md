# 🔭 MarketLens — AI Market Research & Strategy Platform

[![Python](https://img.shields.io/badge/Python-3.13-3776AB?style=flat&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688?style=flat&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![SQLite](https://img.shields.io/badge/SQLite-SQLAlchemy_2.0-003B57?style=flat&logo=sqlite&logoColor=white)](https://sqlite.org/)
[![Tests](https://img.shields.io/badge/Tests-Pytest_Passing-brightgreen?style=flat&logo=pytest&logoColor=white)](https://pytest.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **MarketLens** is an automated strategic market research platform that analyzes companies, startups, and industry verticals. It combines live web grounding with strict JSON schema synthesis to produce investor-grade market reports complete with TAM/SAM/SOM calculators, 2x2 SWOT matrices, competitive landscapes, customer personas, verified source citations, and exportable PDFs.

---

## 📸 Key Features

- **🏢 Company & Industry Overview**: Value proposition, business model, maturity stage, headquarters, and key operational metrics.
- **📊 Interactive TAM, SAM & SOM Calculator**: Top-down and bottom-up sizing with a real-time client-side sensitivity slider to simulate attainable revenues and required customer accounts dynamically.
- **🛡️ 2x2 SWOT Analysis Matrix**: Structured quadrants detailing internal competencies, vulnerabilities, external market opportunities, and incumbent threats.
- **⚔️ Competitive Landscape**: Comprehensive benchmarking matrix including market tiers (Leader, Challenger, Niche), estimated pricing models, strengths, vulnerabilities, and differentiators.
- **🎯 Customer Segmentation (ICP)**: Ideal customer buyer profiles, willingness-to-pay indicators, core operational pain points, and recommended acquisition channels.
- **🔗 Grounded Fact Citations**: Live web search integration (via DuckDuckGo / web indices) providing real source links and excerpts to eliminate LLM hallucinations.
- **📄 Investor-Grade PDF Export**: Pixel-perfect, server-side PDF generation using ReportLab for executive presentation.
- **💾 Persistent History**: SQLite + SQLAlchemy ORM backend storing all previous reports with instant retrieval and management.

---

## 🏗️ System Architecture & File Connections

```mermaid
flowchart TD
    subgraph Frontend["Client Layer (React 19 + Vite + Tailwind CSS)"]
        UI["SearchBar.jsx & Preset Pills"]
        Calc["TamSamSomCalculator.jsx (Dynamic Sliders)"]
        SWOT["SwotAnalysis.jsx (2x2 Matrix)"]
        Comp["CompetitorTable.jsx"]
        Drawer["HistoryDrawer.jsx"]
        APIClient["services/api.js"]
    end

    subgraph Backend["API & Orchestrator (FastAPI + Python 3.13)"]
        Main["main.py (CORS, Lifespan, Routing)"]
        Routes["api/routes.py (REST Endpoints)"]
        Orchestrator["services/research_orchestrator.py"]
        SearchService["services/search_service.py (Live DuckDuckGo Grounding)"]
        LLMAdapter["services/llm_service.py (OpenAI / Gemini / Offline Mock)"]
        PDFService["services/pdf_service.py (ReportLab Engine)"]
    end

    subgraph Contracts["Data Integrity & Storage"]
        Schemas["schemas/market_report.py (Pydantic Contracts)"]
        DB[(models/report.py + SQLite)]
    end

    UI -->|1. Submit Query| APIClient
    APIClient -->|2. POST /api/research/generate| Routes
    Routes --> Orchestrator
    Orchestrator -->|3. Grounding Search| SearchService
    SearchService -->|4. Verified Citations| Orchestrator
    Orchestrator -->|5. Grounded Prompt| LLMAdapter
    LLMAdapter -->|6. Strict JSON Schema Validation| Schemas
    Schemas -->|7. Validated Model| Orchestrator
    Orchestrator -->|8. Store Record| DB
    Orchestrator -->|9. Strongly-Typed Response| Routes
    Routes -->|10. JSON Payload| APIClient
    APIClient --> Calc
    APIClient --> SWOT
    APIClient --> Comp
    Calc -->|Real-time Sensitivity| Calc
    Routes -->|GET /reports/{id}/export-pdf| PDFService
    PDFService -->|Downloadable Binary PDF| APIClient
```

---

## 📂 File Structure & Architecture Roles

```
AI Market Research/
├── backend/
│   ├── app/
│   │   ├── core/
│   │   │   ├── config.py             # Central Pydantic Settings (12-Factor App principle)
│   │   │   └── database.py           # SQLAlchemy engine, session maker, get_db dependency
│   │   ├── schemas/
│   │   │   └── market_report.py      # Pydantic data contracts (SWOT, TAM, Competitors)
│   │   ├── models/
│   │   │   └── report.py             # SQLAlchemy ORM table schema for SQLite
│   │   ├── services/
│   │   │   ├── search_service.py     # Live web search grounding & source citations
│   │   │   ├── llm_service.py        # LLM adapter: OpenAI, Gemini & Offline Mock engine
│   │   │   ├── research_orchestrator.py # Multi-step pipeline coordinator
│   │   │   └── pdf_service.py        # ReportLab PDF executive export engine
│   │   ├── api/
│   │   │   └── routes.py             # REST endpoints (/generate, /reports, /export-pdf)
│   │   └── main.py                   # FastAPI bootstrapping, CORS middleware & lifespan
│   ├── requirements.txt              # Backend dependencies
│   ├── pytest.ini                    # Pytest configuration
│   └── tests/
│       └── test_pipeline.py          # End-to-end integration & unit test suite
├── frontend/
│   ├── src/
│   │   ├── services/
│   │   │   └── api.js                # Centralized network client
│   │   ├── components/
│   │   │   ├── Navbar.jsx            # Brand navigation, PDF export trigger, history toggle
│   │   │   ├── SearchBar.jsx         # Query input, presets, animated progress steps
│   │   │   ├── ReportHeader.jsx      # Overview, stage, firmographics & executive summary
│   │   │   ├── TamSamSomCalculator.jsx # Dynamic client-side sensitivity analysis slider
│   │   │   ├── SwotAnalysis.jsx      # 2x2 colored quadrant matrix
│   │   │   ├── CompetitorTable.jsx   # Competitive landscape comparison grid
│   │   │   ├── CustomerSegments.jsx  # ICP personas & willingness-to-pay
│   │   │   ├── StrategicRecommendations.jsx # Actionable strategic growth moves
│   │   │   ├── SourcesList.jsx       # Verified external grounding links
│   │   │   └── HistoryDrawer.jsx     # Slide-over SQLite history viewer
│   │   ├── App.jsx                   # Main state coordinator
│   │   └── index.css                 # Tailwind directives & sleek scrollbars
│   ├── tailwind.config.js
│   ├── package.json
│   └── vite.config.js
├── README.md                         # Project documentation
├── .gitignore
└── LICENSE                           # MIT License
```

---

## ⚖️ Architectural Decisions & Trade-Offs ("Why This & Not That")

| Architectural Decision | Chosen Tool | Considered Alternative | Reason Chosen (The "Why") | Reason Rejected (The "Why Not") |
| :--- | :--- | :--- | :--- | :--- |
| **Backend Framework** | **FastAPI** | Flask, Django | Asynchronous endpoints, native Pydantic schema validation, and automatic OpenAPI Swagger docs (`/docs`). | Flask is synchronous by default; Django is excessive boilerplate for a decoupled AI microservice. |
| **Frontend Framework** | **React 19 + Vite** | Streamlit | Decoupled client-server architecture; enables **client-side instantaneous calculations** (e.g. TAM sliders) without backend roundtrips. | Streamlit re-executes the entire script on state changes and provides limited UI polish for portfolio presentations. |
| **AI Validation** | **Pydantic Schemas** | Raw Text Prompts | Guarantees strict JSON schema structure. Eliminates frontend parsing errors and broken charts caused by hallucinated keys. | Raw string LLM responses frequently hallucinate missing fields or change formats unpredictably. |
| **Data Grounding** | **DuckDuckGo Web Index** | Pure Zero-Shot LLM | Fetches live market statistics and real citation URLs before model synthesis. | Zero-shot LLMs hallucinate outdated competitor information and ungrounded market numbers. |
| **Database** | **SQLite + SQLAlchemy** | PostgreSQL, MongoDB | Zero configuration setup: anyone cloning the GitHub repo can run `pytest` or start the app immediately with zero external daemon configuration. | PostgreSQL adds Docker setup friction for casual repo visitors; MongoDB lacks relational integrity. |
| **Multi-Provider LLM** | **Adapter Pattern** | Hardcoded OpenAI API | Provides an intelligent deterministic mock mode out of the box so anyone can test the full platform without paid API keys. | Vendor lock-in blocks users who do not have paid credits with a single provider. |

---

## 🚀 Quick Start Guide

### Prerequisites
- **Python 3.10+** (Tested on Python 3.13)
- **Node.js 18+** & **npm**

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows:
.venv\Scripts\activate
# Linux/macOS:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
*API will be running at [http://127.0.0.1:8000](http://127.0.0.1:8000) with interactive Swagger docs at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).*

### 2. Frontend Setup

In a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install npm dependencies
npm install

# Start Vite development server
npm run dev
```
*Frontend will be running at [http://127.0.0.1:5173](http://127.0.0.1:5173).*

---

## 🧪 Running Automated Tests

Run the full backend test suite covering Pydantic schemas, search fallback, mock LLM generation, SQLite persistence, and ReportLab PDF compilation:

```bash
cd backend
.venv\Scripts\pytest
```

---

## ⚙️ Configuration & Environment Variables

Copy `backend/.env.example` to `backend/.env`:

```env
APP_NAME="MarketLens API"
APP_ENV="development"
PORT=8000

# LLM Provider: 'mock' (default, free & offline), 'openai', or 'gemini'
LLM_PROVIDER="mock"

# Optional API Keys (Only needed if switching from 'mock' to 'openai' or 'gemini')
OPENAI_API_KEY=""
GEMINI_API_KEY=""

# Database URL
DATABASE_URL="sqlite:///./marketlens.sqlite3"
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
