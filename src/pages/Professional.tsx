import { experience, products, projects, skills } from '../data/site'
import ProjectCard from '../components/ProjectCard'
import { LogoTile, PageHeader, Section, Tag } from '../components/ui'

export default function Professional() {
  return (
    <>
      <PageHeader eyebrow="Professional" title="Experience, products & projects">
        Backend platforms, fintech and telephony services, and AI-powered products — from a national railway e-ticketing
        system to AI evaluation infrastructure.
      </PageHeader>

      <Section title="Career">
        <ol className="divide-y divide-line border-y border-line">
          {experience.map((e) => (
            <li key={e.company + e.role} className="flex gap-4 py-8 sm:gap-5">
              <LogoTile src={e.logo} name={e.company.split(',')[0]} />
              <div className="min-w-0 flex-1">
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                <div>
                  <h3 className="text-lg font-bold leading-snug">{e.role}</h3>
                  <p className="text-muted">{e.company}</p>
                </div>
                <p className="shrink-0 text-sm text-muted">{e.period}</p>
              </div>
              <p className="mt-2 text-muted">{e.summary}</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed marker:text-accent">
                {e.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              {e.tech && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {e.tech.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              )}
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Technical skills">
        <dl className="divide-y divide-line border-y border-line">
          {skills.map((s) => (
            <div key={s.group} className="grid gap-2 py-4 sm:grid-cols-[10rem_1fr]">
              <dt className="font-semibold">{s.group}</dt>
              <dd className="text-muted">{s.items.join(' · ')}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Products">
        <p className="-mt-3 mb-6 text-muted">Ventures I co-founded and lead as CTO — owning architecture, engineering and delivery.</p>
        <div className="grid gap-4 md:grid-cols-2">
          {products.map((p) => (
            <ProjectCard key={p.name} p={p} />
          ))}
        </div>
      </Section>

      <Section title="Projects">
        <p className="-mt-3 mb-6 text-muted">Research and industry engineering work.</p>
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.name} p={p} />
          ))}
        </div>
      </Section>
    </>
  )
}
