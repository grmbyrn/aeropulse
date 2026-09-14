import { Flight } from "@/lib/api"
import { formatDateTime } from "@/lib/format"

type FlightTableProps = {
    flights: Flight[]
}

export default function FlightTable({flights}: FlightTableProps){
    if(flights.length === 0){
        return <p className="text-sm text-zinc-500">No flights match this filter.</p>
    }
    return (
        <table className="w-full text-left text-sm">
            <thead>
                <tr>
                    <th className="border-b border-zinc-200 py-2 font-medium">
                        Flight
                    </th>
                    <th className="border-b border-zinc-200 py-2 font-medium">
                        Airline
                    </th>
                    <th className="border-b border-zinc-200 py-2 font-medium">
                        From
                    </th>
                    <th className="border-b border-zinc-200 py-2 font-medium">
                        To
                    </th>
                    <th className="border-b border-zinc-200 py-2 font-medium">
                        Departs
                    </th>
                    <th className="border-b border-zinc-200 py-2 font-medium">
                        Actual
                    </th>
                    <th className="border-b border-zinc-200 py-2 font-medium">
                        Status
                    </th>
                </tr>
            </thead>
            <tbody>
                {flights.map(flight => (
                    <tr key={flight.id}>
                        <td className="border-b border-zinc-100 py-2">
                            {flight.flight_number}
                        </td>
                        <td className="border-b border-zinc-100 py-2">
                            {flight.airline_code}
                        </td>
                        <td className="border-b border-zinc-100 py-2">
                            {flight.origin_code}
                        </td>
                        <td className="border-b border-zinc-100 py-2">
                            {flight.destination_code}
                        </td>
                        <td className="border-b border-zinc-100 py-2">
                            {formatDateTime(flight.scheduled_departure)}
                        </td>
                        <td className="border-b border-zinc-100 py-2">
                            {flight.actual_departure ? formatDateTime(flight.actual_departure) : '—'}
                        </td>
                        <td className="border-b border-zinc-100 py-2">
                            {flight.status}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}