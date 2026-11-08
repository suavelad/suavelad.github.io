import { links, publications, research } from '../data/site'
import PublicationList from '../components/PublicationList'
import { Badge, Card, ExtLink, MoreLink, PageHeader, Section } from '../components/ui'

export default function Research() {
  return (
    <>
      <PageHeader eyebrow="Research" title="Reliable, secure and accessible AI">
        Graduate research at Carnegie Mellon University on accessible financial technology, AI safety and
        applied machine learning.
      </PageHeader>

      <Section title="Research statement">
        <div className="max-w-3xl space-y-4 leading-relaxed text-muted">
          {research.statement.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Section>

      <Section title="Current work">
        <div className="space-y-4">
          {research.projects.map((p) => (
            <Card key={p.title}>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-lg font-bold">{p.title}</h3>
                <Badge>{p.status}</Badge>
              </div>
              <p className="mt-1 text-sm text-muted">{p.with}</p>
              <p className="mt-3 leading-relaxed">{p.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Interests">
        <div className="grid gap-4 sm:grid-cols-2">
          {research.interests.map((i) => (
            <Card key={i.title}>
              <h3 className="font-bold">{i.title}</h3>
              <p className="mt-2 text-sm text-muted">{i.items.join(' · ')}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Publications" action={<MoreLink to="/publications">All publications</MoreLink>}>
        <PublicationList items={[...publications].sort((a, b) => b.year - a.year)} />
      </Section>

      <Section title="Profiles">
        <p className="text-muted">
          Find my work on{' '}
          <ExtLink href={links.scholar} className="font-medium text-accent hover:underline">
            Google Scholar
          </ExtLink>{' '}
          and{' '}
          <ExtLink href={links.orcid} className="font-medium text-accent hover:underline">
            ORCID
          </ExtLink>
          .
        </p>
      </Section>
    </>
  )
}
