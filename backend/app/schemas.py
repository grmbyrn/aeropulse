from datetime import datetime
from pydantic import BaseModel, ConfigDict

class FlightOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    flight_number: str
    airline_code: str
    origin_code: str
    destination_code: str
    scheduled_departure: datetime
    actual_departure: datetime | None
    scheduled_arrival: datetime
    actual_arrival: datetime | None
    status: str

class MetricsOut(BaseModel):
    total_flights: int
    status_counts: dict[str, int]