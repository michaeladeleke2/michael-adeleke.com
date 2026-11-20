/**
 * The shape of a class session: its blocks along a time rail, with the
 * assessment checkpoints marked above it.
 *
 * The point this is drawing is *when* evidence arrives, not what each block
 * contains, so the blocks carry no labels. Labelling nine segments across a
 * 34rem measure collides at any font size, and the list of blocks belongs in
 * the lesson plan itself rather than on a figure.
 */
export function LessonTimeline({
  minutes,
  blocks,
  checkpoints,
  caption,
}: {
  minutes: number
  blocks: { start: number; end: number }[]
  checkpoints: { at: number; kind: 'class' | 'individual'; label: string }[]
  caption: string
}) {
  const pct = (m: number) => (m / minutes) * 100
  const ticks = Array.from(
    { length: Math.floor(minutes / 10) + 1 },
    (_, i) => i * 10,
  )

  return (
    <figure className="my-8">
      <div className="relative h-5">
        {checkpoints.map((c) => (
          <span
            key={`${c.at}-${c.label}`}
            title={c.label}
            className={[
              'absolute top-1 block h-2.5 w-2.5 -translate-x-1/2 rounded-full border',
              c.kind === 'individual'
                ? 'border-accent bg-accent'
                : 'border-accent bg-bg',
            ].join(' ')}
            style={{ left: `${pct(c.at)}%` }}
          />
        ))}
      </div>

      <div className="relative h-2.5 w-full">
        {blocks.map((b) => (
          <div
            key={b.start}
            className="absolute h-2.5 rounded-[2px] bg-hairline"
            style={{
              left: `${pct(b.start)}%`,
              width: `calc(${pct(b.end - b.start)}% - 2px)`,
            }}
          />
        ))}
      </div>

      <div className="relative mt-2 h-4">
        {ticks.map((t) => (
          <span
            key={t}
            className="absolute -translate-x-1/2 text-xs tabular-nums text-ink-muted"
            style={{ left: `${pct(t)}%` }}
          >
            {t}
          </span>
        ))}
      </div>

      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-ink-muted">
        <li className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full border border-accent bg-bg" />
          Reads the room
        </li>
        <li className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full border border-accent bg-accent" />
          Reads one student
        </li>
      </ul>

      <figcaption className="mt-3 text-xs text-ink-muted">
        {caption} Minutes along the bottom.
      </figcaption>

      <table className="sr-only">
        <caption>Assessment checkpoints by minute</caption>
        <tbody>
          {checkpoints.map((c) => (
            <tr key={`sr-${c.at}-${c.label}`}>
              <th scope="row">{c.label}</th>
              <td>
                Minute {c.at},{' '}
                {c.kind === 'individual' ? 'individual' : 'whole class'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  )
}
