// ─────────────────────────────────────────────────────────────
// All site content lives in this file. Edit here, not in pages.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Sunday Ajayi',
  headline: 'Backend & Applied AI Engineer',
  years: '5+',
  location: 'Kigali, Rwanda',
  affiliation: 'Carnegie Mellon University',
  email: 'sunnexajayi@gmail.com', // from your CV; alternative: sajayi@andrew.cmu.edu
  cv: '/documents/sunday-ajayi-cv.pdf', // drop your CV PDF at public/documents/
  photo: '/images/gallery/portrait-bw-hero.webp',
  photoAlt: 'Black-and-white portrait of Sunday Ajayi wearing glasses, arms crossed',
  /** Big hero statement + supporting line */
  pitch: 'I build reliable backend and AI systems.',
  proof: 'From a national rail platform serving 300,000+ users to AI evaluation infrastructure.',
  intro: [
    'I design and ship backend systems in Python and Go on AWS and Google Cloud, across fintech, telephony and transport. Now pursuing an MSc in Information Technology at Carnegie Mellon University, researching accessible and responsible AI.',
  ],
}

/** What you're open to — shown in the homepage hero, homepage closing section and Contact page. */
export const openTo = ['Full-time roles', 'Research internships', 'Speaking engagements']

/** Where you can work — shown alongside openTo. */
export const workLocations = ['Remote', 'Kigali', 'Open to relocation']

export const links = {
  scholar: 'https://scholar.google.com/citations?user=VI739cwAAAAJ&hl=en',
  orcid: 'https://orcid.org/0009-0002-2076-916X',
  adplist: 'https://adplist.org/mentors/sunday-ajayi',
  github: 'https://github.com/suavelad',
  linkedin: 'https://www.linkedin.com/in/sunday-ajayi',
  x: 'https://x.com/sunnex0',
}

export type Experience = {
  company: string
  role: string
  period: string
  summary: string
  points: string[]
  tech?: string[]
  logo?: string
  /** One headline result, shown on the homepage */
  highlight?: string
}

