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
