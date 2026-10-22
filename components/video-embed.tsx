'use client'

import { useState } from 'react'

/**
 * A YouTube embed that does not touch YouTube until the reader asks it to.
 *
 * Loading a YouTube iframe on page load pulls in roughly a megabyte of player
 * code and sets Google's cookies for every visitor, including the ones who
 * never press play. This shows a self-hosted poster instead and only mounts
 * the iframe on click, through youtube-nocookie.com. Same click-to-play
 * pattern as the research demos.
 */
export function VideoEmbed({
  id,
  poster,
  title,
}: {
  id: string
  poster: string
  title: string
}) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="relative aspect-video overflow-hidden rounded-[4px] border border-hairline bg-surface">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play: ${title}`}
          className="group absolute inset-0 h-full w-full"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
          <img
            src={poster}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-ink/20 transition-colors duration-120 group-hover:bg-ink/10">
            <span className="flex items-center gap-2 rounded-full bg-bg/95 px-5 py-2.5 font-display text-sm font-semibold text-ink shadow-lift transition-colors duration-120 group-hover:text-accent">
              <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor">
                <path d="M5 3.5v9l8-4.5-8-4.5Z" />
              </svg>
              Play
            </span>
          </span>
        </button>
      )}
    </div>
  )
}
