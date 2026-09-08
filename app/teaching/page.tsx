import type { Metadata } from 'next'
import { EntryCard } from '@/components/entry-card'
import { Mdx } from '@/components/mdx'
import { PageHeader, SectionHeading, Shell } from '@/components/page-header'
import { getTeachingByTheme, getTeachingPhilosophy } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Teaching',
  description:
    'Teaching philosophy and a reflective portfolio of teaching artifacts — course design, assessment, inclusive practice, and reflection.',
  alternates: { canonical: '/teaching/' },
}

const dateFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  timeZone: 'UTC',
})

export default function TeachingPage() {
  const philosophy = getTeachingPhilosophy()
  const groups = getTeachingByTheme()

  return (
    <Shell>
      <PageHeader
        title="Teaching"
        lede="A philosophy statement and a portfolio of teaching artifacts, each paired with the reflection that makes it evidence rather than paperwork."
      />

      {philosophy && (
        <section className="mt-14">
          <SectionHeading>Philosophy</SectionHeading>
          <article className="mt-6 text-base text-ink">
            <Mdx source={philosophy} />
          </article>
        </section>
      )}

      <section className="mt-20">
        <SectionHeading>Portfolio</SectionHeading>
        {groups.length === 0 ? (
          <p className="mt-6 max-w-measure text-base text-ink-muted">
            Entries are being added. Each is an MDX file in{' '}
            <code>content/teaching</code> carrying all four required sections.
          </p>
        ) : (
          <div className="mt-8 space-y-14">
            {groups.map((group) => (
              <div key={group.theme}>
                <h3 className="font-display text-lg text-ink">{group.theme}</h3>
                <div className="mt-5 grid gap-6 md:grid-cols-2">
                  {group.entries.map((e) => (
                    <EntryCard
                      key={e.slug}
                      href={`/teaching/${e.slug}/`}
                      title={e.frontmatter.title}
                      level={4}
                      meta={dateFormat.format(new Date(e.frontmatter.date))}
                    >
                      {e.frontmatter.competencies?.join(', ')}
                    </EntryCard>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </Shell>
  )
}
