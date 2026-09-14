"use client"
import { useRouter } from "next/navigation"
import type { ChangeEvent } from "react"

type StatusFilterProps = {
    value: string | undefined
}

export default function StatusFilter({value}: StatusFilterProps){
    const router = useRouter()

    function handleChange(e: ChangeEvent<HTMLSelectElement>){
        if(e.target.value === ''){
            router.push('/')
        } else {
            router.push(`/?status=${e.target.value}`)
        }
    }

    return (
        <select className="rounded-lg border border-zinc-200 px-3 py-2 text-sm" onChange={handleChange} value={value ?? ""} aria-label="Status">
            <option value="">All statuses</option>
            <option value="scheduled">Scheduled</option>
            <option value="departed">Departed</option>
            <option value="arrived">Arrived</option>
            <option value="cancelled">Cancelled</option>
            <option value="diverted">Diverted</option>
        </select>
    )
}