import { links, openTo, profile, workLocations } from '../data/site'
import { socials } from '../components/Layout'
import { MailIcon } from '../components/Icons'
import { CopyButton, ExtLink, PageHeader, Section, btnGhost, btnPrimary } from '../components/ui'

export default function Contact() {
  return (
    <>
      <div className="grid items-center gap-6 md:grid-cols-[1fr_auto] md:gap-4">
        <div>
          <PageHeader eyebrow="Contact" title="Let's connect">
            Have an interesting problem, research idea or opportunity to collaborate? I'm always up for conversations about
            software engineering, AI, research and community building.
          </PageHeader>

          <div className="mt-10 flex flex-wrap gap-3">
            <div className="flex w-full flex-wrap gap-3 sm:w-auto">
              <a href={`mailto:${profile.email}`} className={`${btnPrimary} min-w-0`}>
                <MailIcon className="h-4 w-4 shrink-0" /> <span className="truncate">{profile.email}</span>
              </a>
              <CopyButton text={profile.email} label="Copy" className={btnGhost} />
            </div>
            <ExtLink href={links.adplist} className={btnGhost}>
              Book mentorship (ADPList)
            </ExtLink>
            <a href={profile.cv} className={btnGhost} download>
              Download CV
            </a>
          </div>
        </div>
        <img
          src="/images/gallery/hero-outdoor.webp"
          alt={`${profile.name} smiling outdoors in a black leather jacket`}
          width={840}
          height={1117}
          decoding="async"
          className="fade-edges fade-in-slow mx-auto w-72 object-cover sm:w-80 md:w-[24rem] lg:w-[26rem]"
        />
      </div>

      <Section title="Elsewhere">
        <ul className="grid gap-3 sm:grid-cols-2">
          {socials.map(({ href, label, Icon }) => (
            <li key={label}>
              <ExtLink
                href={href}
                className="flex items-center gap-3 rounded-xl border border-line bg-surface px-5 py-4 transition hover:border-accent"
              >
                <Icon className="h-5 w-5 text-accent" />
                <span className="font-medium">{label}</span>
              </ExtLink>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Open to">
        <ul className="flex flex-wrap gap-2">
          {openTo.map((o) => (
            <li key={o} className="rounded-full border border-line px-4 py-1.5 text-sm text-muted">
              {o}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted">
          <span className="font-semibold text-ink">Location:</span> {workLocations.join(' · ')}
        </p>
      </Section>
    </>
  )
}
