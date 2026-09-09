import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Mdx } from '@/components/mdx'
import { FigureCarousel } from '@/components/figure-carousel'
import { PageHeader, Shell } from '@/components/page-header'
import { getProject, getProjects } from '@/lib/content'

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return {
    title: project.frontmatter.title,
    description: project.frontmatter.summary,
    alternates: { canonical: `/research/${slug}/` },
    openGraph: {
      title: project.frontmatter.title,
      description: project.frontmatter.summary,
    },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()
  const fm = project.frontmatter

  return (
    <Shell>
      <p className="mb-6 text-center">
        <Link
          href="/research/"
          className="text-xs text-ink-muted transition-colors duration-120 hover:text-accent"
        >
          Research
        </Link>
      </p>

      <PageHeader
        title={fm.title}
        lede={fm.summary}
        meta={
          <dl className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            <div>
              <dt className="text-xs text-ink-muted">Period</dt>
              <dd className="text-xs text-ink">{fm.period}</dd>
            </div>
            <div>
              <dt className="text-xs text-ink-muted">Area</dt>
              <dd className="text-xs text-ink">{fm.area}</dd>
            </div>
            {fm.role && (
              <div>
                <dt className="text-xs text-ink-muted">Role</dt>
                <dd className="text-xs text-ink">{fm.role}</dd>
              </div>
            )}
            {fm.stack && fm.stack.length > 0 && (
              <div>
                <dt className="text-xs text-ink-muted">Built with</dt>
                <dd className="text-xs text-ink">{fm.stack.join(', ')}</dd>
              </div>
            )}
          </dl>
        }
      />

      <article className="mt-8 text-base text-ink">
        <Mdx source={project.body} />
      </article>

      {fm.figures && fm.figures.length > 0 && (
        <section className="mx-auto mt-14 max-w-[54rem]">
          <h2 className="text-center font-display text-xl text-ink">
            The system, end to end
          </h2>
          <p className="mx-auto mt-3 max-w-measure text-center text-sm text-ink-muted">
            One class period runs the whole loop. Select a demo to play it, or step through them below.
          </p>
          <div className="mt-8">
            <FigureCarousel figures={fm.figures} />
          </div>
        </section>
      )}

      {fm.links && fm.links.length > 0 && (
        <div className="mx-auto mt-10 max-w-measure border-t border-hairline pt-6">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {fm.links.map((l) => (
              <li key={l.href + l.label}>
                <Link
                  href={l.href}
                  className="text-sm text-accent underline underline-offset-[0.18em]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Shell>
  )
}
