export type Metrics = {
    total_flights: number
}

const base = process.env.API_BASE_URL ?? "http://localhost:8000"

export async function getMetrics(): Promise<Metrics>{
    const res = await fetch(`${base}/metrics`)
    const data = await res.json()
    return data
}