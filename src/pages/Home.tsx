import { Link } from 'react-router-dom'
import type { Project } from '../data/site'
import {
  awards,
  certifications,
  community,
  experience,
  links,
  openTo,
  products,
  profile,
  projects,
  publications,
  research,
  skills,
  workLocations,
  workshops,
} from '../data/site'
import { ArrowIcon, MailIcon, PhoneIcon, WhatsAppIcon } from '../components/Icons'
import RevealButton from '../components/RevealButton'
import { socials } from '../components/Layout'
import Typewriter from '../components/Typewriter'
import HeroSlides from '../components/HeroSlides'
import LocalTime from '../components/LocalTime'
import { Badge, CopyButton, ExtLink, LogoTile, MoreLink, Section, btnGhost, btnPrimary } from '../components/ui'

const industryProjects = projects.filter((p) => p.status !== 'Research')

/** Round icon button style used in the hero */
const ROUND_BTN =
  'flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface/90 sm:h-11 sm:w-11 text-muted shadow-card transition hover:-translate-y-0.5 hover:border-accent hover:text-accent'

/** Hero background photos (cross-fade). First one loads eagerly. */
const HERO_SLIDES = [
  { src: '/images/gallery/hero-color.webp', w: 840, h: 1063, pos: '50% 18%', alt: 'Portrait of Sunday Ajayi in a black shirt, arms crossed' },
  { src: '/images/gallery/portrait-bw-hero.webp', w: 839, h: 1004, pos: '50% 22%', alt: 'Black-and-white portrait of Sunday Ajayi wearing glasses, arms crossed' },
  { src: '/images/gallery/hero-outdoor.webp', w: 840, h: 1117, pos: '50% 42%', alt: 'Sunday Ajayi smiling outdoors in a black leather jacket' },
  { src: '/images/gallery/hero-evening.webp', w: 840, h: 1117, pos: '50% 55%', alt: 'Sunday Ajayi laughing at an evening garden event in Kigali' },
]

/** Roles ribbon at the bottom of the hero — each backed by content on the site */
const ROLES = [
  'Software Engineer',
  'Applied AI',
  'Graduate Student & Researcher at Carnegie Mellon University',
  'Co-founder & CTO',
  'AWS User Group Kigali Co-organizer',
  'Python Rwanda Community Lead',
  'ADPList Mentor',
]

/** Rotating lines in the hero: everything here is backed by content on the site */
const HERO_PHRASES = [
  'build reliable software systems.',
  'architect scalable digital solutions.',
  'build AI evaluation infrastructure.',
  'build accessible fintech for Africa.',
  'build inclusive accessibility solutions.',
  'research safe and trustworthy AI.',
  'research accessible technology for all.',
  'build reliable digital products.',
  'facilitate and speak at tech events.',
  'mentor youths to build reliable careers.',
]
const certsSorted = [...certifications].sort((a, b) => Number(!!a.expired) - Number(!!b.expired))

/** Compact product / project card: logo, name + status, role, one-liner, link */
function WorkCard({ p }: { p: Project }) {
  const inner = (
    <>
      <div className="flex items-start gap-4">
        <LogoTile src={p.logoMark ?? p.logo} name={p.name} size="lg" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold leading-snug transition group-hover:text-accent">{p.name}</h3>
            <Badge>{p.status}</Badge>
          </div>
          <p className="mt-0.5 text-sm text-muted">
            {p.role ? <span className="font-medium text-accent">{p.role}</span> : p.category}
          </p>
        </div>
      </div>
      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">{p.text}</p>
      {p.linkLabel && (
        <p className="mt-auto inline-flex items-center gap-1 pt-3 text-xs font-semibold text-accent">
          {p.linkLabel} <ArrowIcon className="h-3 w-3" />
        </p>
      )}
    </>
  )
  const cls = 'group flex flex-col rounded-xl border border-line bg-surface p-5 transition hover:-translate-y-0.5 hover:border-accent/50'
  return p.link ? (
    <ExtLink href={p.link} className={cls}>
      {inner}
    </ExtLink>
  ) : (
    <div className={cls}>{inner}</div>
  )
}

