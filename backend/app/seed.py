import random
from datetime import datetime, timedelta

from app.database import SessionLocal, engine
from app.models import Airline, Airport, Base, Flight

AIRLINES = [
    ("BA", "British Airways"),
    ("AF", "Air France"),
    ("LH", "Lufthansa"),
    ("KL", "KLM Royal Dutch Airlines"),
    ("EI", "Aer Lingus"),
]

AIRPORTS = [
    ("LHR", "Heathrow",           "London",    "United Kingdom"),
    ("CDG", "Charles de Gaulle",  "Paris",     "France"),
    ("FRA", "Frankfurt",          "Frankfurt", "Germany"),
    ("AMS", "Schiphol",           "Amsterdam", "Netherlands"),
    ("DUB", "Dublin",             "Dublin",    "Ireland"),
    ("MAD", "Barajas",            "Madrid",    "Spain"),
    ("FCO", "Fiumicino",          "Rome",      "Italy"),
    ("JFK", "John F. Kennedy",    "New York",  "United States"),
]

def seed() -> None:
    Base.metadata.create_all(engine)
    with SessionLocal() as session:
        session.query(Flight).delete()
        session.query(Airline).delete()
        session.query(Airport).delete()

        session.add_all([Airline(code=c, name=n) for c, n in AIRLINES])
        session.add_all([
            Airport(code=c, name=n, city=ci, country=co)
            for c, n, ci, co in AIRPORTS
        ])
        session.flush()

        for _ in range(250):
            code, full_name = random.choice(AIRLINES)

            origin, destination = random.sample(AIRPORTS, 2)

            flight_number = code + str(random.randint(100, 999))

            scheduled_departure = datetime.now() - timedelta(days=7) + timedelta(minutes=random.randint(0, 14400))

            duration_minutes = random.randint(60, 600)
            scheduled_arrival = scheduled_departure + timedelta(minutes=duration_minutes)

            outcome = random.random()
            delay_roll = random.random()

            if delay_roll < 0.65:
                delay_minutes = random.randint(0, 15)
            elif delay_roll < 0.90:
                delay_minutes = random.randint(16, 60)
            else:
                delay_minutes = random.randint(61, 240)

            if scheduled_departure > datetime.now():
                status = 'scheduled'
                actual_departure = None
                actual_arrival = None
            elif outcome < 0.05:
                status = 'cancelled'
                actual_departure = None
                actual_arrival = None
            elif outcome < 0.07:
                status = 'diverted'
                actual_departure = scheduled_departure + timedelta(minutes=delay_minutes)
                actual_arrival = actual_departure + timedelta(minutes=duration_minutes)
            else:
                status = 'arrived'
                actual_departure = scheduled_departure + timedelta(minutes=delay_minutes)
                actual_arrival = actual_departure + timedelta(minutes=duration_minutes)

            flight = Flight(
                flight_number=flight_number,
                airline_code=code,
                origin_code=origin[0],
                destination_code=destination[0],
                scheduled_departure=scheduled_departure,
                actual_departure=actual_departure,
                scheduled_arrival=scheduled_arrival,
                actual_arrival=actual_arrival,
                status=status
            )

            session.add(flight)

        session.commit()

if __name__ == "__main__":
    seed()