export const experience: Experience[] = [
  {
    company: 'Stimulir',
    logo: '/images/orgs/stimulir.webp',
    role: 'Founding Software / Product Engineer',
    period: '2026 — Present',
    summary: 'Enterprise AI platform for building, deploying and improving AI. I work across product research, architecture and delivery.',
    highlight: 'Built AI evaluation & feedback infrastructure',
    points: [
      'Designed an AI evaluation and feedback layer capturing model outputs, observed outcomes and human corrections.',
      'Built backend systems and contributed to product research and technical architecture.',
      'Contributed to voice-AI assessment and campaign-intelligence pilots.',
    ],
    tech: ['Backend', 'Applied AI', 'AI evaluation', 'Data systems'],
  },
  {
    company: 'Carnegie Mellon University',
    role: 'Graduate Researcher',
    logo: '/images/orgs/cmu.webp',
    period: '2025 — Present',
    summary: 'Accessible financial technology research with Prof. Eric Umuhoza.',
    highlight: 'First-author arXiv preprint on accessible mobile money',
    points: [
      'Designed a voice-driven USSD automation framework integrating ASR, biometric authentication and conversational interaction workflows.',
      'Conducted security, accessibility and usability evaluations for visually impaired users in mobile money scenarios.',
      'Investigated deployment feasibility on low-cost devices and low-connectivity environments.',
    ],
    tech: ['Android', 'ASR', 'Biometrics', 'USSD'],
  },
  {
    company: 'Mercurie, Lagos',
    logo: '/images/orgs/mercurie.svg',
    role: 'Backend Engineer (Go | Python)',
    period: 'Mar 2024 — Sep 2025',
    summary: 'Fintech and SaaS company accelerating Africa\'s digital economy.',
    highlight: '30% lower latency · 99.9% uptime',
    points: [
      'Built and optimised backend systems using gRPC and REST, reducing latency by 30% and improving feature deployment speed by 40%.',
      'Maintained 99.9% uptime for high-traffic SaaS products.',
    ],
    tech: ['Go', 'Python', 'gRPC', 'REST', 'Google Cloud'],
  },
  {
    company: 'Jenesys HQ, United Kingdom',
    role: 'Backend Engineer (Python)',
    period: 'Feb 2023 — Feb 2024',
    summary: 'UK company building AI-powered bookkeeping and chatbot products.',
    highlight: '40% faster responses · zero downtime at peak',
    points: [
      'Architected a high-performance backend achieving 40% faster response times and zero downtime during peak load.',
      'Integrated Sage, Xero, Slack and WhatsApp, reducing management overhead by 30% and improving user engagement by 25%.',
    ],
    tech: ['Python', 'Sage', 'Xero', 'Slack', 'WhatsApp API'],
  },
  {
    company: 'PressOne Africa, Lagos',
    logo: '/images/orgs/pressone.svg',
    role: 'Backend Engineer (Python)',
    period: 'Sep 2022 — Apr 2023',
    summary: 'Business phone system for teams in Nigeria.',
    highlight: '60% faster customer onboarding',
    points: [
      'Enhanced a telephony backend handling 20,000+ API requests and 5,000+ call events monthly with 95% uptime.',
      'Delivered tools improving issue resolution by 40%; integrated Telnyx and Plivo to cut onboarding time by 60%.',
    ],
    tech: ['Python', 'Telnyx', 'Plivo', 'Webhooks'],
  },
  {
    company: 'SecureID Digital, Lagos',
    logo: '/images/orgs/secureid.webp',
    role: 'Lead Backend Engineer & Technical Product Lead',
    period: 'Nov 2019 — Jul 2023',
    summary: 'Smart-card and digital solutions company; I led the Nigeria Railway e-ticketing (Automated Fare Collection) system.',
    highlight: '300,000+ users · 5,000+ daily transactions',
    points: [
      'Technical Product Lead and Lead Backend Engineer for a platform supporting 300,000+ users and 5,000+ daily transactions.',
      'Led backend architecture and deployment of scalable systems, improving uptime by 40% and reducing incident response time by 60%.',
      'Improved stability through queue-based processing, connection pooling and database optimisation.',
    ],
    tech: ['Python', 'Django REST', 'PostgreSQL', 'Redis', 'Celery', 'Nginx', 'Docker'],
  },
]

export const skills: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['Python', 'Go', 'SQL', 'Rust (learning)'] },
  { group: 'Backend', items: ['Django / DRF', 'Flask', 'gRPC', 'REST', 'Webhooks', 'Celery', 'Microservices', 'JWT auth'] },
  { group: 'Data', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'NumPy', 'Pandas'] },
  { group: 'Cloud & DevOps', items: ['AWS', 'Google Cloud', 'Azure', 'Docker', 'CI/CD', 'Nginx', 'Prometheus', 'Grafana'] },
  { group: 'AI / ML', items: ['PyTorch', 'Hugging Face', 'ASR / TTS', 'LLM applications', 'RAG', 'Model evaluation'] },
  { group: 'Testing', items: ['PyTest', 'Postman', 'Swagger'] },
]

export type Status = 'Concept' | 'Prototype' | 'MVP' | 'Launched' | 'Active' | 'Completed' | 'Research'

export type Project = {
  name: string
  category: string
  status: Status
  text: string
  tech: string[]
  link?: string
  linkLabel?: string
  logo?: string // square logo in public/images/products/
  /** Optional square mark for compact rows (when `logo` is a wide wordmark) */
  logoMark?: string
  /** Your role, e.g. 'Co-founder & CTO' */
  role?: string
}

