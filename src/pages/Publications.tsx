import { links, publications } from '../data/site'
import PublicationList from '../components/PublicationList'
import { OrcidIcon, ScholarIcon } from '../components/Icons'
import { ExtLink, PageHeader, Section, btnGhost } from '../components/ui'

export default function Publications() {
  const sorted = [...publications].sort((a, b) => b.year - a.year)
  return (
    <>
      <PageHeader eyebrow="Publications" title="Papers & preprints">
        Peer-reviewed work, preprints and manuscripts in progress. Status is shown for each entry.
      </PageHeader>

      <div className="mt-8 flex flex-wrap gap-3">
        <ExtLink href={links.scholar} className={btnGhost}>
          <ScholarIcon className="h-4 w-4" /> Google Scholar
        </ExtLink>
        <ExtLink href={links.orcid} className={btnGhost}>
          <OrcidIcon className="h-4 w-4" /> ORCID
        </ExtLink>
      </div>

      <Section title={`All publications (${sorted.length})`}>
        <PublicationList items={sorted} />
      </Section>
    </>
  )
}
