import type { Metadata } from 'next'
import { PageHeader, Shell } from '@/components/page-header'
import { profiles, site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'How to reach Michael Adeleke.',
  alternates: { canonical: '/contact/' },
}

export default function ContactPage() {
  return (
    <Shell>
      <PageHeader
        title="Contact"
        lede="The fastest way to reach me is email. I read messages about collaborations, talks, and prospective research directions."
      />

      <dl className="mx-auto mt-8 max-w-measure">
        <div className="grid grid-cols-[7rem_minmax(0,1fr)] items-baseline gap-4 border-b border-hairline py-5">
          <dt className="text-xs text-ink-muted">Email</dt>
          <dd>
            <a
              href={`mailto:${site.email}`}
              className="text-base text-accent underline underline-offset-[0.18em]"
            >
              {site.email}
            </a>
          </dd>
        </div>
        <div className="grid grid-cols-[7rem_minmax(0,1fr)] items-baseline gap-4 border-b border-hairline py-5">
          <dt className="text-xs text-ink-muted">Also</dt>
          <dd>
            <a
              href={`mailto:${site.emailAlt}`}
              className="break-words text-base text-accent underline underline-offset-[0.18em]"
            >
              {site.emailAlt}
            </a>
          </dd>
        </div>
        <div className="grid grid-cols-[7rem_minmax(0,1fr)] items-baseline gap-4 border-b border-hairline py-5">
          <dt className="text-xs text-ink-muted">Lab</dt>
          <dd>
            <a
              href={site.lab.url}
              className="break-words text-base text-accent underline underline-offset-[0.18em]"
            >
              {site.lab.name} ({site.lab.short})
            </a>
          </dd>
        </div>
        {profiles.map((p) => (
          <div
            key={p.label}
            className="grid grid-cols-[7rem_minmax(0,1fr)] items-baseline gap-4 border-b border-hairline py-5"
          >
            <dt className="text-xs text-ink-muted">{p.label}</dt>
            <dd>
              <a
                href={p.url}
                className="break-words text-base text-accent underline underline-offset-[0.18em]"
              >
                {/* Drop the scheme and any query string: Google Scholar's user id
                  wraps across two lines and reads as noise. */}
              {p.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\?.*$/, '')}
              </a>
            </dd>
          </div>
        ))}
        <div className="grid grid-cols-[7rem_minmax(0,1fr)] items-baseline gap-4 py-5">
          <dt className="text-xs text-ink-muted">Located</dt>
          <dd className="text-base text-ink">Tuscaloosa, Alabama</dd>
        </div>
      </dl>
    </Shell>
  )
}
