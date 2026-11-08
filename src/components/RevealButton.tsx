import { useEffect, useId, useRef, useState } from 'react'
import type { ReactNode } from 'react'

/**
 * Round icon button that reveals a small panel (e.g. email or phone numbers).
 * Closes on outside click or Escape; focus returns to the button.
 */
export default function RevealButton({
  label,
  icon,
  children,
  className = '',
  align = 'left',
}: {
  label: string
  icon: ReactNode
  children: ReactNode
  className?: string
  align?: 'left' | 'right'
}) {
  const [open, setOpen] = useState(false)
  const [side, setSide] = useState<'left' | 'right'>(align)
  const id = useId()
  const wrap = useRef<HTMLDivElement>(null)
  const btn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        btn.current?.focus()
      }
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('touchstart', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('touchstart', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={wrap} className="relative">
      <button
        ref={btn}
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => {
          // open toward whichever side has room (panel is ~17rem wide)
          const r = btn.current?.getBoundingClientRect()
          if (r) setSide(r.right - 272 < 8 ? 'left' : r.left + 272 > window.innerWidth - 8 ? 'right' : align)
          setOpen((o) => !o)
        }}
        className={`${className} ${open ? 'border-accent text-accent' : ''}`}
      >
        {icon}
      </button>
      {open && (
        <div
          id={id}
          role="region"
          aria-label={label}
          className={`page-enter absolute top-full z-30 mt-2 w-max min-w-[16rem] max-w-[calc(100vw-2rem)] rounded-xl border border-line bg-surface p-3 text-sm shadow-card ${
            side === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          {children}
        </div>
      )}
    </div>
  )
}
