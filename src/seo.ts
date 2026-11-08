// ─────────────────────────────────────────────────────────────
// SEO metadata — used both at build time (static HTML per route,
// sitemap, robots) and at runtime (head updates on navigation).
// Keep this file free of React/DOM imports.
// ─────────────────────────────────────────────────────────────
import { awards, certifications, education, experience, links, profile, publications } from './data/site'

/** Public origin of the site, no trailing slash. Change if you use a custom domain. */
export const SITE_URL = 'https://suavelad.github.io'
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`
export const X_HANDLE = '@sunnex0'

export type PageMeta = { path: string; title: string; description: string; priority: number }

export const pages: PageMeta[] = [
  {
    path: '/',
    title: 'Sunday Ajayi | Software & Applied AI Engineer',
    description:
      'Software & Applied AI Engineer with 5+ years in Python, Go, AWS and Google Cloud — built a national rail platform serving 300,000+ users. MSc IT at Carnegie Mellon University. Open to full-time roles, research internships and speaking.',
    priority: 1.0,
  },
  {
    path: '/professional',
    title: 'Experience, Products & Projects | Sunday Ajayi',
    description:
      'Backend and platform engineering experience at Stimulir, Mercurie, Jenesys, PressOne and SecureID, plus NeoOps, ECHO AI, TERNKONNECT and SwiftAid, where he is Co-founder & CTO.',
    priority: 0.9,
  },
  {
    path: '/research',
    title: 'Research — Accessible & Responsible AI | Sunday Ajayi',
    description:
      'Graduate research at CMU Africa on accessible mobile money, digital accessibility, financial inclusion, AI safety and applied machine learning.',
    priority: 0.9,
  },
  {
    path: '/publications',
    title: 'Publications | Sunday Ajayi',
    description:
      'Papers and preprints by Sunday Ajayi, including voice-driven USSD mobile money for visually impaired users and edge ASR for African languages.',
    priority: 0.8,
  },
  {
    path: '/education',
    title: 'Education, Certifications & Awards | Sunday Ajayi',
    description:
      'MSc Information Technology at Carnegie Mellon University, BSc Electronic & Electrical Engineering at Obafemi Awolowo University, cloud certifications and awards.',
    priority: 0.7,
  },
  {
    path: '/community',
    title: 'Community, Volunteering & Mentorship | Sunday Ajayi',
    description:
      'Community leadership: AWS Community Student Builders Co-organizer at Carnegie Mellon University, AWS User Group Kigali Co-organizer, Python Rwanda Community Lead, YE Network founder, and ADPList Top 100 mentor.',
    priority: 0.7,
  },
  {
    path: '/contact',
    title: 'Contact | Sunday Ajayi',
    description:
      'Get in touch with Sunday Ajayi about software engineering, applied AI, research collaborations, speaking or mentorship.',
    priority: 0.6,
  },
]

export const metaFor = (path: string): PageMeta =>
  pages.find((p) => p.path === path) ?? pages[0]

export const canonical = (path: string) => `${SITE_URL}${path === '/' ? '/' : `${path}/`}`

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** schema.org Person — helps Google build a knowledge panel and link profiles. */
export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    alternateName: 'Sunday Iyanu Ajayi',
    url: `${SITE_URL}/`,
    image: `${SITE_URL}${profile.photo}`,
    jobTitle: 'Software & Applied AI Engineer',
    description: pages[0].description,
    email: `mailto:${profile.email}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Kigali', addressCountry: 'RW' },
    affiliation: { '@type': 'CollegeOrUniversity', name: 'Carnegie Mellon University' },
    alumniOf: education.map((e) => ({ '@type': 'CollegeOrUniversity', name: e.school })),
    worksFor: { '@type': 'Organization', name: experience[0].company },
    hasCredential: certifications.filter((c) => !c.expired).map((c) => ({
      '@type': 'EducationalOccupationalCredential',
      name: `${c.issuer} ${c.name}`,
      recognizedBy: { '@type': 'Organization', name: c.issuer },
      ...(c.verify ? { url: c.verify } : {}),
    })),
    award: awards.map((a) => a.name),
    knowsAbout: [
      'Software Engineering',
      'Backend Engineering',
      'Distributed Systems',
      'Applied Machine Learning',
      'AI Evaluation',
      'Responsible AI',
      'AI Safety',
      'Digital Accessibility',
      'Financial Inclusion',
      'Cloud Architecture',
    ],
    sameAs: [links.github, links.linkedin, links.x, links.scholar, links.orcid, links.adplist],
  }
}

/** schema.org ScholarlyArticle list for the publications page. */
export function publicationsJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': publications.map((p) => ({
      '@type': 'ScholarlyArticle',
      headline: p.title,
      name: p.title,
      author: p.authors.split(',').map((a) => ({ '@type': 'Person', name: a.trim() })),
      datePublished: String(p.year),
      publisher: p.venue,
      url: p.url,
      creativeWorkStatus: p.status,
    })),
  }
}

/** Full <head> block for a route, injected into the static HTML at build time. */
export function headHtml(path: string) {
  const m = metaFor(path)
  const url = canonical(path)
  const ld = [personJsonLd(), ...(path === '/publications' ? [publicationsJsonLd()] : [])]
  return [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<meta name="author" content="${esc(profile.name)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${path === '/' ? 'profile' : 'website'}" />`,
    `<meta property="og:site_name" content="${esc(profile.name)}" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(profile.name)} — ${esc(profile.headline)}" />`,
    `<meta property="og:locale" content="en_GB" />`,
    ...(path === '/' ? [`<meta property="profile:first_name" content="Sunday" />`, `<meta property="profile:last_name" content="Ajayi" />`] : []),
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:site" content="${X_HANDLE}" />`,
    `<meta name="twitter:creator" content="${X_HANDLE}" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    ...ld.map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`),
  ].join('\n    ')
}

export function sitemapXml() {
  const today = new Date().toISOString().slice(0, 10)
  const urls = pages
    .map(
      (p) =>
        `  <url><loc>${canonical(p.path)}</loc><lastmod>${today}</lastmod><priority>${p.priority.toFixed(1)}</priority></url>`,
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

export const robotsTxt = () => `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
