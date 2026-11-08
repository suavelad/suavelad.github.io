import { useEffect, useState } from 'react'

/**
 * Types and deletes each phrase in turn. Screen readers get the full list once;
 * visitors who prefer reduced motion see the first phrase, static.
 */
export default function Typewriter({ phrases, className = '' }: { phrases: string[]; className?: string }) {
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [i, setI] = useState(0)
  const [text, setText] = useState(reduce ? phrases[0] : '')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduce) return
    const full = phrases[i % phrases.length]
    let delay = deleting ? 35 : 65
    if (!deleting && text === full) delay = 1800
    if (deleting && text === '') delay = 300
    const t = window.setTimeout(() => {
      if (!deleting && text === full) setDeleting(true)
      else if (deleting && text === '') {
        setDeleting(false)
        setI((n) => n + 1)
      } else setText(full.slice(0, text.length + (deleting ? -1 : 1)))
    }, delay)
    return () => window.clearTimeout(t)
  }, [text, deleting, i, phrases, reduce])

  return (
    <span className={className}>
      <span className="sr-only">{phrases.join(', ')}</span>
      <span aria-hidden="true">
        {text}
        <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-accent align-[-0.1em]" style={{ height: '1em' }} />
      </span>
    </span>
  )
}
