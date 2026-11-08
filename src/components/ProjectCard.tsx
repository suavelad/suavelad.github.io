import type { Project } from '../data/site'
import { ArrowIcon } from './Icons'
import { Badge, Card, ExtLink, LogoTile, Tag } from './ui'

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <Card className={`flex flex-col ${p.link ? 'transition hover:-translate-y-0.5 hover:border-accent/50' : ''}`}>
      <div className="flex items-start justify-between gap-3">
        {p.logo ? <LogoTile src={p.logo} name={p.name} /> : <span />}
        <Badge>{p.status}</Badge>
      </div>
      <p className="mt-4 text-xs uppercase tracking-wider text-muted">{p.category}</p>
      <h3 className="mt-1.5 text-lg font-bold">
        {p.link ? (
          <ExtLink href={p.link} className="hover:text-accent">
            {p.name}
          </ExtLink>
        ) : (
          p.name
        )}
      </h3>
      {p.role && <p className="text-sm font-medium text-accent">{p.role}</p>}
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.text}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {p.tech.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
      {p.link && (
        <ExtLink
          href={p.link}
          className="mt-4 inline-flex items-center gap-1 self-start text-sm font-medium text-accent hover:underline"
        >
          {p.linkLabel ?? 'Visit'} <ArrowIcon className="h-3.5 w-3.5" />
        </ExtLink>
      )}
    </Card>
  )
}
