import { LessonTimeline } from '@/components/lesson-timeline'
import { ScoreBars } from '@/components/score-bars'
import type { TeachingFigure } from '@/lib/content'

/**
 * Renders an entry's figure from its frontmatter.
 *
 * The data lives in frontmatter rather than as JSX inside the MDX because
 * next-mdx-remote 6 strips expression attributes from MDX by default: a
 * `rows={[...]}` never reaches the component, and the figure renders empty
 * with no error. That default is the hardening we upgraded to 6 for, so the
 * data comes in through frontmatter and the body stays prose.
 */
export function TeachingFigure({ figure }: { figure: TeachingFigure }) {
  if (figure.kind === 'image') {
    return (
      <figure className="mx-auto my-9 max-w-[62rem]">
        {/* A plan diagram is wider than a line of prose and does not get
            narrower on request. Below its natural width it scrolls rather
            than shrinking into illegibility, and the scroller takes focus so
            that is reachable from the keyboard. */}
        <div
          tabIndex={0}
          role="group"
          aria-label={figure.alt}
          className="overflow-x-auto rounded-[4px] border border-hairline bg-white"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, and next/image does not optimise SVG */}
          <img
            src={figure.src}
            width={figure.width}
            height={figure.height}
            alt={figure.alt}
            className="block h-auto w-full"
            style={{ minWidth: figure.minWidth ?? '46rem' }}
          />
        </div>
        <figcaption className="mx-auto mt-3 max-w-measure text-xs text-ink-muted">
          {figure.caption}
        </figcaption>
      </figure>
    )
  }
  if (figure.kind === 'timeline') {
    return (
      <div className="mx-auto max-w-measure">
        <LessonTimeline
          minutes={figure.minutes}
          blocks={figure.blocks}
          checkpoints={figure.checkpoints}
          caption={figure.caption}
        />
      </div>
    )
  }
  return (
    <div className="mx-auto max-w-measure">
      <ScoreBars
        rows={figure.rows}
        max={figure.max}
        unit={figure.unit}
        caption={figure.caption}
      />
    </div>
  )
}
