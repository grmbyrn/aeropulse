import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
from datetime import datetime

from app.models import Airline, Airport, Base, Flight
from app.database import get_db
from app.main import app
from app.models import Base

engine = create_engine(
    "sqlite://",
    connect_args={"check_same_thread": False},
    poolclass=StaticPool
)
TestSessionLocal = sessionmaker(bind=engine, autoflush=False, expire_on_commit=False)

@pytest.fixture
def client():
    Base.metadata.create_all(engine)

    with TestSessionLocal() as session:
        session.add(Airline(code="BA", name="British Airways"))
        session.add_all([
            Airport(code="LHR", name="Heathrow", city="London", country="United Kingdom"),
            Airport(code="CDG", name="Charles de Gaulle", city="Paris", country="France"),
        ])
        session.flush()
        session.add_all([
            Flight(flight_number="BA100", airline_code="BA",
                    origin_code="LHR", destination_code="CDG",
                    scheduled_departure=datetime(2026, 1, 1, 9, 0),
                    actual_departure=datetime(2026, 1, 1, 9, 5),
                    scheduled_arrival=datetime(2026, 1, 1, 11, 0),
                    actual_arrival=datetime(2026, 1, 1, 11, 5),
                    status="arrived"),
            Flight(flight_number="BA200", airline_code="BA",
                    origin_code="CDG", destination_code="LHR",
                    scheduled_departure=datetime(2026, 1, 1, 12, 0),
                    actual_departure=datetime(2026, 1, 1, 12, 0),
                    scheduled_arrival=datetime(2026, 1, 1, 14, 0),
                    actual_arrival=datetime(2026, 1, 1, 14, 0),
                    status="arrived"),
            Flight(flight_number="BA300", airline_code="BA",
                    origin_code="LHR", destination_code="CDG",
                    scheduled_departure=datetime(2026, 1, 1, 15, 0),
                    actual_departure=None,
                    scheduled_arrival=datetime(2026, 1, 1, 17, 0),
                    actual_arrival=None,
                    status="cancelled"),
            Flight(flight_number="BA400", airline_code="BA",
                    origin_code="LHR", destination_code="CDG",
                    scheduled_departure=datetime(2026, 1, 2, 9, 0),
                    actual_departure=None,
                    scheduled_arrival=datetime(2026, 1, 2, 11, 0),
                    actual_arrival=None,
                    status="scheduled"),
        ])
        session.commit()


    def override_get_db():
        db = TestSessionLocal()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db
    yield TestClient(app)
    app.dependency_overrides.clear()
    Base.metadata.drop_all(engine)