export function formatDateTime(datetime: string): string{
    return new Date(datetime).toLocaleString("en-GB", {dateStyle: "short", timeStyle: "short"})
}