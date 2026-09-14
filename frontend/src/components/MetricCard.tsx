type MetricCardProps = {
    label: string
    value: number
}

export default function MetricCard({label, value}: MetricCardProps){
    return (
        <div className="rounded-lg border border-zinc-200 p-4">
            <p>{label}</p>
            <p>{value}</p>
        </div>
    )
}