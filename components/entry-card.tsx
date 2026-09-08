import Link from 'next/link'

/**
 * The site's single hover treatment: 2px lift and a deeper shadow at 120ms.
 * Under reduced motion the transform is suppressed and the border and title
 * colour change carries the affordance instead.
 *
 * `level` keeps the heading order correct: cards sit directly under the page
 * h1 on /research, but under a theme heading on /teaching.
 */
export function EntryCard({
  href,
  title,
  meta,
  level = 3,
  children,
}: {
  href: string
  title: string
  meta?: string
  level?: 2 | 3 | 4
  children?: React.ReactNode
}) {
  const Heading = `h${level}` as 'h2' | 'h3' | 'h4'

  return (
    <Link
      href={href}
      className="group block rounded-[4px] border border-hairline bg-bg p-6 transition-[transform,box-shadow,border-color] duration-120 hover:-translate-y-[2px] hover:border-accent-soft hover:shadow-lift-hover motion-reduce:hover:translate-y-0"
    >
      {meta && <p className="text-xs text-ink-muted">{meta}</p>}
      <Heading className="mt-1 font-display text-lg leading-snug text-ink transition-colors duration-120 group-hover:text-accent">
        {title}
      </Heading>
      {children && <div className="mt-2 text-sm text-ink-muted">{children}</div>}
    </Link>
  )
}
