import type { Metadata } from 'next'
import { EntryCard } from '@/components/entry-card'
import { Mdx } from '@/components/mdx'
import { PageHeader, SectionHeading, Shell } from '@/components/page-header'
import { teachingInterests } from '@/content/cv-data'
import { getTeachingByTheme, getTeachingPhilosophy } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Teaching',
  description:
    'Teaching philosophy and a reflective portfolio of teaching artifacts: course design, assessment, inclusive practice, and reflection.',
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
        <section className="mt-10">
          <SectionHeading>Teaching philosophy statement</SectionHeading>
          <p className="mt-2 text-center text-xs text-ink-muted">
            Written for AHE 603, College and University Teaching
          </p>
          <p className="mx-auto mt-5 max-w-measure text-center text-sm text-ink-muted">
            <span className="text-ink">Teaching interests.</span>{' '}
            {teachingInterests}
          </p>
          <article className="mt-6 text-base text-ink">
            <Mdx source={philosophy} />
          </article>
        </section>
      )}

      <section className="mt-12">
        <SectionHeading>Portfolio</SectionHeading>
        {groups.length === 0 ? (
          <p className="mx-auto mt-6 max-w-measure text-center text-base text-ink-muted">
            Portfolio entries from AHE 603, College and University Teaching,
            are being written up and will be added through the fall.
          </p>
        ) : (
          <div className="mt-7 space-y-10">
            {groups.map((group) => (
              <div key={group.theme}>
                <h3 className="text-center font-display text-lg text-ink">{group.theme}</h3>
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  {group.entries.map((e) => (
                    <EntryCard
                      key={e.slug}
                      href={`/teaching/${e.slug}/`}
                      title={e.frontmatter.title}
                      level={4}
                      meta={dateFormat.format(new Date(e.frontmatter.date))}
                      draft={Boolean(e.frontmatter.draft)}
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
