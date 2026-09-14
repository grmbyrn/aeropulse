import FlightTable from "@/components/FlightTable";
import MetricCard from "@/components/MetricCard";
import StatusFilter from "@/components/StatusFilter";
import { getFlights, getMetrics } from "@/lib/api";

export default async function Home(props: PageProps<"/">) {
  const {status} = await props.searchParams
  const statusString = typeof status === "string" ? status : undefined
  const [metrics, flights] = await Promise.all([getMetrics(), getFlights(statusString)])
  
  return (
    <main className="flex-1 px-6 py-8">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Operations overview
        </h1>
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <MetricCard label="Total flights" value={metrics.total_flights} />
        </section>

        <StatusFilter />
        <section>
          <FlightTable flights={flights} />
        </section>
      </div>
    </main>
  );
}
