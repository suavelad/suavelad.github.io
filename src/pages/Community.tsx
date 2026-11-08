import { community, links, mentorshipAreas, volunteering, workshops } from '../data/site'
import type { Org } from '../data/site'
import { ArrowIcon } from '../components/Icons'
import { Card, ExtLink, LogoTile, PageHeader, Section, btnPrimary } from '../components/ui'

function OrgCard({ o }: { o: Org }) {
  return (
    <Card className="flex items-start gap-4">
      <LogoTile src={o.logo} name={o.org} />
      <div className="min-w-0">
        <h3 className="font-bold">
          {o.url ? (
            <ExtLink href={o.url} className="inline-flex items-center gap-1 hover:text-accent">
              {o.org} <ArrowIcon className="h-3.5 w-3.5" />
            </ExtLink>
          ) : (
            o.org
          )}
        </h3>
        <p className="text-sm font-medium text-accent">{o.role}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">{o.text}</p>
      </div>
    </Card>
  )
}

export default function Community() {
  return (
    <>
      <PageHeader eyebrow="Community & Volunteering" title="Growing communities, sharing knowledge">
        Technology ecosystems grow when people have access to knowledge, supportive communities and room to learn by
        doing. Here is where I give my time.
      </PageHeader>

      <Section title="Community leadership">
        <div className="grid gap-4 sm:grid-cols-2">
          {community.map((c) => (
            <OrgCard key={c.org} o={c} />
          ))}
        </div>
      </Section>

      <Section title="Workshops">
        <div className="space-y-10">
          {workshops.map((w) => (
            <article key={w.title}>
              <h3 className="font-semibold">{w.title}</h3>
              <p className="mt-1 text-sm text-muted">{w.summary}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-[1.4fr_1fr]">
                {w.photos.map((ph) => (
                  <img
                    key={ph.src}
                    src={ph.src}
                    alt={ph.alt}
                    width={ph.w}
                    height={ph.h}
                    loading="lazy"
                    decoding="async"
                    className="h-64 w-full rounded-2xl border border-line object-cover shadow-card sm:h-72"
                  />
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Volunteering">
        <div className="grid gap-4 sm:grid-cols-2">
          {volunteering.map((v) => (
            <OrgCard key={v.org + v.role} o={v} />
          ))}
        </div>
      </Section>

      <Section title="Mentorship">
        <Card className="p-8">
          <p className="max-w-2xl leading-relaxed text-muted">
            Knowledge becomes more valuable when shared. I offer free 1:1 sessions on ADPList, where I was recognised as
            a Top 100 Mentor. I can help with:
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {mentorshipAreas.map((m) => (
              <li key={m} className="flex gap-2 text-sm">
                <span className="text-accent" aria-hidden="true">→</span> {m}
              </li>
            ))}
          </ul>
          <ExtLink href={links.adplist} className={`${btnPrimary} mt-6`}>
            Request mentorship on ADPList
          </ExtLink>
        </Card>
      </Section>
    </>
  )
}
