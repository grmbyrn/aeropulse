from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Flight, FlightStatus
from app.schemas import FlightOut
from app.schemas import MetricsOut
from sqlalchemy import text
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/health")
def read_health():
    return {"status": "ok"}

@app.get("/flights", response_model=list[FlightOut])
def list_flights(db: Session = Depends(get_db), status: FlightStatus | None = None):
    query = db.query(Flight)

    if status is not None:
        query = query.filter(Flight.status == status)

    return query.order_by(Flight.scheduled_departure).all()

@app.get('/metrics', response_model=MetricsOut)
def read_metrics(db: Session = Depends(get_db)):
    metrics = db.execute(text("SELECT COUNT(*) FROM flights")).scalar_one()
    return {"total_flights": metrics}