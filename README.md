# Backend - Study Sphere AI API Server

The backend application server is built using **Python + FastAPI**, serving RESTful and SSE (streaming) endpoints.

For a detailed blueprint including API routing tables, endpoint parameters, authentication, database transactions, and AI orchestrators, please review the [Backend Development Plan](file:///c:/Users/Admin/OneDrive/Desktop/study_sphere_ai/docs/requirements_planning/backend_plan.md).

## Quick-Start Directory Structure
- `/app/api/` — Route handlers grouped by domain (`auth`, `notes`, `chat`, `planner`, `quiz`).
- `/app/core/` — Config, security parameters, and async database session providers.
- `/app/models/` — SQLModel database mappings.
- `/app/services/` — RAG pipelines, text splitters, and LLM handlers.
- `/app/main.py` — FastAPI application configuration.

## Local Setup
1. Create virtual environment: `python -m venv venv`
2. Activate environment:
   - Linux/macOS: `source venv/bin/activate`
   - Windows: `.\venv\Scripts\activate`
3. Install dependencies: `pip install -r requirements.txt`
4. Start development server: `uvicorn app.main:app --reload`
