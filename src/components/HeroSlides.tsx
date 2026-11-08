import { useEffect, useRef, useState } from 'react'

export type Slide = { src: string; alt: string; w: number; h: number; pos: string }

/**
 * Cross-fading hero photos with a slow zoom ("Ken Burns").
 * - Auto-advances every `interval` ms; pauses while hovered or focused.
 * - Respects prefers-reduced-motion: shows the first photo, no auto-play, no zoom.
 * - Only the first photo is fetched eagerly; the rest load lazily after first paint.
 */
export default function HeroSlides({
  slides,
  interval = 6000,
  className = '',
}: {
  slides: Slide[]
  interval?: number
  className?: string
}) {
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const [ready, setReady] = useState(false) // start loading the other slides after first paint
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 1200)
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => {
    if (reduce || paused || slides.length < 2) return
    const t = window.setTimeout(() => setI((n) => (n + 1) % slides.length), interval)
    return () => window.clearTimeout(t)
  }, [i, paused, reduce, interval, slides.length])

  return (
    <div
      ref={root}
      className={className}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((s, n) => {
        const active = n === i
        if (n > 0 && !ready) return null
        return (
          <img
            key={s.src}
            src={s.src}
            alt={active ? s.alt : ''}
            aria-hidden={active ? undefined : true}
            width={s.w}
            height={s.h}
            fetchPriority={n === 0 ? 'high' : 'low'}
            decoding="async"
            style={{
              objectPosition: s.pos,
              transitionProperty: 'opacity, transform',
              transitionTimingFunction: 'ease-out',
              transitionDuration: reduce ? '0ms' : active ? '1200ms, 7000ms' : '1200ms, 0ms',
              transitionDelay: active ? '0ms, 0ms' : '0ms, 1200ms', // reset zoom only after the fade-out
            }}
            className={`absolute inset-0 h-full w-full object-cover ${active ? 'opacity-100' : 'opacity-0'} ${
              !reduce && active ? 'scale-[1.06]' : 'scale-100'
            }`}
          />
        )
      })}

      {slides.length > 1 && (
        <div className="absolute bottom-24 right-6 z-10 flex gap-1 md:bottom-28 md:right-10" role="group" aria-label="Choose photo">
          {slides.map((s, n) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setI(n)}
              aria-label={`Show photo ${n + 1} of ${slides.length}`}
              aria-pressed={n === i}
              className="flex h-6 min-w-6 items-center justify-center"
            >
              <span
                className={`block h-1.5 rounded-full transition-all ${n === i ? 'w-7 bg-accent' : 'w-3 bg-ink/40 hover:bg-ink/70'}`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
