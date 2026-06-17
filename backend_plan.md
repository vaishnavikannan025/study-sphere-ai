# Backend Development Plan - Study Sphere AI

This document details the backend application plan for **Study Sphere AI** using a **Python + FastAPI** stack. It defines the folder structure, API endpoints, authentication mechanisms, database integrations, and communication pipelines suitable for a hackathon timeline.

---

## 1. Backend Folder Structure

We will implement a clean, service-oriented structure designed to keep routers separated from business logic and database queries:

```text
backend/
├── app/
│   ├── api/                    # API Route controllers
│   │   ├── v1/                 # Version 1 routing modules
│   │   │   ├── auth.py         # Login, signup, authentication dependencies
│   │   │   ├── notes.py        # Note uploads, processing, metadata retrieval
│   │   │   ├── chat.py         # Chat session creation, history, and RAG SSE stream
│   │   │   ├── planner.py      # Planner task CRUD endpoints
│   │   │   └── quiz.py         # Quiz generation triggers, submission logging
│   │   └── router.py           # Main api router orchestrating API prefixes
│   ├── core/                   # Server core initializers
│   │   ├── config.py           # Environment config parsing (Pydantic Settings)
│   │   ├── database.py         # Async database engines, session generators
│   │   └── security.py         # Password encryption and JWT signing helpers
│   ├── models/                 # Unified SQLModel structures
│   │   ├── user.py             # User DB table and validation request/response models
│   │   ├── note.py             # Note and NoteChunk definitions
│   │   ├── chat.py             # ChatSession and ChatMessage schemas
│   │   ├── planner.py          # PlannerTask database representations
│   │   └── quiz.py             # Quiz and QuizAttempt schemas
│   ├── services/               # Modular business logic services
│   │   ├── note_service.py     # Document text parsing, semantic chunking pipeline
│   │   ├── chat_service.py     # Context injection, RAG engine, Gemini stream orchestrator
│   │   └── quiz_service.py     # Prompt assembly, structured JSON schema parsing
│   └── main.py                 # Application initializer (CORS, Swagger setup)
├── requirements.txt            # Package manifest
├── Dockerfile                  # Container instructions
└── .env.example                # local settings template
```

---

## 2. API Architecture

* **RESTful JSON Endpoints**: Standard operations (uploading files, updating planner tasks, saving quiz scores) follow REST design conventions.
* **Server-Sent Events (SSE)**: Chat tutor answers use FastAPI `EventSourceResponse` (via `sse-starlette`) to stream responses back to the React UI token-by-token.
* **FastAPI Dependency Injection**: Used to manage database transactions, user authentication, and API security permissions dynamically.
* **Auto-generated OpenAPI Documentation**: Access Swagger UI at `/docs` or ReDoc at `/redoc`.

---

## 3. Required API Endpoints