export default function Home() {
  return (
    <>
      {/* Hero — full-screen, cross-fading photos behind the text (works in both themes) */}
      <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
        <HeroSlides slides={HERO_SLIDES} className="absolute inset-y-0 right-0 w-full md:w-[66%]" />
        {/* Readability: page-coloured wash on the text side, fading to clear over the photo */}
        <div className="pointer-events-none absolute inset-0 bg-bg/75 md:bg-transparent md:bg-gradient-to-r md:from-bg md:from-[34%] md:via-bg/70 md:via-[52%] md:to-bg/5" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-bg/70 to-transparent" aria-hidden="true" />

        <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl items-center px-4 pb-28 pt-12 sm:px-6 lg:px-10">
          <div className="max-w-xl md:max-w-[38rem] lg:max-w-[40rem]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/90 px-3 py-1.5 text-xs font-semibold shadow-card backdrop-blur">
                  <LogoTile src="/images/orgs/cmu.webp" name="Carnegie Mellon University" size="xs" />
                  M.Sc &rsquo;27 · Carnegie Mellon University
                </span>
                <span className="rounded-full border border-line bg-surface/90 px-3 py-1.5 text-xs text-muted shadow-card backdrop-blur">
                  <LocalTime />
                </span>
              </div>

              <h1 className="mt-7 font-display font-extrabold leading-[1.02] tracking-tight">
                <span className="block text-2xl text-muted sm:text-4xl">Hello, I'm</span>
                <span className="mt-1 block text-5xl sm:text-7xl">{profile.name}</span>
              </h1>

              <p className="mt-5 min-h-[2.8em] font-display text-xl font-bold leading-snug tracking-tight sm:min-h-[1.35em] sm:text-[1.65rem]">
                I <Typewriter className="text-accent" phrases={HERO_PHRASES} />
              </p>

              <p className="mt-4 text-lg leading-relaxed text-muted">
                {profile.headline} with <strong className="font-semibold text-ink">{profile.years} years</strong> of
                experience building systems at scale — {profile.proof.charAt(0).toLowerCase() + profile.proof.slice(1)}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={profile.cv} className={`${btnPrimary} px-6 py-3`} download>
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
                  </svg>
                  Download CV
                </a>
                <Link to="/professional" className={`${btnGhost} px-6 py-3`}>
                  View my work
                </Link>
              </div>

              <ul className="mt-8 flex flex-wrap items-center gap-2 sm:gap-3">
                {socials.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <ExtLink
                      href={href}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface/90 sm:h-11 sm:w-11 text-muted shadow-card transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                    >
                      <Icon className="h-[18px] w-[18px]" />
                      <span className="sr-only">{label}</span>
                    </ExtLink>
                  </li>
                ))}
                <li>
                  <RevealButton label="Email" icon={<MailIcon className="h-[18px] w-[18px]" />} className={ROUND_BTN} align="right">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Email</p>
                    <p className="mt-1.5 select-all font-medium">{profile.email}</p>
                    <div className="mt-3 flex gap-2">
                      <a href={`mailto:${profile.email}`} className={`${btnPrimary} px-3 py-1.5 text-xs`}>
                        Send email
                      </a>
                      <CopyButton text={profile.email} label="Copy" className={`${btnGhost} px-3 py-1.5 text-xs`} />
                    </div>
                  </RevealButton>
                </li>
                <li>
                  <RevealButton label="Phone" icon={<PhoneIcon className="h-[18px] w-[18px]" />} className={ROUND_BTN} align="right">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Phone</p>
                    <ul className="mt-1.5 space-y-2">
                      {profile.phones.map((ph) => (
                        <li key={ph.tel} className="flex items-center justify-between gap-3">
                          <a
                            href={ph.whatsapp ? `https://wa.me/${ph.tel.replace('+', '')}` : `tel:${ph.tel}`}
                            {...(ph.whatsapp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            className="inline-flex items-center gap-1.5 font-medium hover:text-accent"
                          >
                            {ph.whatsapp && <WhatsAppIcon className="h-3.5 w-3.5 text-emerald-500" />}
                            {ph.display}
                            <span className="ml-1 text-xs font-normal text-muted">{ph.label}</span>
                          </a>
                          <CopyButton text={ph.tel} label="Copy" className="rounded-md px-2 py-1 text-xs font-semibold text-accent hover:underline" />
                        </li>
                      ))}
                    </ul>
                  </RevealButton>
                </li>
              </ul>
            </div>
        </div>

        <div className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 items-center gap-2.5 rounded-xl border border-line bg-surface/85 px-4 py-2.5 text-sm font-medium shadow-card backdrop-blur sm:flex md:bottom-28 md:left-auto md:right-[max(1.5rem,calc((100vw-80rem)/2))] md:translate-x-0 md:mr-28">
          <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          Available for hire
        </div>

        {/* Roles ribbon */}
        <div className="marquee absolute inset-x-0 bottom-0 overflow-hidden border-t border-line bg-bg/70 py-4 backdrop-blur">
          <div className="marquee-track flex w-max items-center">
            {[0, 1].map((dup) => (
              <ul key={dup} aria-hidden={dup === 1 ? true : undefined} className="flex shrink-0 items-center">
                {ROLES.map((r) => (
                  <li key={r} className="flex items-center whitespace-nowrap font-display text-xl font-semibold tracking-tight text-ink/85 sm:text-2xl">
                    <span className="px-6 sm:px-8">{r}</span>
                    <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      {/* Experience — two-column grid */}
      <Section index="01" title="Experience" action={<MoreLink to="/professional">Full career</MoreLink>}>
        <ol className="grid gap-x-10 sm:grid-cols-2">
          {experience.map((e) => (
            <li key={e.company + e.role} className="flex gap-4 border-t border-line py-5">
              <LogoTile src={e.logo} name={e.company.split(',')[0]} size="lg" />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-semibold leading-snug">{e.company.split(',')[0]}</h3>
                  <span className="shrink-0 text-xs text-muted">{e.period}</span>
                </div>
                <p className="text-sm text-muted">{e.role}</p>
                {e.highlight && <p className="mt-1.5 text-sm font-medium text-accent">{e.highlight}</p>}
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Products — two-column compact cards */}
      <Section index="02" title="Products" action={<MoreLink to="/professional">All work</MoreLink>}>
        <div className="grid gap-3 sm:grid-cols-2">
          {[...products, ...industryProjects].map((p) => (
            <WorkCard key={p.name} p={p} />
          ))}
        </div>
      </Section>

      {/* Research — two-column compact cards */}
      <Section index="03" title="Research" action={<MoreLink to="/research">All research</MoreLink>}>
        <p className="mb-6 max-w-3xl leading-relaxed text-muted">{research.statement[0]}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[...publications]
            .sort((a, b) => b.year - a.year)
            .map((pub) => (
              <article key={pub.title} className="flex flex-col rounded-xl border border-line bg-surface p-5 transition hover:border-accent/50">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Publication · {pub.year}</span>
                  <Badge>{pub.status}</Badge>
                </div>
                <h3 className="mt-3 font-semibold leading-snug">
                  {pub.url ? (
                    <ExtLink href={pub.url} className="hover:text-accent">
                      {pub.title}
                    </ExtLink>
                  ) : (
                    pub.title
                  )}
                </h3>
                <p className="mt-1.5 line-clamp-1 text-sm text-muted">{pub.authors}</p>
                <p className="mt-auto pt-3 text-xs italic text-muted">{pub.venue}</p>
              </article>
            ))}
        </div>
      </Section>

      {/* Skills — compact cards with chips */}
      <Section index="04" title="Skills" action={<MoreLink to="/professional">Professional</MoreLink>}>
        <div className="grid gap-3 sm:grid-cols-2">
          {skills.map((g) => (
            <div key={g.group} className="rounded-xl border border-line bg-surface p-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{g.group}</h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {g.items.map((it) => (
                  <li key={it} className="rounded-md bg-surface-2 px-2 py-1 text-xs font-medium text-ink/85">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* 06 — Certifications & awards */}
      <Section index="05" title="Credentials" action={<MoreLink to="/education">All credentials</MoreLink>}>
        <ul className="grid gap-2 sm:grid-cols-2">
          {certsSorted.map((c) => (
            <li key={c.name} className="flex items-center gap-3 rounded-xl border border-line bg-surface px-3.5 py-3">
              <LogoTile src={c.logo} name={c.issuer} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-snug">{c.name}</p>
                <p className="text-xs text-muted">
                  {c.issuer}
                  {c.year && ` · ${c.year}`}
                  {c.expired && <span className="ml-1.5 rounded bg-surface-2 px-1.5 py-0.5">Expired</span>}
                </p>
              </div>
              {c.verify && (
                <ExtLink href={c.verify} className="shrink-0 rounded-lg px-1.5 py-2 text-xs font-semibold text-accent hover:underline">
                  Verify
                  <span className="sr-only"> {c.name} credential</span>
                </ExtLink>
              )}
            </li>
          ))}
        </ul>
        <ul className="mt-5 divide-y divide-line border-y border-line">
          {awards.map((a) => (
            <li key={a.name} className="flex items-center gap-3 py-3 text-sm leading-snug">
              <LogoTile src={a.logo} name={a.name} size="sm" />
              <span className="flex-1">{a.name}</span>
              {a.year && <span className="shrink-0 font-mono text-xs text-muted">{a.year}</span>}
            </li>
          ))}
        </ul>
      </Section>

      {/* 07 — Community & mentorship */}
      <Section index="06" title="Community" action={<MoreLink to="/community">All community</MoreLink>}>
        <ul className="grid gap-2 sm:grid-cols-2">
          {community.map((c) => (
            <li key={c.org} className="flex min-w-0 items-center gap-3 rounded-xl border border-line bg-surface px-3.5 py-3">
              <LogoTile src={c.logo} name={c.org} size="sm" />
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-snug">{c.org}</p>
                <p className="text-xs text-muted">{c.role}</p>
              </div>
            </li>
          ))}
        </ul>
        <figure className="mt-5 overflow-hidden rounded-2xl border border-line bg-surface shadow-card sm:grid sm:grid-cols-[18rem_1fr]">
          <img
            src={workshops[0].photos[0].src}
            alt={workshops[0].photos[0].alt}
            width={workshops[0].photos[0].w}
            height={workshops[0].photos[0].h}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full object-cover sm:aspect-auto sm:h-full"
          />
          <figcaption className="p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Facilitation</p>
            <p className="mt-2 font-semibold leading-snug">{workshops[0].title}</p>
            <p className="mt-1.5 text-sm text-muted">{workshops[0].summary}</p>
            <Link to="/community" className="mt-2 inline-flex min-h-10 items-center text-sm font-semibold text-accent hover:underline">
              See all workshops
            </Link>
          </figcaption>
        </figure>
        <p className="mt-5 text-sm leading-relaxed text-muted">
          ADPList Mentor — I mentor aspiring engineers on backend, cloud, applied AI and career growth.{' '}
          <ExtLink href={links.adplist} className="font-semibold text-accent hover:underline">
            Book a session
          </ExtLink>
        </p>
      </Section>

      {/* Closing CTA */}
      <section id="lets-work-together" className="scroll-mt-20 py-10 sm:py-12">
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-card sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Let's work together</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Let's build something <em className="text-accent">remarkable</em>.
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {openTo.map((o) => (
              <li key={o} className="rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent">
                {o}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-muted">
            <span className="font-semibold text-ink">Location:</span> {workLocations.join(' · ')}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} className={btnPrimary}>
              Email me
            </a>
            <ExtLink href={links.linkedin} className={btnGhost}>
              LinkedIn
            </ExtLink>
            <a href={profile.cv} className={btnGhost} download>
              Download CV
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
