export function formatDate(dateString: string) : string {
    const date = new Date(dateString)

    return new Intl.DateTimeFormat('en-Us', {
        month: 'short',
        day: 'numeric'
    }).format(date)
}