| Category | HTTP Method | Endpoint Path | Authentication | Request Body (or query/form) | Response Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/api/v1/auth/register` | Public | `{email, display_name, password}` | Created user profile |
| **Auth** | `POST` | `/api/v1/auth/login` | Public | Form: `{username, password}` (OAuth2) | JWT access token |
| **Auth** | `GET` | `/api/v1/auth/me` | Bearer JWT | None | Current user record |
| **Notes** | `POST` | `/api/v1/notes` | Bearer JWT | Form: `{file: UploadFile, title: str}` | Created note metadata |
| **Notes** | `GET` | `/api/v1/notes` | Bearer JWT | None | List of user's notes |
| **Notes** | `DELETE`| `/api/v1/notes/{id}` | Bearer JWT | None | Success confirmation |
| **Chat** | `POST` | `/api/v1/chat/sessions` | Bearer JWT | `{title: str}` | Created session meta |
| **Chat** | `GET` | `/api/v1/chat/sessions` | Bearer JWT | None | List of chat sessions |
| **Chat** | `GET` | `/api/v1/chat/sessions/{id}/messages` | Bearer JWT | None | Message history logs |
| **Chat** | `GET` | `/api/v1/chat/stream` | Bearer JWT | Query: `session_id, query` | SSE response token stream |
| **Planner**| `GET` | `/api/v1/planner/tasks` | Bearer JWT | Query: `is_completed: bool` | List of schedule items |
| **Planner**| `POST` | `/api/v1/planner/tasks` | Bearer JWT | `{title, description, due_date, priority}`| Created task record |
| **Planner**| `PUT` | `/api/v1/planner/tasks/{id}` | Bearer JWT | `{title, description, is_completed, ...}`| Updated task record |
| **Quiz** | `POST` | `/api/v1/quizzes/generate` | Bearer JWT | `{note_id: UUID, questions_count: int}` | Generated structured quiz |
| **Quiz** | `POST` | `/api/v1/quizzes/attempts` | Bearer JWT | `{quiz_id: UUID, score: int, answers: JSON}` | Logged attempt scores |
| **Quiz** | `GET` | `/api/v1/quizzes/attempts` | Bearer JWT | None | History performance metrics |

---

## 4. Authentication Approach

1. **Password Hashing**: User passwords are encrypted using `bcrypt` via Python's `passlib` library before storage.
2. **Access Tokens**: We use stateless **JSON Web Tokens (JWT)**.
3. **Flow**:
   - The user inputs credentials via `/auth/login`.
   - The backend validates the password against the database hash.
   - Upon verification, the backend issues an access token signed with a secure server-side `JWT_SECRET_KEY` using the `HS256` algorithm.
   - The frontend stores the token in memory/local storage and sends it in the `Authorization: Bearer <token>` header for all authenticated queries.
4. **FastAPI Guard Dependency**:
   - Route protection uses `HTTPBearer` parsing.
   - `get_current_user` extracts the JWT, verifies the signature/expiry, extracts user parameters, and queries the database.

---

## 5. Database Connection Approach

We implement an **Asynchronous DB Pool** utilizing `SQLModel` (built on top of `SQLAlchemy` and `Pydantic`):

* **Local Dev / Fast Mocking**: The connection string supports SQLite for quick hackathon local execution (`sqlite+aiosqlite:///./study_sphere.db`).
* **Production / Staging**: Seamlessly connects to PostgreSQL via Asyncpg (`postgresql+asyncpg://user:password@host/dbname`).
* **Session Lifecycle**:
  ```python
  from sqlmodel.ext.asyncio.session import AsyncSession
  from sqlalchemy.ext.asyncio import create_async_engine
  
  engine = create_async_engine(DATABASE_URL, echo=True)
  
  async def get_db_session() -> AsyncSession:
      async with AsyncSession(engine) as session:
          yield session
  ```
* Every API router utilizes FastAPI's `Depends(get_db_session)` to lease and release a session on each transaction lifecycle automatically.

---

## 6. Component Communication & AI Integration Flows

```mermaid
sequenceDiagram
    autonumber
    participant Client as React App (Vite)
    participant API as FastAPI Backend
    participant DB as PostgreSQL (pgvector)
    participant AI as Gemini API

    %% Text Upload Ingestion Flow
    rect rgb(20, 30, 40)
        Note over Client, AI: 1. Text Upload & Ingestion Flow
        Client->>API: POST /api/v1/notes (Multipart Form)
        API->>API: Extract Clean Text (PDF/Txt parsing)
        API->>API: Split content into 1000-character chunks
        API->>AI: POST /v1beta/embeddings (Vectorize Chunks)
        AI-->>API: Return Embeddings (768d float arrays)
        API->>DB: Save text chunks + embeddings to NOTE_CHUNKS table
        API-->>Client: Return 201 Created Note Catalog
    end

    %% Real-time RAG Tutoring Flow
    rect rgb(30, 40, 55)
        Note over Client, AI: 2. Real-time RAG Tutoring Flow
        Client->>API: GET /api/v1/chat/stream?session_id=X&query=Y (SSE Stream)
        API->>AI: Vectorize User Query
        AI-->>API: Return query embedding vector
        API->>DB: Cosine Similarity match (pgvector HNSW index)
        DB-->>API: Return top 5 relevant text chunks
        API->>API: Assemble system context & user query prompt
        API->>AI: Stream Generate Content request (Gemini Pro)
        loop Streaming Response
            AI-->>API: token chunk
            API-->>Client: EventSource message (text block)
        end
    end
```

### Ingestion Integration (FastAPI -> AI)
Upon note upload, `note_service` processes the raw bytes. It chunks the document text, formats it as requests to Google's AI Studio API (`text-embedding-004`), and inputs the resulting array into PostgreSQL.

### Tutor Streaming (FastAPI -> Frontend)
The frontend opens a standard connection using the browser's native `EventSource`. The backend utilizes Python async generators to fetch chunks from the Gemini API and write it directly to the HTTP stream.
