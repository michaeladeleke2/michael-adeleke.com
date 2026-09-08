import Link from 'next/link'
import { HeroCapture } from '@/components/hero-capture'
import { profiles, site } from '@/lib/site'
import { publications } from '@/content/publications'
import { presentations } from '@/content/presentations'

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: site.role,
  affiliation: {
    '@type': 'CollegeOrUniversity',
    name: site.affiliation,
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Morgan State University',
  },
  url: site.url,
  email: `mailto:${site.email}`,
  knowsAbout: [
    'Radar sensing',
    'Micro-Doppler signal processing',
    'Machine learning',
    'Human-computer interaction',
    'Computing education',
  ],
  sameAs: profiles.map((p) => p.url),
}

const sections = [
  {
    href: '/research/',
    title: 'Research',
    body: 'Radar sensing systems and the machine learning education platform built on them.',
  },
  {
    href: '/publications/',
    title: 'Publications',
    body: 'Papers at SIGCSE, CHI, and BICE, with presentations and awards.',
  },
  {
    href: '/teaching/',
    title: 'Teaching',
    body: 'Philosophy statement and a reflective portfolio of teaching artifacts.',
  },
  {
    href: '/cv/',
    title: 'CV',
    body: 'Full curriculum vitae, readable in the browser or downloadable.',
  },
]

export default function HomePage() {
  const underReview = publications.find((p) => p.type === 'under-review')
  const latestTalk = presentations[0]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <section className="overflow-hidden border-b border-hairline">
        <div className="mx-auto max-w-shell px-5 pt-20 sm:px-8 sm:pt-28">
          <h1 className="max-w-[13ch] font-display text-3xl text-ink sm:text-4xl">
            {site.name}
          </h1>
          <p className="mt-6 max-w-measure text-lg text-ink">{site.tagline}</p>
          <p className="mt-4 max-w-measure text-sm text-ink-muted">
            {site.role} at {site.affiliation}, in the Human-Technology
            Interaction Lab.
          </p>
        </div>

        {/* The capture sits in flow rather than behind the type, so its
            clearance holds at every width. It still bleeds the full page. */}
        <div className="mt-12 h-32 overflow-hidden bg-capture-field sm:mt-10 sm:h-auto">
          <HeroCapture />
        </div>
        <div className="mx-auto max-w-shell px-5 py-4 sm:px-8">
          <p className="max-w-measure text-xs text-ink-muted">
            Micro-Doppler capture from SensDS, using an Infineon BGT60TR13C
            60&nbsp;GHz radar. Time runs left to right; the vertical axis is
            Doppler velocity, and the bright line through the centre is the
            static return a hand gesture breaks away from.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <section className="grid gap-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group block rounded-[4px] border border-hairline p-6 transition-[transform,box-shadow,border-color] duration-120 hover:-translate-y-[2px] hover:border-accent-soft hover:shadow-lift-hover motion-reduce:hover:translate-y-0"
            >
              <h2 className="font-display text-lg text-ink transition-colors duration-120 group-hover:text-accent">
                {s.title}
              </h2>
              <p className="mt-2 text-sm text-ink-muted">{s.body}</p>
            </Link>
          ))}
        </section>

        <section className="border-t border-hairline py-10">
          <h2 className="sr-only">Recent</h2>
          <ul className="max-w-measure space-y-3">
            {latestTalk && (
              <li className="text-sm text-ink-muted">
                Presented{' '}
                <Link
                  href="/publications/"
                  className="text-ink underline decoration-hairline underline-offset-[0.18em] transition-colors duration-120 hover:text-accent"
                >
                  {latestTalk.title}
                </Link>{' '}
                at AHFE {latestTalk.year}.
              </li>
            )}
            {underReview && (
              <li className="text-sm text-ink-muted">
                {underReview.title} is under review at{' '}
                {underReview.venueShort}.
              </li>
            )}
          </ul>
        </section>
      </div>
    </>
  )
}
