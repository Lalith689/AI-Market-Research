from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import get_settings
from app.core.database import init_db
from app.api.routes import router as api_router

"""
Application Entry Point.

Why this file exists:
1. Bootstraps the FastAPI application instance.
2. Configures Cross-Origin Resource Sharing (CORS) — essential when the frontend
   runs on a separate port (e.g. Vite on 5173) and calls the backend on 8000.
3. Automatically provisions SQLite tables on application startup.
4. Mounts API router endpoints.
"""

settings = get_settings()

# Initialize tables immediately
init_db()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: ensure tables are created
    init_db()
    yield

    # Shutdown logic (if any) can go here


app = FastAPI(
    title=settings.APP_NAME,
    description="Automated AI Market Research Platform: TAM/SAM/SOM, SWOT, Competitors, Grounded Citations.",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Middleware Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list + ["*"],  # Allows all in local dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount routes
app.include_router(api_router)


@app.get("/")
def root():
    return {
        "message": f"Welcome to {settings.APP_NAME}",
        "docs_url": "/docs",
        "health_check": "/api/health"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=settings.HOST, port=settings.PORT, reload=settings.DEBUG)
