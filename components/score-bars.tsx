/**
 * A single-series score chart for a self-assessment inventory result.
 *
 * One measure, a handful of named categories, no time axis: a horizontal bar
 * is the form, sorted as the caller passes it. The bar is redundant with the
 * printed value, which is what lets it be this quiet — the number is the
 * datum, the bar is there so the shape of the result reads in one glance.
 *
 * Rendered as a table rather than a stack of divs. A screen reader gets
 * category and value as a row; everyone else gets the bar.
 */
export function ScoreBars({
  rows,
  max,
  caption,
  unit = '',
}: {
  rows: { label: string; value: number }[]
  /** Points available, not the largest value. A 30 out of 50 is not a full bar. */
  max: number
  caption: string
  unit?: string
}) {
  return (
    <figure className="my-8">
      <table className="w-full table-fixed border-collapse">
        <caption className="sr-only">{caption}</caption>
        <colgroup>
          <col className="w-[40%]" />
          <col />
          <col className="w-[3.25rem]" />
        </colgroup>
        <tbody>
          {rows.map((row) => {
            const pct = max > 0 ? (row.value / max) * 100 : 0
            return (
              <tr key={row.label}>
                <th
                  scope="row"
                  className="py-1.5 pr-3 text-left align-middle text-sm font-normal text-ink"
                >
                  {row.label}
                </th>
                <td className="py-1.5 align-middle">
                  <div className="h-2.5 w-full rounded-[3px] bg-surface">
                    {row.value > 0 && (
                      <div
                        className="h-2.5 rounded-[3px] bg-accent"
                        style={{ width: `${Math.max(pct, 1.5)}%` }}
                      />
                    )}
                  </div>
                </td>
                <td className="py-1.5 pl-3 text-right align-middle text-sm tabular-nums text-ink">
                  {row.value}
                  {unit}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <figcaption className="mt-3 text-xs text-ink-muted">
        {caption}
      </figcaption>
    </figure>
  )
}