// Products: ventures with their own public site
export const products: Project[] = [
  {
    name: 'NeoOps',
    role: 'Co-founder & CTO',
    category: 'by NeoFusion · Event operations',
    status: 'Launched',
    text: 'An operations platform for event vendors, built and launched under NeoFusion.',
    tech: ['SaaS', 'Web'],
    link: 'https://getneoops.com',
    linkLabel: 'getneoops.com',
    logo: '/images/products/neoops.svg',
  },
  {
    name: 'ECHO AI',
    role: 'Co-founder & CTO',
    category: 'Speech AI · Language technology',
    status: 'Prototype',
    text: 'Real-time English ↔ Kinyarwanda speech-to-speech translation to reduce language barriers between visitors and local communities in Rwanda.',
    tech: ['ASR', 'TTS', 'Machine translation', 'Web'],
    link: 'https://letusecho.com',
    linkLabel: 'letusecho.com',
    logo: '/images/products/echo.webp',
    logoMark: '/images/products/echo-mark.webp',
  },
  {
    name: 'TERNKONNECT',
    role: 'Co-founder & CTO',
    category: 'Accessibility · Assistive tech',
    status: 'MVP',
    text: 'A browser extension, accessibility widget and B2B API aimed at improving digital experiences for people with visual impairments.',
    tech: ['Browser extension', 'API', 'a11y'],
    link: 'https://ternkonnect.com',
    linkLabel: 'ternkonnect.com',
    logo: '/images/products/ternkonnect.svg',
  },
  {
    name: 'SwiftAid',
    role: 'Co-founder & CTO',
    category: 'Social impact · Health tech',
    status: 'Concept',
    text: 'Improving access to blood availability information and donation centres in Nigeria.',
    tech: ['Web', 'Maps'],
    link: 'http://swiftaid.co/',
    linkLabel: 'swiftaid.co',
    logo: '/images/products/swiftaid.webp',
  },
]

// Projects: research and industry work
export const projects: Project[] = [
  {
    name: 'Voice-Driven USSD Mobile Money',
    category: 'Research · Accessibility · Financial inclusion',
    status: 'Research',
    text: 'An Android framework that lets blind and visually impaired users complete USSD mobile-money transactions by voice, with biometric-gated PIN handling via Android Keystore. Initial validation with 35 participants: 98% task completion and 70% faster completion.',
    tech: ['Android', 'Accessibility Services', 'USSD', 'Keystore'],
    link: 'https://arxiv.org/abs/2605.31375',
    linkLabel: 'Read paper',
  },
  {
    name: 'AI Evaluation & Feedback Infrastructure',
    category: 'Applied AI · Industry (Stimulir)',
    status: 'Active',
    text: 'An evaluation layer that captures model outputs, real-world outcomes and human corrections, enabling feedback-driven improvement of production AI systems.',
    tech: ['Data pipelines', 'Human feedback', 'Evaluation'],
  },
]

export const research = {
  statement: [
    'My research sits at the intersection of artificial intelligence, software systems and human-centred computing. I am interested in how intelligent systems can be made more reliable, secure, accessible and beneficial in real-world settings.',
    'Current threads include digital accessibility and financial inclusion, applied machine learning for intelligent energy and renewable power systems, and AI safety, governance and policy frameworks for the responsible development and deployment of AI across Africa.',
  ],
  interests: [
    { title: 'Responsible AI, Safety & Governance', items: ['Model evaluation', 'Human oversight', 'AI policy frameworks', 'Governance in Africa'] },
    { title: 'AI Security', items: ['Prompt injection', 'Jailbreaks', 'Data poisoning', 'Agent security'] },
    { title: 'Human-Centred AI', items: ['Accessibility', 'Assistive technology', 'Inclusive design'] },
    { title: 'Financial Inclusion', items: ['Accessible mobile money', 'USSD services', 'Digital banking'] },
    { title: 'ML for Energy Systems', items: ['Intelligent energy', 'Renewable power systems', 'Applied ML'] },
  ],
  projects: [
    {
      title: 'Toward Accessible Mobile Money',
      status: 'Under review',
      with: 'with Prof. Eric Umuhoza, CMU Africa',
      text: 'A voice-driven, biometrically secured USSD automation framework for visually impaired users. I designed the framework integrating ASR, biometric authentication and conversational workflows, ran security, accessibility and usability evaluations, and assessed deployment on low-cost devices in low-connectivity settings.',
    },
    {
      title: 'Digital Accessibility & Financial Inclusion',
      status: 'In progress',
      with: 'CMU Africa',
      text: 'A scanner-based and AI-assisted evaluation of mobile banking apps (BK Mobile, Equity, Fidelity, GTWorld, AccessMore) for blind and visually impaired users in Rwanda and Nigeria. Automated scanner findings are reported separately from screen-reader usability testing.',
    },
  ],
}

