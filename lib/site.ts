export const site = {
  name: 'Michael Adeleke',
  url: 'https://michael-adeleke.com',
  role: 'PhD student in Computer Science',
  affiliation: 'The University of Alabama',
  // One sentence, used on the home hero and as the default meta description.
  tagline:
    'I build radar sensing systems and turn them into machine learning education people can actually touch.',
  description:
    'Michael Adeleke is a PhD student in Computer Science at the University of Alabama, working on radar-based sensing, micro-Doppler signal processing, and accessible machine learning education.',
  /**
   * The institutional address leads: it signals the affiliation a program
   * chair is checking for. The personal one is kept as a fallback because
   * crimson.ua.edu is deprovisioned some months after leaving, and this site
   * is meant to outlive the PhD.
   */
  email: 'madeleke@crimson.ua.edu',
  emailAlt: 'm.adeleke01@gmail.com',
  lab: {
    name: 'Human-Technology Interaction Lab',
    short: 'HTIL',
    url: 'https://htilua.org/',
  },
} as const

/**
 * Profiles are rendered only when the URL is filled in, so an unset profile
 * never ships as a dead link. Fill these in and they appear on /contact and in
 * the home page's Person schema `sameAs`.
 */
export const profiles: { label: string; url: string }[] = [
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/michael-adeleke-4a1228217',
  },
  { label: 'GitHub', url: 'https://github.com/michaeladeleke2' },
  {
    label: 'Google Scholar',
    url: 'https://scholar.google.com/citations?user=xVwEuz4AAAAJ&hl=en',
  },
  { label: 'ORCID', url: 'https://orcid.org/0009-0008-9557-6198' },
].filter((p) => p.url !== '')

export const nav = [
  { href: '/about/', label: 'About' },
  { href: '/research/', label: 'Research' },
  { href: '/publications/', label: 'Publications' },
  { href: '/teaching/', label: 'Teaching' },
  { href: '/cv/', label: 'CV' },
  { href: '/gallery/', label: 'Gallery' },
  { href: '/contact/', label: 'Contact' },
] as const

export const CV_PATH = '/cv/michael-adeleke-cv.pdf'

/**
 * Flip to `true` to launch.
 *
 * While this is false every page carries <meta name="robots" content="noindex,
 * nofollow">, so the site can be live on the real domain for testing without
 * search engines indexing it. Deliberately paired with a robots.txt that still
 * ALLOWS crawling: a disallowed crawler never reads the noindex tag, and
 * Google can then list the bare URL anyway.
 *
 * Do not flip this until content/teaching-philosophy.mdx is in Michael's own
 * voice and the example entry in content/teaching/ has been replaced.
 */
export const INDEXABLE = false
