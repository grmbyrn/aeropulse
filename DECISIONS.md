# Technical Decisions

- Frontend: Next.js with TypeScript and Tailwind CSS
- Backend: FastAPI with Python
- Initial database: SQLite
- Future database option: PostgreSQL
- Testing: pytest and Playwright
- Data: simulated flight data
- Architecture priority: simple, understandable, and expandable
- Current priority: finish the smallest working vertical slice

- MVP metric is total flights only; other metrics deferred
- Diverted flights are modelled as arriving at the planned destination (simplification)
- SQLAlchemy models are the source of truth; metric aggregation written as explicit SQL
- Timestamps stored via SQLAlchemy DateTime for Postgres portability

- Pydantic schemas in schemas.py are the API contract, kept separate from SQLAlchemy models
- Flights are returned ordered by scheduled_departure; no implicit row order is relied on
- Sessions are provided per-request via a FastAPI dependency
