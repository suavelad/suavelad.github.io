import type { Publication } from '../data/site'
import { profile } from '../data/site'
import { ArrowIcon } from './Icons'
import { Badge, CopyButton, ExtLink } from './ui'

function Authors({ text }: { text: string }) {
  // Bold the site owner's name in the author list
  const me = /S\.\s?Ajayi|Sunday Ajayi/
  const parts = text.split(me)
  const match = text.match(me)
  if (!match) return <>{text}</>
  return (
    <>
      {parts[0]}
      <strong className="font-semibold text-ink">{match[0]}</strong>
      {parts.slice(1).join(match[0])}
    </>
  )
}

export default function PublicationList({ items }: { items: Publication[] }) {
  return (
    <ol className="divide-y divide-line border-y border-line">
      {items.map((p) => (
        <li key={p.title} className="grid gap-2 py-6 sm:grid-cols-[4rem_1fr]">
          <span className="font-display text-sm font-bold text-muted">{p.year}</span>
          <div>
            <h3 className="text-lg font-semibold leading-snug">
              {p.url ? (
                <ExtLink href={p.url} className="hover:text-accent">
                  {p.title}
                </ExtLink>
              ) : (
                p.title
              )}
            </h3>
            <p className="mt-1.5 text-sm text-muted">
              <Authors text={p.authors} />
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
              <span className="italic text-muted">{p.venue}</span>
              <Badge>{p.status}</Badge>
              <CopyButton
                text={`${p.authors} (${p.year}). ${p.title}. ${p.venue}.${p.url ? ` ${p.url}` : ''}`}
                label="Copy citation"
                className="inline-flex min-h-10 items-center font-medium text-muted transition hover:text-accent"
              />
              {p.url && (
                <ExtLink href={p.url} className="inline-flex min-h-10 items-center gap-1 font-medium text-accent hover:underline">
                  Read <ArrowIcon className="h-3.5 w-3.5" />
                  <span className="sr-only">{p.title} by {profile.name}</span>
                </ExtLink>
              )}
            </div>
          </div>
        </li>
      ))}
    </ol>
  )
}
