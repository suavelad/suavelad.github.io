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
  workshop,
} from '../data/site'
import { ArrowIcon, MailIcon } from '../components/Icons'
import { socials } from '../components/Layout'
import PublicationList from '../components/PublicationList'
import Typewriter from '../components/Typewriter'
import LocalTime from '../components/LocalTime'
import { Badge, ExtLink, LogoTile, MoreLink, Section, btnGhost, btnPrimary } from '../components/ui'

const industryProjects = projects.filter((p) => p.status !== 'Research')

/** Rotating lines in the hero: everything here is backed by content on the site */
const HERO_PHRASES = [
  'reliable backend systems.',
  'AI evaluation infrastructure.',
  'accessible fintech for Africa.',
  'products as Co-founder & CTO.',
]
const certsSorted = [...certifications].sort((a, b) => Number(!!a.expired) - Number(!!b.expired))

/** Compact product / project row: logo, name, role, one-liner, link */
function WorkRow({ p }: { p: Project }) {
  const inner = (
    <>
      <LogoTile src={p.logoMark ?? p.logo} name={p.name} size="lg" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <h3 className="font-semibold leading-snug transition group-hover:text-accent">{p.name}</h3>
          <Badge>{p.status}</Badge>
        </div>
        <p className="text-sm text-muted">
          {p.role ? <span className="font-medium text-accent">{p.role}</span> : p.category}
          {p.role && <span aria-hidden="true"> · </span>}
          {p.role && p.category}
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.text}</p>
        {p.linkLabel && (
          <p className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-accent">
            {p.linkLabel} <ArrowIcon className="h-3 w-3" />
          </p>
        )}
      </div>
    </>
  )
  const cls =
    'group -mx-4 flex gap-4 rounded-2xl px-4 py-4 transition sm:-mx-5 sm:px-5 lg:hover:bg-surface lg:hover:shadow-card'
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
      {/* Hero — full-bleed: the portrait fills the right side and fades into the page (both themes) */}
      <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
        {profile.photo && (
          <div className="relative mx-auto h-[24rem] max-w-md sm:h-[28rem] md:absolute md:inset-y-0 md:right-[max(0rem,calc((100vw-64rem)/2-2rem))] md:mx-0 md:h-auto md:w-[46%] md:max-w-[34rem] lg:w-[42%]">
            <img
              src={profile.photo}
              alt={profile.photoAlt}
              width={839}
              height={1004}
              fetchPriority="high"
              className="hero-photo h-full w-full object-cover object-[50%_20%]"
            />
            <div className="absolute right-4 top-4 z-10 flex items-center gap-2.5 rounded-xl border border-line bg-surface/90 px-3.5 py-2 text-sm font-medium shadow-card backdrop-blur md:bottom-6 md:right-0 md:top-auto md:px-4 md:py-2.5">
              <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              Available for hire
            </div>
          </div>
        )}

        <div className="relative mx-auto max-w-5xl px-4 pb-14 sm:px-6 md:flex md:min-h-[40rem] md:items-center md:py-20">
            <div className="-mt-14 max-w-xl md:mt-0 md:max-w-[30rem] lg:max-w-[32rem]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/90 px-3 py-1.5 text-xs font-semibold shadow-card backdrop-blur">
                  <LogoTile src="/images/orgs/cmu.webp" name="Carnegie Mellon University" size="xs" />
                  MSc IT · Carnegie Mellon
                </span>
                <span className="rounded-full border border-line bg-surface/90 px-3 py-1.5 text-xs text-muted shadow-card backdrop-blur">
                  <LocalTime />
                </span>
              </div>

              <h1 className="mt-7 font-display font-extrabold leading-[1.02] tracking-tight">
                <span className="block text-2xl text-muted sm:text-4xl">Hello, I'm</span>
                <span className="mt-1 block text-5xl sm:text-7xl">{profile.name}</span>
              </h1>

              <p className="mt-5 min-h-[1.3em] font-display text-xl font-bold tracking-tight sm:text-3xl">
                I build <Typewriter className="text-accent" phrases={HERO_PHRASES} />
              </p>

              <p className="mt-4 text-lg leading-relaxed text-muted">
                {profile.headline} with <strong className="font-semibold text-ink">{profile.years} years</strong> of
                experience — {profile.proof.charAt(0).toLowerCase() + profile.proof.slice(1)}
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

              <ul className="mt-8 flex flex-wrap items-center gap-3">
                {socials.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <ExtLink
                      href={href}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface/90 text-muted shadow-card transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                    >
                      <Icon className="h-[18px] w-[18px]" />
                      <span className="sr-only">{label}</span>
                    </ExtLink>
                  </li>
                ))}
                <li>
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface/90 text-muted shadow-card transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                  >
                    <MailIcon className="h-[18px] w-[18px]" />
                    <span className="sr-only">Email</span>
                  </a>
                </li>
              </ul>
            </div>

          <a
            href="#experience-across"
            aria-label="Scroll down"
            className="absolute bottom-6 left-1/2 hidden h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-line bg-surface/80 text-muted transition hover:text-accent md:flex"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 motion-safe:animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </a>
        </div>
      </section>

      {/* Experience across — coloured logos, slow continuous scroll (pauses on hover; static for reduced motion) */}
      <section id="experience-across" aria-label="Organisations I have worked with" className="scroll-mt-16 border-y border-line py-7">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">Experience across</p>
        <div className="marquee mt-5 overflow-hidden">
          <div className="marquee-track flex w-max items-center">
            {[0, 1].map((dup) => (
              <ul key={dup} aria-hidden={dup === 1 ? true : undefined} className="flex shrink-0 items-center gap-12 pr-12">
                {experience.map((e) => (
                  <li key={e.company} className="flex items-center gap-3 whitespace-nowrap">
                    <LogoTile src={e.logo} name={e.company.split(',')[0]} size="sm" />
                    <span className="text-base font-semibold">{e.company.split(',')[0]}</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      {/* 01 — Experience */}
      <Section index="01" title="Experience" action={<MoreLink to="/professional">Full career</MoreLink>}>
        <ol className="space-y-1">
          {experience.map((e) => (
            <li
              key={e.company + e.role}
              className="-mx-4 grid gap-1 rounded-2xl px-4 py-4 transition sm:-mx-5 sm:grid-cols-[7.5rem_1fr] sm:gap-5 sm:px-5 lg:hover:bg-surface lg:hover:shadow-card"
            >
              <p className="pt-0.5 font-mono text-[11px] uppercase tracking-wide text-muted">{e.period}</p>
              <div className="flex gap-4">
                <LogoTile src={e.logo} name={e.company.split(',')[0]} size="sm" />
                <div className="min-w-0">
                  <h3 className="font-semibold leading-snug">
                    {e.role} <span className="font-normal text-muted">· {e.company.split(',')[0]}</span>
                  </h3>
                  {e.highlight && <p className="mt-1 text-sm font-medium text-accent">{e.highlight}</p>}
                  {e.tech && <p className="mt-1.5 text-xs text-muted">{e.tech.join(' · ')}</p>}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* 03 — Products */}
      <Section index="02" title="Products" action={<MoreLink to="/professional">All work</MoreLink>}>
        <div className="space-y-1">
          {products.map((p) => (
            <WorkRow key={p.name} p={p} />
          ))}
          {industryProjects.map((p) => (
            <WorkRow key={p.name} p={p} />
          ))}
        </div>
      </Section>

      {/* 04 — Research & publications */}
      <Section index="03" title="Research" action={<MoreLink to="/publications">Publications</MoreLink>}>
        <p className="mb-5 leading-relaxed text-muted">{research.statement[0]}</p>
        <PublicationList items={[...publications].sort((a, b) => b.year - a.year).slice(0, 3)} />
      </Section>

      {/* 05 — Skills */}
      <Section index="04" title="Skills">
        <dl className="divide-y divide-line border-y border-line">
          {skills.map((g) => (
            <div key={g.group} className="grid gap-1 py-3 sm:grid-cols-[8.5rem_1fr] sm:gap-4">
              <dt className="text-sm font-semibold">{g.group}</dt>
              <dd className="text-sm leading-relaxed text-muted">{g.items.join(' · ')}</dd>
            </div>
          ))}
        </dl>
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
        <figure className="mt-5 overflow-hidden rounded-2xl border border-line bg-surface shadow-card sm:grid sm:grid-cols-[14rem_1fr]">
          <img
            src={workshop.photos[0].src}
            alt={workshop.photos[0].alt}
            width={900}
            height={1196}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full object-cover sm:aspect-auto sm:h-full"
          />
          <figcaption className="p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Teaching</p>
            <p className="mt-2 font-semibold leading-snug">{workshop.title}</p>
            <p className="mt-1.5 text-sm text-muted">{workshop.summary}</p>
            <Link to="/community" className="mt-3 inline-block text-sm font-semibold text-accent hover:underline">
              See the workshop
            </Link>
          </figcaption>
        </figure>
        <p className="mt-5 text-sm leading-relaxed text-muted">
          ADPList Top 100 Mentor — I mentor aspiring engineers on backend, cloud, applied AI and career growth.{' '}
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
