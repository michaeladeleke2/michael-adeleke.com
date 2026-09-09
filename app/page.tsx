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
  worksFor: {
    '@type': 'ResearchOrganization',
    name: site.lab.name,
    url: site.lab.url,
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
    body: 'Radar sensing, VR for learning, and K-12 computing outreach.',
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

      <section className="relative overflow-hidden border-b border-hairline">
        {/* The capture runs behind the type as a band, centred on the section
            and dissolving into the page. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center"
        >
          <div className="hero-capture-mask w-full">
            <HeroCapture />
          </div>
          {/* See .hero-scrim in globals.css: it keeps --ink-muted above the
              4.5:1 floor over the brightest and darkest pixels in the
              capture, at every viewport width. */}
          <div className="hero-scrim absolute inset-0" />
        </div>

        <div className="relative mx-auto max-w-shell px-5 py-16 text-center sm:px-8 sm:py-24">
          <h1 className="mx-auto max-w-[13ch] font-display text-3xl text-ink sm:text-4xl">
            {site.name}
          </h1>
          <p className="mx-auto mt-4 max-w-measure text-lg text-ink">
            {site.tagline}
          </p>
          <p className="mx-auto mt-3 max-w-measure text-sm text-ink-muted">
            {site.role} at {site.affiliation}, in the Human-Technology
            Interaction Lab.
          </p>
          <p className="mx-auto mt-6 text-xs text-ink-muted">
            Behind: a micro-Doppler capture from SensDS
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <section className="grid gap-5 py-10 sm:grid-cols-2 lg:grid-cols-4">
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

        <section className="border-t border-hairline py-6 text-center">
          <h2 className="sr-only">Recent</h2>
          <ul className="mx-auto max-w-[54rem] space-y-1.5">
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
