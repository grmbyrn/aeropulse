# AeroPulse Roadmap

## Goal

Build a small airline operations dashboard as a focused interview project.

## Constraints

- Finish the MVP by Monday evening
- Do not expand scope before the MVP works
- Use simulated flight data
- Implement the work manually and understand every part
- Prefer a complete vertical slice over extra features

## Phase 1: Setup

- [x] Verify Node, npm, Python, and Git
- [x] Verify the Next.js frontend
- [x] Verify the FastAPI backend environment
- [x] Verify Playwright
- [x] Verify Git and .gitignore

## Phase 2: Database

- [x] Design the SQL schema
- [x] Add seed data
- [x] Add database connection
- [x] Verify basic queries

## Phase 3: Backend

- [x] Add flight endpoint
- [x] Add metrics endpoint
- [x] Add filtering
- [x] Add validation and error handling
- [x] Add pytest tests

## Phase 4: Frontend

- [x] Add dashboard layout
- [ ] Add metric cards
- [ ] Add flight table
- [ ] Add filters
- [ ] Add charts
- [ ] Add loading, empty, and error states

## Phase 5: End-to-end quality

- [ ] Add one Playwright user journey
- [ ] Improve responsive styling
- [ ] Write README
- [ ] Add architecture explanation
- [ ] Prepare interview talking points

## Deliberately out of scope

- Real airline data
- Authentication
- Complex permissions
- Real-time updates
- Production AWS deployment
- Advanced analytics
- Multiple unrelated dashboards
- Timestamps are naive local datetimes; timezone-aware storage (UTC at rest, convert at the edges) is the correct production approach but out of scope for the MVP
