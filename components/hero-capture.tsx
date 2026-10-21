'use client'

import { useEffect, useState } from 'react'

const STILL = '/hero/capture-still.webp'
const VIDEO = '/hero/capture.mp4'
const W = 1400
const H = 260

/**
 * A real micro-Doppler capture from SensDS, cropped to the signal band and
 * running behind the type.
 *
 * This is a video element, not an animated image. An animated WebP is decoded
 * frame by frame on the CPU, which made it stutter; H.264 is hardware
 * decoded, loops natively, and is a fraction of the size (66 KB against 393).
 *
 * Under reduced motion the video is never mounted at all and the still poster
 * is what renders, so the file is not even fetched.
 */
export function HeroCapture() {
  const [motionOk, setMotionOk] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setMotionOk(!mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  if (!motionOk) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- static export,
      // and next/image would add no value to a fixed-size decorative band.
      <img
        src={STILL}
        alt=""
        width={W}
        height={H}
        decoding="async"
        className="block w-full"
      />
    )
  }

  return (
    <video
      src={VIDEO}
      poster={STILL}
      width={W}
      height={H}
      autoPlay
      loop
      muted
      playsInline
      aria-hidden="true"
      className="block w-full"
    />
  )
}
