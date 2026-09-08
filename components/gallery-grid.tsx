'use client'

import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { Photo } from '@/content/gallery'

export function GalleryGrid({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState<number | null>(null)
  // Set for the one render before unmounting, so the overlay is
  // pointer-events-none for the whole exit. If the fade-out never completes —
  // a background tab throttling rAF, for instance — AnimatePresence keeps the
  // node mounted, and a full-screen invisible layer would otherwise swallow
  // every click on the page.
  const [closing, setClosing] = useState(false)
  const reduce = useReducedMotion()
  const triggersRef = useRef<(HTMLButtonElement | null)[]>([])
  const openerRef = useRef<number | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const active = index === null ? null : photos[index]

  const open = useCallback((i: number) => {
    openerRef.current = i
    setIndex(i)
  }, [])

  const close = useCallback(() => setClosing(true), [])

  useEffect(() => {
    if (!closing) return
    setIndex(null)
    setClosing(false)
  }, [closing])

  const step = useCallback(
    (d: number) =>
      setIndex((i) =>
        i === null ? null : (i + d + photos.length) % photos.length,
      ),
    [photos.length],
  )

  useEffect(() => {
    if (index === null) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
        return
      }
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
      // Keep Tab inside the dialog while it is open.
      if (e.key === 'Tab' && dialogRef.current) {
        const items = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        )
        if (items.length === 0) return
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      // Return focus to the thumbnail that opened the lightbox.
      const opener = openerRef.current
      if (opener !== null) triggersRef.current[opener]?.focus()
    }
  }, [index, close, step])

  return (
    <>
      <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, i) => (
          <li key={photo.id}>
            <button
              type="button"
              ref={(el) => {
                triggersRef.current[i] = el
              }}
              onClick={() => open(i)}
              className="group block w-full text-left"
              aria-label={`Open ${photo.alt}`}
            >
              {/* Thumbnails are cropped to one ratio so the grid stays regular
                  and captions align; the lightbox shows the full frame. */}
              <motion.div
                layoutId={reduce ? undefined : `photo-${photo.id}`}
                className="aspect-[4/3] overflow-hidden rounded-[4px] border border-hairline bg-surface"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  className="h-full w-full object-cover transition-transform duration-120 group-hover:scale-[1.015] motion-reduce:group-hover:scale-100"
                />
              </motion.div>
              <p className="mt-3 text-sm text-ink">{photo.caption}</p>
              <p className="mt-0.5 text-xs text-ink-muted">
                {photo.where}, {photo.when}
              </p>
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {active && (
          // The overlay keeps a stable key so stepping between photos does not
          // remount it; the shared element inside is keyed by photo id so its
          // layoutId is never mutated on an already-mounted node.
          <motion.div
            key="lightbox"
            ref={dialogRef}
            className={`fixed inset-0 z-[60] flex flex-col items-center justify-center bg-bg/95 p-5 sm:p-10 ${
              closing ? 'pointer-events-none' : ''
            }`}
            // Clicking the surround closes; clicks on the image or controls
            // bubble from a child and are ignored.
            onClick={(e) => {
              if (e.target === e.currentTarget) close()
            }}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.16 }}
            role="dialog"
            aria-modal="true"
            aria-label={active.alt}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              autoFocus
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-muted hover:bg-surface hover:text-ink"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className="h-5 w-5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M5 5l10 10M15 5L5 15" />
              </svg>
            </button>

            <motion.div
              key={active.id}
              layoutId={reduce ? undefined : `photo-${active.id}`}
              className="max-h-[72vh] overflow-hidden rounded-[4px]"
            >
              <Image
                src={active.src}
                alt={active.alt}
                width={active.width}
                height={active.height}
                className="max-h-[72vh] w-auto object-contain"
                priority
              />
            </motion.div>

            <div className="mt-5 max-w-measure text-center">
              <p className="text-sm text-ink">{active.caption}</p>
              <p className="mt-1 text-xs text-ink-muted">
                {active.where}, {active.when}
              </p>
            </div>

            {photos.length > 1 && (
              <div className="mt-5 flex gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="rounded-full px-4 py-2 font-display text-xs text-ink-muted hover:bg-surface hover:text-ink"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="rounded-full px-4 py-2 font-display text-xs text-ink-muted hover:bg-surface hover:text-ink"
                >
                  Next
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
