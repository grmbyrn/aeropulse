# AeroPulse

A small airline operations dashboard built as a focused portfolio project: simulated flight data, a Python API over SQL, and a server-rendered React frontend.

It is a deliberate vertical slice rather than a broad feature set — one path from database to browser, built end to end and tested at each layer.

## Stack

| Layer | Choice |
|---|---|
| Frontend | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 |
| Backend | FastAPI, SQLAlchemy 2, Pydantic v2 |
| Database | SQLite (Postgres-portable schema) |
| Tests | pytest, Playwright |
| CI | GitHub Actions — pytest, lint/typecheck/build, cross-browser e2e |

## Architecture

```
SQLite ──► SQLAlchemy models ──► FastAPI ──► Next.js Server Component ──► HTML
             (source of truth)   (Pydantic     (fetch on the server)
                                  contract)
```

The page is a **Server Component**: it fetches from the API on the server and sends finished HTML. No client-side data fetching, no loading spinners on first paint. The only Client Component is the status `<select>`, which needs browser event handling.

**Filter state lives in the URL.** Choosing a status navigates to `/?status=cancelled`; the server reads the query parameter, fetches the filtered list, and renders it. Filtered views are therefore shareable, bookmarkable, and correct on first render before any JavaScript executes.

**Two layers of typing meet at the API boundary.** Pydantic schemas (`backend/app/schemas.py`) define the response contract and validate outgoing data; TypeScript types (`frontend/src/lib/api.ts`) describe the same shapes to the frontend. These are asserted, not validated at runtime — see Known gaps.

**Aggregation happens in SQL.** Per-status counts come from a `GROUP BY` in the database, not a loop in Python, so the API returns four rows instead of two hundred and fifty.

## Prerequisites

- Python 3.14
- Node.js 22
- Google Chrome (for local Playwright runs; CI uses its own browsers)

## Setup

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt -r requirements-dev.txt
python -m app.seed          # creates aeropulse.db with 250 simulated flights
uvicorn app.main:app --reload
```

The API runs at `http://localhost:8000`. Interactive docs at `/docs`.

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

The dashboard runs at `http://localhost:3000`.

`API_BASE_URL` in `.env.local` points the frontend at the API. It has no `NEXT_PUBLIC_` prefix, so it stays server-side and is never shipped to the browser.

## API

| Endpoint | Description |
|---|---|
| `GET /health` | Liveness check. Used by Playwright to wait for the API before running tests. |
| `GET /flights` | All flights, ordered by scheduled departure. |
| `GET /flights?status=<status>` | Filtered by status. Constrained by an enum — an invalid value returns `422`, not an empty list. |
| `GET /metrics` | Total flight count plus per-status counts. |

Valid statuses: `scheduled`, `departed`, `arrived`, `cancelled`, `diverted`.

## Tests

```bash
cd backend && pytest             # API tests against an in-memory SQLite database
cd frontend && npx playwright test   # browser journey; starts both servers itself
```

Playwright's `webServer` config starts uvicorn and the Next.js dev server, waits for `/health` to answer, runs the tests, and shuts both down — so e2e never depends on a manually started backend.

CI runs all three suites on every push. Locally Playwright uses system Chrome; CI runs Chromium, Firefox and WebKit.

## Project structure

```
backend/
  app/
    main.py        FastAPI routes
    models.py      SQLAlchemy models and the status enum
    schemas.py     Pydantic response contracts
    database.py    Engine, session factory, per-request dependency
    seed.py        Generates 250 simulated flights
  tests/           pytest suite with an in-memory database fixture

frontend/
  src/
    app/           Routing only — page, layout, loading and error boundaries
    components/    Reusable UI
    lib/           API access and formatting helpers
  e2e/             Playwright specs
```

`src/app/` is routing; anything reusable lives outside it in `src/components/` or `src/lib/`.

## Known gaps

Deliberate, and the starting point for the next iteration:

- **No pagination.** `/flights` returns all 250 rows. Fine at this size, wrong at any real one.
- **API responses are asserted, not validated.** TypeScript trusts that the JSON matches its types. A runtime validator such as Zod would close the gap.
- **Responsive styling is incomplete.** The flight table needs an overflow container to behave on a phone.
- **Colour scheme is half-wired.** `globals.css` still carries the `create-next-app` dark-mode block while components use fixed light colours. It should either be removed or implemented properly.
- **Timestamps are naive local datetimes.** Timezone-aware storage — UTC at rest, converted at the edges — is the production-correct approach.
- **Metrics ignore the active filter.** "Total flights" always counts the whole table, by design; the chart does the same.
- **The seed never generates `departed` flights**, so that filter always shows the empty state. It exercises the empty case usefully, but the data generator is incomplete.

See `DECISIONS.md` for the reasoning behind the choices above, and `ROADMAP.md` for build order and scope boundaries.
