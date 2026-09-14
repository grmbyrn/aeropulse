export default function Home() {
  return (
    <main className="flex-1 px-6 py-8">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Operations overview
        </h1>
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="h-24 rounded-lg border border-zinc-200" />
          <div className="h-24 rounded-lg border border-zinc-200" />
          <div className="h-24 rounded-lg border border-zinc-200" />
        </section>

        <section>
          <div className="h-64 rounded-lg border border-zinc-200" />
        </section>
      </div>
    </main>
  );
}
