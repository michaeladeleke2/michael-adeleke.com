'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export type CarouselItem = {
  id: string
  /** Shown in the thumbnail strip and announced on the control. */
  label: string
  thumbSrc: string
  thumbAlt: string
}

/**
 * One slide at a time with a thumbnail strip, advancing on its own until the
 * reader takes over.
 *
 * Auto-advance is the one thing here that needs care. It is motion nobody
 * asked for, so: it never starts under `prefers-reduced-motion`, it pauses on
 * hover and on keyboard focus, it stops for good the moment the reader
 * navigates or clicks into a slide, and there is always a visible pause
 * control. WCAG 2.2.2 requires that last one for anything that moves for more
 * than five seconds, and a carousel that cannot be stopped is the classic way
 * to fail it.
 */
export function Carousel({
  items,
  label,
  renderSlide,
  intervalMs = 5000,
}: {
  items: CarouselItem[]
  label: string
  renderSlide: (index: number) => React.ReactNode
  intervalMs?: number
}) {
  const [index, setIndex] = useState(0)
  const [auto, setAuto] = useState(true)
  const [held, setHeld] = useState(false)
  const stripRef = useRef<HTMLDivElement>(null)

  const go = useCallback(
    (next: number) => setIndex((next + items.length) % items.length),
    [items.length],
  )

  /** Any deliberate move ends the rotation: the reader is driving now. */
  const takeOver = useCallback((next: number) => {
    setAuto(false)
    setIndex((i) => next ?? i)
  }, [])

  useEffect(() => {
    if (!auto || held || items.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(
      () => setIndex((i) => (i + 1) % items.length),
      intervalMs,
    )
    return () => clearInterval(t)
  }, [auto, held, items.length, intervalMs])

  // Keep the active thumbnail in view when the strip scrolls.
  useEffect(() => {
    const strip = stripRef.current
    const active = strip?.children[index] as HTMLElement | undefined
    if (!strip || !active) return
    const left = active.offsetLeft - strip.offsetWidth / 2 + active.offsetWidth / 2
    strip.scrollTo({ left, behavior: auto ? 'auto' : 'smooth' })
  }, [index, auto])

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') takeOver((index + 1) % items.length)
        if (e.key === 'ArrowLeft')
          takeOver((index - 1 + items.length) % items.length)
      }}
    >
      <div
        aria-live="off"
        className="overflow-hidden rounded-[4px]"
        onClickCapture={() => setAuto(false)}
      >
        {renderSlide(index)}
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-xs tabular-nums text-ink-muted">
          {index + 1} / {items.length}
        </p>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => takeOver((index - 1 + items.length) % items.length)}
            aria-label="Previous"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink-muted transition-colors duration-120 hover:bg-surface hover:text-ink"
          >
            <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 3.5 5.5 8l4.5 4.5" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setAuto((a) => !a)}
            aria-pressed={!auto}
            aria-label={auto ? 'Pause automatic advance' : 'Resume automatic advance'}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink-muted transition-colors duration-120 hover:bg-surface hover:text-ink"
          >
            {auto ? (
              <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
                <rect x="4" y="3" width="3" height="10" rx="1" />
                <rect x="9" y="3" width="3" height="10" rx="1" />
              </svg>
            ) : (
              <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
                <path d="M5 3.5v9l8-4.5-8-4.5Z" />
              </svg>
            )}
          </button>
          <button
            type="button"
            onClick={() => takeOver((index + 1) % items.length)}
            aria-label="Next"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink-muted transition-colors duration-120 hover:bg-surface hover:text-ink"
          >
            <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 3.5 4.5 4.5L6 12.5" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={stripRef}
        className="mt-3 flex gap-2 overflow-x-auto pb-1"
        role="tablist"
        aria-label={`${label}: choose a slide`}
      >
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={item.label}
            onClick={() => takeOver(i)}
            className={`relative shrink-0 overflow-hidden rounded-[3px] border transition-colors duration-120 ${
              i === index
                ? 'border-accent'
                : 'border-hairline opacity-60 hover:opacity-100'
            }`}
          >
            <img
              src={item.thumbSrc}
              alt=""
              aria-hidden="true"
              className="h-14 w-24 object-cover sm:h-16 sm:w-28"
              loading="lazy"
              decoding="async"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
