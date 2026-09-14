# Technical Decisions

- Frontend: Next.js with TypeScript and Tailwind CSS
- Backend: FastAPI with Python
- Initial database: SQLite
- Future database option: PostgreSQL
- Testing: pytest and Playwright
- Data: simulated flight data
- Architecture priority: simple, understandable, and expandable
- Current priority: finish the smallest working vertical slice

- Metrics are total flights plus per-status counts, aggregated with an explicit SQL GROUP BY.
  Statuses with zero rows are absent from the response rather than zero.
- Charts are rendered as CSS bars; no charting library, as a bar chart did not warrant the dependency

- Diverted flights are modelled as arriving at the planned destination (simplification)
- SQLAlchemy models are the source of truth; metric aggregation written as explicit SQL
- Timestamps stored via SQLAlchemy DateTime for Postgres portability

- Pydantic schemas in schemas.py are the API contract, kept separate from SQLAlchemy models
- Flights are returned ordered by scheduled_departure; no implicit row order is relied on
- Sessions are provided per-request via a FastAPI dependency

- Status filter is constrained by the FlightStatus enum; invalid values return 422 rather than an empty result. Error handling beyond validation deferred — no endpoint currently has a not-found case

- Reusable components live in src/components/, outside app/, which is routing only
- API responses are typed at the boundary in src/lib/api.ts; the types are assertions, not runtime validation — Zod deferred
