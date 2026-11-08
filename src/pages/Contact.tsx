import { links, openTo, profile, workLocations } from '../data/site'
import { socials } from '../components/Layout'
import { MailIcon } from '../components/Icons'
import { CopyButton, ExtLink, Section, btnGhost, btnPrimary } from '../components/ui'

export default function Contact() {
  return (
    <>
      {/* Full-screen photo hero — same treatment as the homepage */}
      <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
        <div className="fade-in-slow absolute inset-y-0 right-0 w-full md:w-[62%]">
          <img
            src="/images/gallery/hero-outdoor.webp"
            alt={`${profile.name} smiling outdoors in a black leather jacket`}
            width={840}
            height={1117}
            decoding="async"
            fetchPriority="high"
            className="h-full w-full object-cover object-[50%_40%]"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-bg/75 md:bg-transparent md:bg-gradient-to-r md:from-bg md:from-[38%] md:via-bg/70 md:via-[56%] md:to-bg/5" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-bg/70 to-transparent" aria-hidden="true" />

        <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-5xl items-center px-4 py-16 sm:px-6">
          <div className="max-w-xl md:max-w-[32rem]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Contact</p>
            <h1 className="mt-4 font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">Let's connect</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Have an interesting problem, research idea or opportunity to collaborate? I'm always up for conversations about
              software engineering, AI, research and community building.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${profile.email}`} className={`${btnPrimary} min-w-0 px-6 py-3`}>
                <MailIcon className="h-4 w-4 shrink-0" /> <span className="truncate">{profile.email}</span>
              </a>
              <CopyButton text={profile.email} label="Copy" className={`${btnGhost} px-5 py-3`} />
            </div>
            <div className="mt-3 flex flex-wrap gap-3">
              <ExtLink href={links.adplist} className={`${btnGhost} py-3`}>
                Book mentorship (ADPList)
              </ExtLink>
              <a href={profile.cv} className={`${btnGhost} py-3`} download>
                Download CV
              </a>
            </div>

            <p className="mt-8 text-sm text-muted">
              <span className="font-semibold text-ink">Open to:</span> {openTo.join(' · ')}
              <br />
              <span className="font-semibold text-ink">Location:</span> {workLocations.join(' · ')}
            </p>
          </div>
        </div>
      </section>

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
    </>
  )
}
