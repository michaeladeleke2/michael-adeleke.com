'use client'

import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [dark, setDark] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
    setReady(true)
  }, [])

  function toggle() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    document.documentElement.style.colorScheme = next ? 'dark' : 'light'
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch {
      /* storage blocked; the toggle still works for this page view */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={ready ? dark : undefined}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors duration-120 hover:bg-surface hover:text-ink"
    >
      {/* Both icons are rendered and swapped by CSS so the control is correct
          on first paint, before React knows the theme. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="h-[18px] w-[18px] dark:hidden"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <circle cx="10" cy="10" r="3.6" />
        <path d="M10 1.6v2.2M10 16.2v2.2M18.4 10h-2.2M3.8 10H1.6M15.9 4.1l-1.6 1.6M5.7 14.3l-1.6 1.6M15.9 15.9l-1.6-1.6M5.7 5.7L4.1 4.1" />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="hidden h-[18px] w-[18px] dark:block"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      >
        <path d="M16.5 12.4A7 7 0 0 1 7.6 3.5a7 7 0 1 0 8.9 8.9Z" />
      </svg>
    </button>
  )
}
