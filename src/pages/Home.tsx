import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { awards, certifications, community, experience, links, openTo, products, workLocations, profile, projects, publications, research, skills } from '../data/site'
import ProjectCard from '../components/ProjectCard'
import { socials } from '../components/Layout'
import { ArrowIcon } from '../components/Icons'
import PublicationList from '../components/PublicationList'
import { ExtLink, LogoTile, MoreLink, Section, btnGhost, btnPrimary, slug } from '../components/ui'

const industryProjects = projects.filter((p) => p.status !== 'Research')

/** Organisations shown in the "built at" marquee */
const builtAt = experience.map((e) => ({ name: e.company.split(',')[0], logo: e.logo }))

/** The phrase in the headline set in accent italics */
const EMPHASIS = 'AI systems'
const [pitchHead, pitchTail] = profile.pitch.includes(EMPHASIS)
  ? [profile.pitch.slice(0, profile.pitch.indexOf(EMPHASIS)), profile.pitch.slice(profile.pitch.indexOf(EMPHASIS) + EMPHASIS.length)]
  : [profile.pitch, '']

/** Live local time in Kigali — signals reachability across time zones */
function LocalTime() {
  const fmt = () =>
    new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Kigali' }).format(new Date())
  const [now, setNow] = useState(fmt)
  useEffect(() => {
    const id = window.setInterval(() => setNow(fmt()), 30_000)
    return () => window.clearInterval(id)
  }, [])
  return (
    <>
      Kigali, Rwanda <span aria-hidden="true">·</span> <time>{now}</time> local time (UTC+2)
    </>
  )
}

