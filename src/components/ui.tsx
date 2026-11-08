import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowIcon } from './Icons'

export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <header className="border-b border-line pb-8 pt-10 sm:pb-10 sm:pt-20">
      <p className="text-sm font-medium uppercase tracking-[0.14em] text-accent">{eyebrow}</p>
      <h1 className="mt-3 text-3xl font-extrabold sm:text-5xl">{title}</h1>
      {children && <div className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{children}</div>}
    </header>
  )
}

export const slug = (t: string) => t.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export function Section({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <section id={slug(title)} className="py-10 sm:py-12">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <span className="mb-3 block h-1 w-8 rounded-full bg-accent" aria-hidden="true" />
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-6 ${className}`}>{children}</div>
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-md bg-surface-2 px-2 py-0.5 text-xs text-muted">{children}</span>
  )
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent">
      {children}
    </span>
  )
}

export function MoreLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-sm font-medium text-accent hover:underline">
      {children} <ArrowIcon />
    </Link>
  )
}

export function ExtLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}

export const btnPrimary =
  'inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-bg shadow-card transition hover:-translate-y-px hover:opacity-90 active:translate-y-0'
export const btnGhost =
  'inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-5 py-2.5 text-sm font-semibold transition hover:-translate-y-px hover:border-accent hover:text-accent active:translate-y-0'

/** Square-ish white tile holding an org/product logo; falls back to initials. */
export function LogoTile({ src, name, size = 'md' }: { src?: string; name: string; size?: 'sm' | 'md' }) {
  // sm = fixed square (list rows align); md = may widen for wordmarks like ECHO
  const h = size === 'sm' ? 'h-10 w-10' : 'h-12 min-w-12'
  if (!src) {
    const initials = name
      .replace(/[^A-Za-z0-9 ]/g, ' ')
      .split(/\s+/)
      .filter((w) => w && w[0] === w[0].toUpperCase())
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
    return (
      <span
        className={`${h} flex shrink-0 items-center justify-center rounded-xl bg-accent-soft font-display text-sm font-extrabold text-accent`}
        aria-hidden="true"
      >
        {initials}
      </span>
    )
  }
  return (
    <span className={`${h} flex max-w-40 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1.5 ring-1 ring-black/5 dark:ring-white/10`}>
      <img src={src} alt={`${name} logo`} width={size === 'sm' ? 28 : 36} height={size === 'sm' ? 28 : 36} className="h-full w-auto max-w-full object-contain" loading="lazy" decoding="async" />
    </span>
  )
}

/** Copies text to the clipboard and confirms inline (announced to screen readers). */
export function CopyButton({ text, label, className = '' }: { text: string; label: string; className?: string }) {
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (!copied) return
    const t = window.setTimeout(() => setCopied(false), 1800)
    return () => window.clearTimeout(t)
  }, [copied])
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.setAttribute('readonly', '')
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(true)
  }
  return (
    <button type="button" onClick={copy} className={className}>
      <span aria-hidden="true">{copied ? 'Copied ✓' : label}</span>
      <span className="sr-only" aria-live="polite">
        {copied ? `${label}: copied to clipboard` : label}
      </span>
    </button>
  )
}
