'use client'

import { useEffect, useState } from 'react'

const STILL = '/hero/capture-still.webp'
const ANIMATED = '/hero/capture.webp'
const W = 1400
const H = 260

/**
 * A real micro-Doppler capture from SensDS, cropped to the signal band.
 *
 * The still is what renders first, so the largest paint is a 10 KB image
 * rather than the 652 KB animation. The animation is fetched after mount and
 * swapped in once decoded; it is authored with a loop count of 1, so it plays
 * through once and holds its final frame. That keeps the home page to a single
 * non-user-triggered moment rather than something that loops at the reader.
 *
 * Under reduced motion the animation is never requested at all.
 */
export function HeroCapture() {
  const [src, setSrc] = useState(STILL)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cancelled = false
    const pre = new Image()
    pre.src = ANIMATED
    pre.decode?.()
      .then(() => {
        if (!cancelled) setSrc(ANIMATED)
      })
      .catch(() => {
        // Decode is best-effort; the still is a correct final state on its own.
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    // eslint-disable-next-line @next/next/no-img-element -- next/image rewrites
    // animated WebP through its loader and drops the animation.
    <img
      src={src}
      alt="Micro-Doppler spectrogram captured with a 60 GHz radar sensor: a bright zero-Doppler return running the width of the frame, with hand-gesture sidebands breaking above and below it."
      width={W}
      height={H}
      decoding="async"
      // Natural aspect at full width: it is a band running behind the type,
      // so it must not be cropped or stretched.
      className="block w-full"
    />
  )
}
