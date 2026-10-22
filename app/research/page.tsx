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
        lede="What connects my work is a question rather than a method: how do you make something difficult to see legible enough to learn from? That question has led me to radar sensing, virtual reality, and the ways students understand who belongs in computing."
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