export type Publication = {
  title: string
  authors: string
  venue: string
  year: number
  status: 'Published' | 'Accepted' | 'Under review' | 'Preprint' | 'In progress'
  url?: string
}

export const publications: Publication[] = [
  {
    title: 'Toward Accessible Mobile Money: A Voice-Driven, Biometrically Secured USSD Automation Framework for Visually Impaired Users',
    authors: 'S. Ajayi, B. E. Olatunji, E. Umuhoza',
    venue: 'arXiv preprint arXiv:2605.31375',
    year: 2026,
    status: 'Under review',
    url: 'https://arxiv.org/abs/2605.31375',
  },
  {
    title: 'WAXAL-NET: Finetuned Edge ASR Across 19 African Languages',
    authors: 'V. T. Olufemi, O. Babatunde, R. Njema, B. Gbotemi, W. L. Yen, et al.',
    venue: 'arXiv preprint arXiv:2606.02375',
    year: 2026,
    status: 'Preprint',
    url: 'https://arxiv.org/abs/2606.02375',
  },
]

export const education = [
  {
    school: 'Carnegie Mellon University',
    degree: 'MSc Information Technology',
    period: '2025 — May 2027 (expected)',
    location: 'Kigali, Rwanda',
    notes: ['Focus: Applied Machine Learning and Systems'],
    coursework: [
      'Data Inference & Applied Machine Learning',
      'Recommender Systems',
      'Machine Learning in Production',
      'Software Architecture',
      'Introduction to Machine Learning',
      'Advanced Algorithms',
    ],
  },
  {
    school: 'Obafemi Awolowo University',
    degree: 'BSc Electronic & Electrical Engineering',
    period: '2013 — Apr 2018',
    location: 'Ile-Ife, Nigeria',
    notes: ['Specialisation: Control Systems, System Design & Architecture', 'Second Class Upper', 'MTN Science & Technology Scholarship', 'Agbami / Chevron Scholarship'],
    coursework: [],
  },
]

export type Org = { org: string; role: string; text: string; logo?: string; url?: string }

export const certifications: { name: string; issuer: string; year: string; logo?: string; /** Credly or issuer verification URL */ verify?: string; expired?: boolean }[] = [
  { name: 'Professional Cloud Architect', issuer: 'Google Cloud', year: '2024', logo: '/images/orgs/google-cloud.svg', verify: 'https://www.credly.com/badges/d7db8744-18cd-49ab-a7e6-920f3a2ed2b3/public_url', expired: true },
  { name: 'Solutions Architect – Associate', issuer: 'Amazon Web Services', year: '', logo: '/images/orgs/aws.svg', verify: 'https://www.credly.com/badges/089d01b2-9123-4503-a1cd-001045912077/public_url' },
  { name: 'Cloud Practitioner', issuer: 'Amazon Web Services', year: '2021', logo: '/images/orgs/aws.svg', verify: 'https://www.credly.com/badges/c4593f88-c380-44a1-8617-3454964826d9/public_url', expired: true },
  { name: 'GitHub Copilot', issuer: 'GitHub', year: '', logo: '/images/orgs/github.svg', verify: 'https://learn.microsoft.com/api/credentials/share/en-us/SunnexAjayi-0899/A7FF158E53E0F24E?sharingId=FB3F3995E36BD0BB' },
]

