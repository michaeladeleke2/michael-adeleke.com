import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Mdx } from '@/components/mdx'
import { PageHeader, Shell } from '@/components/page-header'
import { getTeachingEntries, getTeachingEntry } from '@/lib/content'

export function generateStaticParams() {
  return getTeachingEntries().map((e) => ({ slug: e.slug }))
}

const dateFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const entry = getTeachingEntry(slug)
  if (!entry) return {}
  return {
    title: entry.frontmatter.title,
    description: `${entry.frontmatter.theme}. A teaching portfolio entry by Michael Adeleke.`,
    alternates: { canonical: `/teaching/${slug}/` },
  }
}

export default async function TeachingEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const entry = getTeachingEntry(slug)
  if (!entry) notFound()
  const fm = entry.frontmatter

  return (
    <Shell>
      <p className="mb-6 text-center">
        <Link
          href="/teaching/"
          className="text-xs text-ink-muted transition-colors duration-120 hover:text-accent"
        >
          Teaching
        </Link>
      </p>

      {fm.example && (
        <p className="mx-auto mb-8 max-w-measure rounded-[4px] border border-accent-soft bg-surface px-5 py-4 text-sm text-ink-muted">
          Example entry, included to show the structure. Replace it with a real
          portfolio entry before this page is sent to anyone.
        </p>
      )}

      <PageHeader
        title={fm.title}
        meta={
          <dl className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            <div>
              <dt className="text-xs text-ink-muted">Theme</dt>
              <dd className="text-xs text-ink">{fm.theme}</dd>
            </div>
            <div>
              <dt className="text-xs text-ink-muted">Date</dt>
              <dd className="text-xs text-ink">
                <time dateTime={fm.date}>
                  {dateFormat.format(new Date(fm.date))}
                </time>
              </dd>
            </div>
            {fm.competencies && fm.competencies.length > 0 && (
              <div>
                <dt className="text-xs text-ink-muted">Competencies</dt>
                <dd className="text-xs text-ink">
                  {fm.competencies.join(', ')}
                </dd>
              </div>
            )}
          </dl>
        }
      />

      <article className="mt-8 text-base text-ink">
        <Mdx source={entry.body} />
      </article>

      {fm.artifacts && fm.artifacts.length > 0 && (
        <section className="mx-auto mt-10 max-w-measure border-t border-hairline pt-6">
          <h2 className="font-display text-base text-ink">Artifacts</h2>
          <ul className="mt-3 space-y-2">
            {fm.artifacts.map((a) => (
              <li key={a.file}>
                <a
                  href={a.file}
                  className="text-sm text-accent underline underline-offset-[0.18em]"
                >
                  {a.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </Shell>
  )
}
