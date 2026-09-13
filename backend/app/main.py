from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Flight
from app.schemas import FlightOut

app = FastAPI()

@app.get("/health")
def read_health():
    return {"status": "ok"}

@app.get("/flights", response_model=list[FlightOut])
def list_flights(db: Session = Depends(get_db)):
    return db.query(Flight).order_by(Flight.scheduled_departure).all()