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
        lede="What connects this work is a question rather than a method: how do you take something that is hard to see and make it legible enough to learn from? That has meant radar signals, virtual reality, and what a student believes about who belongs in computing. New projects are added here as they begin."
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
