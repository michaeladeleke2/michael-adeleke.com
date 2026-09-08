'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { nav, site } from '@/lib/site'
import { ThemeToggle } from './theme-toggle'

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(href)
}

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()

  // Close the sheet on route change, and lock scroll while it is open.
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-hairline bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-shell items-center justify-between gap-6 px-5 sm:px-8">
          <Link
            href="/"
            className="font-display text-sm font-semibold tracking-[-0.01em] text-ink"
          >
            {site.name}
          </Link>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const active = isActive(pathname, item.href)
                return (
                  <li key={item.href} className="relative">
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={`relative block px-3 py-2 font-display text-xs transition-colors duration-120 ${
                        active ? 'text-accent' : 'text-ink-muted hover:text-ink'
                      }`}
                    >
                      {item.label}
                      {active && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute inset-x-3 -bottom-[1px] h-[2px] bg-accent"
                          transition={
                            reduce
                              ? { duration: 0 }
                              : { type: 'spring', stiffness: 480, damping: 38 }
                          }
                        />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-label="Open menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors duration-120 hover:bg-surface hover:text-ink md:hidden"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className="h-[18px] w-[18px]"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M3 6h14M3 10h14M3 14h14" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Rendered outside <header> on purpose: an element with backdrop-filter
          becomes the containing block for its fixed descendants, which would
          pin this sheet to the 64px header box instead of the viewport.
          Mobile gets a sheet over the page, not a dropdown that pushes it. */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 h-full w-full cursor-default bg-ink/25"
            />
            <motion.nav
              aria-label="Main"
              className="absolute inset-y-0 right-0 flex w-[min(20rem,86vw)] flex-col border-l border-hairline bg-bg px-6 pb-10 pt-5"
              initial={reduce ? false : { x: '100%' }}
              animate={{ x: 0 }}
              exit={reduce ? { x: 0 } : { x: '100%' }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 420, damping: 40 }
              }
            >
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  autoFocus
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-muted hover:bg-surface hover:text-ink"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    className="h-[18px] w-[18px]"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  >
                    <path d="M5 5l10 10M15 5L5 15" />
                  </svg>
                </button>
              </div>
              <ul className="mt-4 flex flex-col overflow-y-auto">
                {nav.map((item) => {
                  const active = isActive(pathname, item.href)
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? 'page' : undefined}
                        className={`block border-b border-hairline py-3.5 font-display text-lg ${
                          active ? 'text-accent' : 'text-ink'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
