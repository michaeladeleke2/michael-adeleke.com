'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { AUTHOR_SELF, type Publication } from '@/content/publications'

function Authors({ authors }: { authors: string[] }) {
  return (
    <span>
      {authors.map((a, i) => (
        <span key={a}>
          <span className={a === AUTHOR_SELF ? 'font-semibold text-ink' : ''}>
            {a}
          </span>
          {i < authors.length - 1 ? ', ' : ''}
        </span>
      ))}
    </span>
  )
}

function Entry({ pub }: { pub: Publication }) {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  const expandable = Boolean(pub.abstract || pub.doi || pub.pdfUrl)
  const panelId = `pub-${pub.id}`

  return (
    <li className="border-b border-hairline py-6 first:pt-0">
      <div className="flex items-baseline gap-4">
        <span className="shrink-0 text-xs tabular-nums text-ink-muted">
          {pub.year}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg leading-snug text-ink">
            {expandable ? (
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls={panelId}
                className="text-left transition-colors duration-120 hover:text-accent"
              >
                {pub.title}
              </button>
            ) : (
              pub.title
            )}
          </h3>

          <p className="mt-1.5 text-xs text-ink-muted">
            <Authors authors={pub.authors} />
          </p>

          <p className="mt-1 text-xs text-ink-muted">
            {pub.venue}
            {pub.venueShort ? ` (${pub.venueShort})` : ''}
            {pub.location ? `. ${pub.location}` : ''}
            {pub.pages ? `. ${pub.pages}` : ''}
          </p>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id={panelId}
                key="panel"
                initial={reduce ? false : { height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { height: { duration: 0.26, ease: [0.2, 0, 0, 1] }, opacity: { duration: 0.18 } }
                }
                className="overflow-hidden"
              >
                <div className="pt-4">
                  {pub.abstract && (
                    <p className="max-w-measure text-sm text-ink-muted">
                      {pub.abstract}
                    </p>
                  )}
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                    {pub.doi && (
                      <a
                        href={`https://doi.org/${pub.doi}`}
                        className="text-xs text-accent underline underline-offset-[0.18em]"
                      >
                        doi.org/{pub.doi}
                      </a>
                    )}
                    {pub.pdfUrl && (
                      <a
                        href={pub.pdfUrl}
                        className="text-xs text-accent underline underline-offset-[0.18em]"
                      >
                        PDF
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </li>
  )
}

export function PublicationList({ items }: { items: Publication[] }) {
  return (
    <ul className="mx-auto mt-6 max-w-list">
      {items.map((pub) => (
        <Entry key={pub.id} pub={pub} />
      ))}
    </ul>
  )
}
