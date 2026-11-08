import { awards, certifications, education } from '../data/site'
import { ArrowIcon } from '../components/Icons'
import { Card, ExtLink, LogoTile, PageHeader, Section } from '../components/ui'

export default function Education() {
  return (
    <>
      <PageHeader eyebrow="Education" title="Academic foundation">
        From electrical engineering to applied machine learning and systems.
      </PageHeader>

      <Section title="Degrees">
        <div className="space-y-4">
          {education.map((e) => (
            <Card key={e.school}>
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                <h3 className="text-lg font-bold">{e.school}</h3>
                <p className="shrink-0 text-sm text-muted">{e.period}</p>
              </div>
              <p className="mt-1 font-medium text-accent">{e.degree}</p>
              <p className="text-sm text-muted">{e.location}</p>
              {e.notes.length > 0 && (
                <ul className="mt-4 list-disc space-y-1 pl-5 text-sm marker:text-accent">
                  {e.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              )}
              {e.coursework.length > 0 && (
                <>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted">Relevant coursework</p>
                  <p className="mt-2 text-sm leading-relaxed">{e.coursework.join(' · ')}</p>
                </>
              )}
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Certifications">
        <ul className="grid gap-3 sm:grid-cols-2">
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
      </Section>

      <Section title="Awards & recognition">
        <ul className="divide-y divide-line border-y border-line">
          {awards.map((a) => (
            <li key={a.name} className="flex items-center gap-4 py-3.5">
              <LogoTile src={a.logo} name={a.name} size="sm" />
              <span className="flex-1">{a.name}</span>
              {a.year && <span className="shrink-0 text-sm text-muted">{a.year}</span>}
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