export const awards: { name: string; year: string; logo?: string }[] = [
  { name: 'USAII Global AI Hackathon 2026 — 2nd Runner-Up, Graduate Track', year: '2026', logo: '/images/orgs/usaii.webp' },
  { name: 'AWS × Bundesliga × Adidas × Slalom World Sports Innovation Cup — EMEA Finalist', year: '', logo: '/images/orgs/aws.svg' },
  { name: 'ADPList Top 100 Mentor', year: '', logo: '/images/orgs/adplist.webp' },
  { name: 'AWS Community Builder — Data', year: '', logo: '/images/orgs/aws.svg' },
  { name: 'IEEE Smart Cities Ambassador', year: '', logo: '/images/orgs/ieee.svg' },
]

export const community: Org[] = [
  { org: 'YE Network', url: 'https://theyenetwork.com', logo: '/images/orgs/ye-network.webp', role: 'Founder', text: 'Founded a network focused on mentoring youths for social impact.' },
  { org: 'Python Rwanda', logo: '/images/orgs/python.svg', role: 'Community Lead', text: 'Developer engagement, workshops and growing the Python ecosystem in Rwanda — including a hands-on data visualisation workshop with Mount Kigali University that reached 100+ students.' },
  { org: 'AWS Community Student Builders, Carnegie Mellon University', logo: '/images/orgs/aws.svg', role: 'Co-Lead', text: 'Co-lead the AWS student builder community at Carnegie Mellon University, running hands-on cloud learning and build sessions for students.' },
  { org: 'AWS User Group Kigali', logo: '/images/orgs/aws.svg', role: 'Co-Lead', text: 'Co-lead the Kigali AWS community — organising cloud learning sessions, technical workshops and AWS knowledge sharing.' },
  { org: 'JCI Rwanda', role: 'Member, National Board', text: 'Manage corporate communication and programme coordination.' },
  { org: 'Africa Innovators Society, CMU Africa', logo: '/images/orgs/cmu.webp', role: 'Minister of Partnership', text: 'Partnership development, innovation activities and student engagement.' },
  { org: 'Black in Tech Lagos', role: 'Programs Chair', text: 'Designed programmes for professional development and community engagement.' },
  { org: 'Open Source Kigali', role: 'Contributor', text: 'Open-source participation and technical collaboration.' },
]

export const volunteering: Org[] = [
  { org: 'IEEE', logo: '/images/orgs/ieee.svg', role: 'Smart Cities Ambassador', text: 'Promoting smart-city technology awareness and engagement.' },
  { org: 'ADPList', logo: '/images/orgs/adplist.webp', role: 'Mentor', text: 'Free 1:1 mentorship for aspiring engineers on careers, cloud, backend and AI.' },
  { org: 'Youth mentoring', role: 'Volunteer', text: 'Mentoring young people for social impact and supporting early-career developers.' },
]

export const mentorshipAreas = [
  'Backend & system design',
  'Cloud (AWS / GCP) & certification prep',
  'Getting started in applied AI',
  'CV, LinkedIn & interview prep',
  'Learning roadmaps & career transitions',
]

/** Workshop photos (Community page + homepage) */
export const workshop = {
  title: 'Python Rwanda × Mount Kigali University — data visualisation workshop',
  summary: 'A hands-on session for 100+ students on choosing the right chart and spotting misleading visuals.',
  photos: [
    { src: '/images/gallery/workshop-slides.webp', alt: 'Sunday presenting a slide titled “Same data: a 4% gap looks huge or honest” to a computer lab of students' },
    { src: '/images/gallery/workshop-class.webp', alt: 'Students at computers while Sunday explains chart choices at the whiteboard' },
  ],
}