export default function Home() {
  const initials = profile.name.split(' ').map((w) => w[0]).join('')

  return (
    <>
      {/* Hero */}
      <section className="grid items-center gap-10 pb-14 pt-10 sm:pb-20 sm:pt-20 md:grid-cols-[1.3fr_0.7fr] md:gap-14">
        <div>
          <a
            href={`#${slug("Let's work together")}`}
            className="group mb-8 inline-flex items-center gap-3 rounded-full border border-line bg-surface p-1 pr-3.5 text-sm shadow-card transition hover:border-accent"
          >
            <span className="shrink-0 whitespace-nowrap rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-bg">Open to</span>
            <span className="text-muted transition group-hover:text-ink">
              <span className="sm:hidden">Roles · Research · Speaking</span>
              <span className="hidden sm:inline">{openTo.join(' · ').replace('Speaking engagements', 'Speaking')}</span>
            </span>
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-muted transition group-hover:translate-x-0.5 group-hover:text-accent" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <h1 className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            {profile.name}
            <span className="sr-only"> — {profile.headline}</span>
          </h1>
          <p className="serif mt-5 text-[3.25rem] leading-[0.98] sm:text-7xl lg:text-[5.75rem]">
            {pitchHead}
            <em className="whitespace-nowrap text-accent">{EMPHASIS}</em>
            {pitchTail}
          </p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{profile.proof}</p>
          <dl className="mt-8 grid max-w-xl grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line text-sm">
            {[
              ['Role', profile.headline.replace(' Engineer', '')],
              ['Experience', `${profile.years} years`],
              ['Based in', profile.location.split(',')[0]],
            ].map(([k, v]) => (
              <div key={k} className="bg-surface px-4 py-3">
                <dt className="text-[11px] uppercase tracking-[0.14em] text-muted">{k}</dt>
                <dd className="mt-1 font-medium leading-snug">{v}</dd>
              </div>
            ))}
          </dl>
          {profile.intro.map((p) => (
            <p key={p} className="mt-6 max-w-xl leading-relaxed text-muted">
              {p}
            </p>
          ))}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/professional" className={btnPrimary}>
              Explore my work
            </Link>
            <Link to="/contact" className={btnGhost}>
              Get in touch
            </Link>
            <a href={profile.cv} className={btnGhost} download>
              Download CV
            </a>
          </div>
          <ul className="-ml-2.5 mt-6 flex flex-wrap items-center gap-1">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <ExtLink href={href} className="flex h-11 w-11 items-center justify-center rounded-lg text-muted transition hover:text-accent">
                  <Icon />
                  <span className="sr-only">{label}</span>
                </ExtLink>
              </li>
            ))}
          </ul>
        </div>

        <figure className="order-first md:order-none">
          <div className="relative w-44 sm:w-60 md:ml-auto md:w-full md:max-w-[19rem]">
            <span className="absolute inset-0 translate-x-3 translate-y-3 rounded-[1.25rem] border border-accent/50" aria-hidden="true" />
            {profile.photo ? (
              <img
                src={profile.photo}
                alt={`Portrait of ${profile.name}, arms crossed, wearing a black shirt`}
                fetchPriority="high"
                width={350}
                height={468}
                className="relative aspect-[3/4] w-full rounded-[1.25rem] object-cover object-top shadow-2xl shadow-black/30"
              />
            ) : (
              <div className="serif relative flex aspect-[3/4] w-full items-center justify-center rounded-[1.25rem] bg-surface text-7xl text-accent" aria-hidden="true">
                {initials}
              </div>
            )}
          </div>
          <figcaption className="mt-6 text-xs text-muted md:text-right">
            <LocalTime />
          </figcaption>
        </figure>
      </section>

      {/* Built at — logo marquee */}
      <section aria-label="Organisations I have worked with" className="marquee overflow-hidden border-y border-line py-6">
        <div className="marquee-track flex w-max items-center gap-12">
          {[0, 1].map((dup) => (
            <ul key={dup} aria-hidden={dup === 1 ? true : undefined} className="flex shrink-0 items-center gap-12">
              {builtAt.map((o) => (
                <li key={o.name} className="flex items-center gap-3 whitespace-nowrap">
                  <LogoTile src={o.logo} name={o.name} size="sm" />
                  <span className="serif text-2xl text-muted">{o.name}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      {/* Jump links for a long page */}
      <nav aria-label="On this page" className="py-5">
        <ul className="flex flex-wrap gap-2">
          {['Experience', 'Skills', 'Products', 'Research & publications', 'Certifications & awards', 'Community & mentorship', "Let's work together"].map((t) => (
            <li key={t}>
              <a
                href={`#${slug(t)}`}
                className="inline-flex min-h-10 items-center whitespace-nowrap rounded-full border border-line bg-surface px-3.5 text-sm text-muted transition hover:border-accent hover:text-accent"
              >
                {t.replace(' & publications', '').replace('Certifications & awards', 'Awards').replace(' & mentorship', '').replace("Let's work together", 'Open to')}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Experience snapshot */}
      <Section index="01" title="Experience" action={<MoreLink to="/professional">Full career</MoreLink>}>
        <ol className="border-b border-line">
          {experience.map((e) => (
            <li
              key={e.company + e.role}
              className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-center gap-x-4 gap-y-1 border-t border-line py-5 sm:grid-cols-[2.5rem_minmax(0,1.15fr)_minmax(0,1fr)_9.5rem] sm:gap-x-6"
            >
              <LogoTile src={e.logo} name={e.company.split(',')[0]} size="sm" />
              <div className="min-w-0">
                <p className="serif text-2xl leading-tight">{e.company.split(',')[0]}</p>
                <p className="text-sm text-muted">{e.role}</p>
              </div>
              <p className="col-start-2 text-sm font-medium text-accent sm:col-start-auto">{e.highlight}</p>
              <p className="col-start-2 font-mono text-xs text-muted sm:col-start-auto sm:text-right">{e.period}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Skills */}
      <Section index="02" title="Skills" action={<MoreLink to="/professional">Professional</MoreLink>}>
        <dl className="divide-y divide-line border-y border-line">
          {skills.map((g) => (
            <div key={g.group} className="grid gap-1 py-3.5 sm:grid-cols-[9rem_1fr] sm:gap-4">
              <dt className="text-sm font-semibold">{g.group}</dt>
              <dd className="text-sm leading-relaxed text-muted">{g.items.join(' · ')}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Products */}
      <Section index="03" title="Products" action={<MoreLink to="/professional">Products & projects</MoreLink>}>
        <div className="grid gap-4 md:grid-cols-2">
          {products.map((p) => (
            <ProjectCard key={p.name} p={p} />
          ))}
        </div>
      </Section>

      {/* Research & publications */}
      <Section index="04" title="Research & publications" action={<MoreLink to="/research">Research</MoreLink>}>
        <p className="mb-6 max-w-3xl leading-relaxed text-muted">{research.statement[0]}</p>
        <PublicationList items={[...publications].sort((a, b) => b.year - a.year).slice(0, 3)} />
        <div className="mt-5">
          <MoreLink to="/publications">All publications</MoreLink>
        </div>
      </Section>

      {/* Selected (non-research) projects — research work is covered above */}
      {industryProjects.length > 0 && (
        <Section index="05" title="Selected projects">
          <div className={`grid gap-4 ${industryProjects.length > 1 ? 'md:grid-cols-2' : ''}`}>
            {industryProjects.map((p) => (
              <ProjectCard key={p.name} p={p} />
            ))}
          </div>
        </Section>
      )}

      {/* Certifications & awards */}
      <Section index="06" title="Certifications & awards" action={<MoreLink to="/education">Education</MoreLink>}>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">Certifications</h3>
            <ul className="space-y-3">
              {[...certifications].sort((a, b) => Number(!!a.expired) - Number(!!b.expired)).map((c) => (
                <li key={c.name} className="flex items-center gap-4 rounded-xl border border-line bg-surface px-4 py-3.5">
                  <LogoTile src={c.logo} name={c.issuer} size="sm" />
                  <div>
                    <p className="font-semibold">{c.name}</p>
                    <p className="text-sm text-muted">
                      {c.issuer}
                      {c.year && ` · ${c.year}`}
                      {c.expired && <span className="ml-2 rounded bg-surface-2 px-1.5 py-0.5 text-xs">Expired</span>}
                    </p>
                  </div>
                {c.verify && (
                    <ExtLink href={c.verify} className="ml-auto inline-flex shrink-0 items-center gap-1 self-center rounded-lg px-2 py-2 text-sm font-medium text-accent hover:underline">
                      Verify <ArrowIcon className="h-3.5 w-3.5" />
                      <span className="sr-only">{c.name} credential</span>
                    </ExtLink>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">Awards & recognition</h3>
            <ul className="divide-y divide-line border-y border-line">
              {awards.map((a) => (
                <li key={a.name} className="flex items-center gap-4 py-3.5 text-sm leading-relaxed">
                  <LogoTile src={a.logo} name={a.name} size="sm" />
                  <span className="flex-1">{a.name}</span>
                  {a.year && <span className="shrink-0 text-muted">{a.year}</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Community & mentorship */}
      <Section index="07" title="Community & mentorship" action={<MoreLink to="/community">Community</MoreLink>}>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {community.map((c) => (
            <li key={c.org} className="flex min-w-0 items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3">
              <LogoTile src={c.logo} name={c.org} size="sm" />
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-snug">{c.org}</p>
                <p className="truncate text-xs text-muted">{c.role}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 rounded-2xl border border-line bg-surface p-6 sm:p-10">
          <h3 className="text-xl font-bold sm:text-2xl">Looking for a mentor?</h3>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">
            I mentor aspiring engineers on backend and cloud engineering, getting into applied AI, and career growth —
            recognised as an ADPList Top 100 Mentor.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ExtLink href={links.adplist} className={btnPrimary}>
              Book a session on ADPList
            </ExtLink>
            <Link to="/community" className={btnGhost}>
              Mentorship areas
            </Link>
          </div>
        </div>
      </Section>

      {/* Open to / closing CTA */}
      <section id={slug("Let's work together")} className="mt-6 overflow-hidden rounded-[1.75rem] border border-line bg-surface px-6 py-14 shadow-card sm:px-14 sm:py-20">
        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          <span className="h-px w-8 bg-accent" aria-hidden="true" />
          Let's work together
        </p>
        <h2 className="serif mt-6 max-w-3xl text-5xl leading-[1.02] sm:text-7xl">
          Let's build something <em className="text-accent">remarkable</em>.
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Hiring, researching or organising an event? I'm currently open to:
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {openTo.map((o) => (
            <li key={o} className="rounded-full bg-accent-soft px-3.5 py-1.5 text-sm font-medium text-accent">
              {o}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted">
          <span className="font-semibold text-ink">Location:</span> {workLocations.join(' · ')}
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a href={`mailto:${profile.email}`} className={btnPrimary}>
            Email me
          </a>
          <ExtLink href={links.linkedin} className={btnGhost}>
            Connect on LinkedIn
          </ExtLink>
          <a href={profile.cv} className={btnGhost} download>
            Download CV
          </a>
        </div>
      </section>
    </>
  )
}
