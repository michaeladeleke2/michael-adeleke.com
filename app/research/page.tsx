import type { Metadata } from 'next'
import { EntryCard } from '@/components/entry-card'
import { PageHeader, Shell } from '@/components/page-header'
import { getProjects } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Research',
  description:
    'Radar-based sensing, micro-Doppler signal processing, and machine learning education systems.',
  alternates: { canonical: '/research/' },
}

export default function ResearchPage() {
  const projects = getProjects()

  return (
    <Shell>
      <PageHeader
        title="Research"
        lede="I work on radar sensing systems and on what happens when you put them in front of people who are learning. The sensing gives me signals that are rich and hard to read; the teaching gives me a reason to make them legible. Most of my projects live at that seam."
      />

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {projects.map((p) => (
          <EntryCard
            key={p.slug}
            href={`/research/${p.slug}/`}
            title={p.frontmatter.title}
            level={2}
            meta={`${p.frontmatter.area} · ${p.frontmatter.period}`.replace(
              ' · ',
              ', ',
            )}
          >
            {p.frontmatter.summary}
          </EntryCard>
        ))}
      </div>
    </Shell>
  )
}
