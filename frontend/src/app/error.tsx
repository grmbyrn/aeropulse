"use client"
type ErrorProps = {
    error: Error & {digest?: string},
    retry: () => void
}

export default function Error({retry}: ErrorProps){
    return (
        <>
            <p>Could not load flight data</p>
            <button onClick={retry}>Retry</button>
        </>
    )
}