import { useEffect, useState } from 'react'

const fmt = () =>
  new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Kigali' }).format(new Date())

/** Live local time in Kigali — signals reachability across time zones. */
export default function LocalTime() {
  const [now, setNow] = useState(fmt)
  useEffect(() => {
    const id = window.setInterval(() => setNow(fmt()), 30_000)
    return () => window.clearInterval(id)
  }, [])
  return (
    <>
      Kigali <span aria-hidden="true">·</span> <time>{now}</time> local time (UTC+2)
    </>
  )
}
