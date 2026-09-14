import MetricCard from "@/components/MetricCard";
import { getMetrics } from "@/lib/api";

export default async function Home() {
  const metrics = await getMetrics()
  return (
    <main className="flex-1 px-6 py-8">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Operations overview
        </h1>
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <MetricCard label="Total flights" value={metrics.total_flights} />
        </section>

        <section>
          <div className="h-64 rounded-lg border border-zinc-200" />
        </section>
      </div>
    </main>
  );
}
