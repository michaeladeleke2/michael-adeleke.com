'use client'

import { useState } from 'react'

export type FigureSpec = {
  /** Path without extension; `<src>.mp4` and `<src>-still.webp` must exist. */
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
 * The still poster is what loads with the page; the video is fetched on the
 * first click. H.264 rather than animated WebP, for the same reason as the
 * hero: a WebP is decoded frame by frame on the CPU and stutters at this size.
 */
export function ResearchFigure({ figure }: { figure: FigureSpec }) {
  const [playing, setPlaying] = useState(false)

  return (
    <figure>
      <div className="relative overflow-hidden rounded-[4px] border border-hairline bg-surface">
        {playing ? (
          <video
            src={`${figure.src}.mp4`}
            poster={`${figure.src}-still.webp`}
            width={figure.width}
            height={figure.height}
            controls
            autoPlay
            loop
            muted
            playsInline
            aria-label={figure.alt}
            className="block h-auto w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play the ${figure.label.toLowerCase()}`}
            className="group block w-full"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
            <img
              src={`${figure.src}-still.webp`}
              alt={figure.alt}
              width={figure.width}
              height={figure.height}
              decoding="async"
              className="block h-auto w-full"
            />
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
          </button>
        )}
      </div>
      <figcaption className="mt-3 text-sm text-ink-muted">
        <span className="font-display font-semibold text-ink">
          {figure.label}.
        </span>{' '}
        {figure.caption}
      </figcaption>
    </figure>
  )
}
