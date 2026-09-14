export type Metrics = {
    total_flights: number,
    status_counts: Record<string, number>
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
  status_counts: Record<string, number>
}

const base = process.env.API_BASE_URL ?? "http://localhost:8000"

export async function getMetrics(): Promise<Metrics>{
    const res = await fetch(`${base}/metrics`)
    if(!res.ok) throw new Error(`GET ${base} failed: ${res.status}`)
    const data = await res.json()
    return data
}

export async function getFlights(status: string | undefined): Promise<Flight[]>{
    const baseUrl = status ? `${base}/flights?status=${status}` : `${base}/flights`
    const res = await fetch(baseUrl)
    if(!res.ok) throw new Error(`GET ${baseUrl} failed: ${res.status}`)
    const data = await res.json()
    return data
}