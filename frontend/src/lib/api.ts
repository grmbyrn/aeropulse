export type Metrics = {
    total_flights: number
}

export type Flight = {
  id: number
  flight_number: string
  airline_code: string
  origin_code: string
  destination_code: string
  scheduled_departure: string
  actual_departure: string | null
  scheduled_arrival: string
  actual_arrival: string | null
  status: string
}

const base = process.env.API_BASE_URL ?? "http://localhost:8000"

export async function getMetrics(): Promise<Metrics>{
    const res = await fetch(`${base}/metrics`)
    const data = await res.json()
    return data
}

export async function getFlights(): Promise<Flight[]>{
    const res = await fetch(`${base}/flights`)
    const data = await res.json()
    return data
}