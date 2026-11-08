import { Link } from 'react-router-dom'
import { awards, certifications, community, experience, links, openTo, products, workLocations, profile, projects, publications, research, skills } from '../data/site'
import ProjectCard from '../components/ProjectCard'
import { socials } from '../components/Layout'
import { ArrowIcon } from '../components/Icons'
import PublicationList from '../components/PublicationList'
import { ExtLink, LogoTile, MoreLink, Section, btnGhost, btnPrimary, slug } from '../components/ui'

const industryProjects = projects.filter((p) => p.status !== 'Research')

export default function Home() {
  const initials = profile.name.split(' ').map((w) => w[0]).join('')

  return (
    <>
      {/* Hero */}
      <section className="grid items-center gap-8 border-b border-line py-10 sm:py-24 md:grid-cols-[1fr_auto] md:gap-10">
        <div>
          <a
            href={`#${slug("Let's work together")}`}
            className="group mb-6 inline-flex items-center gap-3 rounded-full border border-line bg-surface p-1 pr-3.5 text-sm shadow-card transition hover:border-accent"
          >
            <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-bg">Open to</span>
            <span className="text-muted transition group-hover:text-ink">{openTo.join(' · ').replace('Speaking engagements', 'Speaking')}</span>
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-muted transition group-hover:translate-x-0.5 group-hover:text-accent" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <h1 className="font-display text-base font-bold tracking-tight text-accent sm:text-lg">
            {profile.name}
            <span className="sr-only"> — {profile.headline}</span>
          </h1>
          <p className="mt-3 font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl">
            {profile.pitch}
          </p>
          <p className="mt-4 max-w-2xl font-display text-xl font-semibold leading-snug text-muted sm:text-2xl">{profile.proof}</p>
          <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-base font-medium" aria-hidden="true">
            <span>{profile.headline}</span>
            <span className="text-line">|</span>
            <span>{profile.years} years</span>
            <span className="text-line">|</span>
            <span>{profile.location}</span>
          </p>
          {profile.intro.map((p) => (
            <p key={p} className="mt-4 max-w-2xl leading-relaxed text-muted">
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

        <div className="order-first md:order-none">
          {profile.photo ? (
            <img
              src={profile.photo}
              alt={`Portrait of ${profile.name}, arms crossed, wearing a black shirt`}
              fetchPriority="high"
              width={354}
              height={472}
              className="aspect-[3/4] w-36 rounded-2xl border border-line object-cover object-top shadow-2xl shadow-black/30 sm:w-56 md:w-64"
            />
          ) : (
            <div
              className="flex h-36 w-36 items-center justify-center rounded-2xl border border-line bg-surface font-display text-5xl font-extrabold text-accent sm:h-56 sm:w-56 md:h-64 md:w-64"
              aria-hidden="true"
            >
              {initials}
            </div>
          )}
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
      <Section title="Experience" action={<MoreLink to="/professional">Full career</MoreLink>}>
        <ol className="grid gap-x-8 sm:grid-cols-2">
          {experience.map((e) => (
            <li key={e.company + e.role} className="flex items-center gap-4 border-t border-line py-4">
              <LogoTile src={e.logo} name={e.company.split(',')[0]} size="sm" />
              <div className="min-w-0">
                <p className="font-semibold leading-snug">{e.company.split(',')[0]}</p>
                <p className="text-sm text-muted">{e.role}</p>
                {e.highlight && <p className="mt-1 text-sm font-medium text-accent">{e.highlight}</p>}
                <p className="mt-1 text-xs text-muted">{e.period}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Skills */}
      <Section title="Skills" action={<MoreLink to="/professional">Professional</MoreLink>}>
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
      <Section title="Products" action={<MoreLink to="/professional">Products & projects</MoreLink>}>
        <div className="grid gap-4 md:grid-cols-2">
          {products.map((p) => (
            <ProjectCard key={p.name} p={p} />
          ))}
        </div>
      </Section>

      {/* Research & publications */}
      <Section title="Research & publications" action={<MoreLink to="/research">Research</MoreLink>}>
        <p className="mb-6 max-w-3xl leading-relaxed text-muted">{research.statement[0]}</p>
        <PublicationList items={[...publications].sort((a, b) => b.year - a.year).slice(0, 3)} />
        <div className="mt-5">
          <MoreLink to="/publications">All publications</MoreLink>
        </div>
      </Section>

      {/* Selected (non-research) projects — research work is covered above */}
      {industryProjects.length > 0 && (
        <Section title="Selected projects">
          <div className={`grid gap-4 ${industryProjects.length > 1 ? 'md:grid-cols-2' : ''}`}>
            {industryProjects.map((p) => (
              <ProjectCard key={p.name} p={p} />
            ))}
          </div>
        </Section>
      )}

      {/* Certifications & awards */}
      <Section title="Certifications & awards" action={<MoreLink to="/education">Education</MoreLink>}>
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
      <Section title="Community & mentorship" action={<MoreLink to="/community">Community</MoreLink>}>
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
      <Section title="Let's work together">
        <div className="rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-10">
          <p className="max-w-2xl leading-relaxed text-muted">
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
          <div className="mt-7 flex flex-wrap gap-3">
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
        </div>
      </Section>
    </>
  )
}
