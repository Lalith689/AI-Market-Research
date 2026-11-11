from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from app.core.config import get_settings

"""
Why this file exists:
Manages the lifecycle of database connections.
SQLAlchemy provides an Object-Relational Mapper (ORM), meaning we define our database tables
as Python classes, and queries as Python code.

Key architectural concepts:
1. Engine: The connection pool that speaks to SQLite or PostgreSQL.
2. SessionLocal: A factory that creates individual transactional sessions.
3. Base: The declarative base class that all ORM models inherit from.
4. get_db(): A generator function designed for FastAPI's Dependency Injection (`Depends(get_db)`).
   It guarantees that each HTTP request gets its own session and automatically closes it when finished,
   preventing database connection leaks.
"""

settings = get_settings()

# connect_args={"check_same_thread": False} is required only for SQLite
# because SQLite by default blocks access from different threads, but FastAPI handles requests concurrently.
connect_args = {"check_same_thread": False} if "sqlite" in settings.DATABASE_URL else {}

engine = create_engine(
    settings.DATABASE_URL,
    connect_args=connect_args,
    echo=False  # Set to True if you want to inspect raw SQL queries in console
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def init_db():
    """Ensures all tables declared in models are created in the database."""
    # Import models here so Base knows about them
    import app.models  # noqa
    Base.metadata.create_all(bind=engine)


def get_db():
    """
    FastAPI dependency that yields a database session per request and guarantees cleanup.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

