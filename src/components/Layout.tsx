import { useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { links, profile } from '../data/site'
import { GitHubIcon, LinkedInIcon, MoonIcon, OrcidIcon, ScholarIcon, SunIcon, XIcon } from './Icons'
import { ExtLink, btnPrimary } from './ui'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/professional', label: 'Professional' },
  { to: '/research', label: 'Research' },
  { to: '/publications', label: 'Publications' },
  { to: '/education', label: 'Education' },
  { to: '/community', label: 'Community' },
  { to: '/contact', label: 'Contact' },
]

export const socials = [
  { href: links.github, label: 'GitHub', Icon: GitHubIcon },
  { href: links.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
  { href: links.x, label: 'X (Twitter)', Icon: XIcon },
  { href: links.scholar, label: 'Google Scholar', Icon: ScholarIcon },
  { href: links.orcid, label: 'ORCID', Icon: OrcidIcon },
]

/** Dark by default. Only an explicit click is remembered, so first-time visitors always get dark. */
function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  const toggle = () => {
    const next = !dark
    const root = document.documentElement
    root.classList.add('theme-switching')
    root.classList.toggle('dark', next)
    window.setTimeout(() => root.classList.remove('theme-switching'), 250)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next ? '#0f1726' : '#faf8f4')
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch {
      /* storage unavailable */
    }
    setDark(next)
  }
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-line text-muted transition hover:text-ink"
    >
      {dark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
    </button>
  )
}

const linkCls = ({ isActive }: { isActive: boolean }) =>
  `relative py-1 text-sm transition ${isActive ? 'font-semibold text-ink after:absolute after:inset-x-0 after:-bottom-[19px] after:h-0.5 after:rounded-full after:bg-accent' : 'text-muted hover:text-ink'}`

function useScrollY() {
  const [y, setY] = useState(0)
  useEffect(() => {
    const on = () => setY(window.scrollY)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return y
}

function BackToTop({ show }: { show: boolean }) {
  return (
    <button
      type="button"
      onClick={() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
      }}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      className={`fixed bottom-5 right-5 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-card transition hover:border-accent hover:text-accent sm:bottom-8 sm:right-8 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  )
}

export default function Layout() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const y = useScrollY()
  const menuBtn = useRef<HTMLButtonElement>(null)
  const firstLink = useRef<HTMLAnchorElement>(null)

  // Fade pages in on navigation, but not on first load (keeps first paint fast)
  const navigated = useRef(false)
  const firstPath = useRef(pathname)
  if (pathname !== firstPath.current) navigated.current = true

  // Close the menu on navigation
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Mobile menu: lock page scroll, Esc to close, manage focus
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstLink.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuBtn.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2 focus:shadow-card">
        Skip to content
      </a>

      <header
        className={`sticky top-0 z-40 border-b bg-bg/80 backdrop-blur-md transition-shadow supports-[backdrop-filter]:bg-bg/70 ${
          y > 8 || open ? 'border-line shadow-card' : 'border-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
          <NavLink to="/" className="serif text-2xl leading-none">
            {profile.name}
          </NavLink>

          <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
            {nav.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.to === '/'} className={linkCls}>
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ExtLink
              href={links.adplist}
              className="hidden rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-bg transition hover:opacity-90 sm:inline-block"
            >
              Book mentorship
            </ExtLink>
            <ThemeToggle />
            <button
              ref={menuBtn}
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-line lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu: full-height panel under the header */}
      {open && (
        <div className="fixed inset-x-0 bottom-0 top-16 z-30 lg:hidden">
          <button type="button" aria-label="Close menu" tabIndex={-1} className="absolute inset-0 h-full w-full bg-black/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <nav
            id="mobile-nav"
            aria-label="Mobile"
            className="page-enter relative max-h-full overflow-y-auto border-b border-line bg-surface px-4 pb-6 pt-2 shadow-card"
          >
            <ul className="divide-y divide-line">
              {nav.map((n, i) => (
                <li key={n.to}>
                  <NavLink
                    ref={i === 0 ? firstLink : undefined}
                    to={n.to}
                    end={n.to === '/'}
                    className={({ isActive }) =>
                      `flex items-center justify-between py-3.5 text-base ${isActive ? 'font-semibold text-accent' : 'text-ink'}`
                    }
                  >
                    {n.label}
                    <span aria-hidden="true" className="text-muted">→</span>
                  </NavLink>
                </li>
              ))}
            </ul>
            <ExtLink href={links.adplist} className={`${btnPrimary} mt-5 w-full justify-center`}>
              Book a mentorship session
            </ExtLink>
            <ul className="-ml-2.5 mt-4 flex items-center gap-1">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <ExtLink href={href} className="flex h-11 w-11 items-center justify-center rounded-lg text-muted transition hover:text-accent">
                    <Icon />
                    <span className="sr-only">{label}</span>
                  </ExtLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-4 sm:px-6">
        <div key={pathname} className={navigated.current ? 'page-enter' : undefined}>
          <Outlet />
        </div>
      </main>

      <footer className="mt-16 border-t border-line bg-surface">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:grid-cols-[1.4fr_1fr] sm:px-6">
          <div>
            <p className="serif text-3xl">{profile.name}</p>
            <p className="mt-1 text-sm text-muted">{profile.headline}</p>
            <a href={`mailto:${profile.email}`} className="mt-4 inline-block text-sm font-medium text-accent hover:underline">
              {profile.email}
            </a>
            <ul className="-ml-2.5 mt-3 flex items-center gap-1">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <ExtLink href={href} className="flex h-11 w-11 items-center justify-center rounded-lg text-muted transition hover:text-accent">
                    <Icon className="h-[18px] w-[18px]" />
                    <span className="sr-only">{label}</span>
                  </ExtLink>
                </li>
              ))}
            </ul>
          </div>
          <nav aria-label="Footer">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Explore</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-6">
              {nav.map((n) => (
                <li key={n.to}>
                  <NavLink to={n.to} className="inline-flex min-h-10 min-w-10 items-center text-sm text-muted transition hover:text-accent">
                    {n.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="border-t border-line">
          <p className="mx-auto max-w-5xl px-4 py-5 text-xs text-muted sm:px-6">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
        </div>
      </footer>

      <BackToTop show={y > 900 && !open} />
    </div>
  )
}
