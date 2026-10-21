export type RecentItem = {
  text: string
  href?: string
}

/**
 * The short "recent" line on the home page. Edit this directly; it used to be
 * derived from the newest presentation record, which meant the home page
 * silently advertised 2025 work well into 2026.
 *
 * Keep it to two or three lines, and keep unannounced venues unnamed.
 */
export const recent: RecentItem[] = [
  {
    text: 'Running studies with the SensDS platform in the Human-Technology Interaction Lab.',
    href: '/research/sensdsv2/',
  },
  {
    text: 'Preparing conference submissions on radar-based machine learning education.',
  },
]
