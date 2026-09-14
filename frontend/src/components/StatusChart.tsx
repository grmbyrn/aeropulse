type StatusChartProps = {
    counts: Record<string, number>,
    total: number
}

export default function StatusChart({counts, total}: StatusChartProps){
    return (
        <div className="space-y-2">
            {Object.entries(counts).map(([status, count]) => (
                <div key={status}>
                    {status}
                    <div className="h-2 rounded bg-zinc-800" style={{ width: `${(count / total) * 100}%` }} />
                    {count}
                </div>
            ))}
        </div>
    )
}