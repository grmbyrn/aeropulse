from datetime import datetime

from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column; from sqlalchemy import DateTime, ForeignKey, CheckConstraint;

class Base(DeclarativeBase):
    pass

class Airline(Base):
    __tablename__ = "airlines"

    code: Mapped[str] = mapped_column(primary_key=True)
    name: Mapped[str]

class Airport(Base):
    __tablename__ = "airports"

    code: Mapped[str] = mapped_column(primary_key=True)
    name: Mapped[str]
    city: Mapped[str]
    country: Mapped[str]

class Flight(Base):
    __tablename__ = "flights"

    id: Mapped[int] = mapped_column(primary_key=True)
    flight_number: Mapped[str]
    airline_code: Mapped[str] = mapped_column(ForeignKey("airlines.code"))
    origin_code: Mapped[str] = mapped_column(ForeignKey("airports.code"))
    destination_code: Mapped[str] = mapped_column(ForeignKey("airports.code"))
    scheduled_departure: Mapped[datetime]
    actual_departure: Mapped[datetime | None]
    scheduled_arrival: Mapped[datetime]
    actual_arrival: Mapped[datetime | None]
    status: Mapped[str]

    __table_args__ = (
        CheckConstraint(
            "status IN ('scheduled', 'departed', 'arrived', 'cancelled', 'diverted')",
            name="ck_flights_status",
        ),
    )