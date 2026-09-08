import type { Metadata } from 'next'
import { PageHeader, SectionHeading, Shell } from '@/components/page-header'
import { PublicationList } from '@/components/publication-list'
import { publicationGroups, publications } from '@/content/publications'
import { presentations } from '@/content/presentations'
import { awards } from '@/content/awards'

export const metadata: Metadata = {
  title: 'Publications',
  description:
    'Peer-reviewed papers, extended abstracts, presentations, research competitions, and awards.',
  alternates: { canonical: '/publications/' },
}

export default function PublicationsPage() {
  return (
    <Shell>
      <PageHeader
        title="Publications"
        lede="Papers at SIGCSE, CHI, and BICE on computing education and culturally responsive design, alongside current work on radar sensing. Select a title to see identifiers and links."
      />

      {publicationGroups.map((group) => {
        const items = publications.filter((p) => p.type === group.type)
        if (items.length === 0) return null
        return (
          <section key={group.type} className="mt-12">
            <SectionHeading>{group.heading}</SectionHeading>
            <PublicationList items={items} />
          </section>
        )
      })}

      <section className="mt-14">
        <SectionHeading>Presentations and research competitions</SectionHeading>
        <ul className="mx-auto mt-6 max-w-list">
          {presentations.map((p) => (
            <li
              key={p.id}
              className="flex items-baseline gap-4 border-b border-hairline py-5"
            >
              <span className="shrink-0 text-xs tabular-nums text-ink-muted">
                {p.year}
              </span>
              <div className="max-w-measure">
                <p className="font-display text-base leading-snug text-ink">
                  {p.title}
                </p>
                <p className="mt-1 text-xs text-ink-muted">{p.venue}</p>
                {(p.role || p.note) && (
                  <p className="mt-1 text-xs text-ink-muted">
                    {[p.role, p.note].filter(Boolean).join('. ')}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <SectionHeading>Awards, honors, and fellowships</SectionHeading>
        <ul className="mx-auto mt-6 max-w-list">
          {awards.map((a) => (
            <li
              key={a.id}
              className="flex items-baseline gap-4 border-b border-hairline py-5"
            >
              <span className="w-12 shrink-0 text-xs tabular-nums text-ink-muted">
                {a.year ?? ''}
              </span>
              <div className="max-w-measure">
                <p className="text-base text-ink">{a.title}</p>
                <p className="mt-0.5 text-xs text-ink-muted">{a.org}</p>
                {a.detail && (
                  <p className="mt-1 text-xs text-ink-muted">{a.detail}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Shell>
  )
}
