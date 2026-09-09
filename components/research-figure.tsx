'use client'

import { useState } from 'react'

export type FigureSpec = {
  /** Path without extension; `<src>.webp` and `<src>-still.webp` must exist. */
  src: string
  width: number
  height: number
  label: string
  caption: string
  alt: string
}

/**
 * A demo that only moves when the reader asks it to.
 *
 * The still poster is what loads with the page, so four demos cost four small
 * images rather than four animations. Clicking swaps in the animated WebP;
 * clicking again returns to the still. That keeps the site's one
 * non-user-triggered animation on the home hero, where it belongs.
 */
export function ResearchFigure({ figure }: { figure: FigureSpec }) {
  const [playing, setPlaying] = useState(false)

  return (
    <figure>
      <button
        type="button"
        onClick={() => setPlaying((p) => !p)}
        aria-pressed={playing}
        aria-label={`${playing ? 'Stop' : 'Play'} the ${figure.label.toLowerCase()} demo`}
        className="group relative block w-full overflow-hidden rounded-[4px] border border-hairline bg-surface"
      >
        <img
          src={playing ? `${figure.src}.webp` : `${figure.src}-still.webp`}
          alt={figure.alt}
          width={figure.width}
          height={figure.height}
          decoding="async"
          className="block h-auto w-full"
        />
        {!playing && (
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="flex items-center gap-2 rounded-full bg-bg/90 px-4 py-2 font-display text-xs font-semibold text-ink shadow-lift transition-colors duration-120 group-hover:text-accent">
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5"
                fill="currentColor"
              >
                <path d="M5 3.5v9l8-4.5-8-4.5Z" />
              </svg>
              Play
            </span>
          </span>
        )}
      </button>
      <figcaption className="mt-3 text-sm text-ink-muted">
        <span className="font-display font-semibold text-ink">
          {figure.label}.
        </span>{' '}
        {figure.caption}
      </figcaption>
    </figure>
  )
}
