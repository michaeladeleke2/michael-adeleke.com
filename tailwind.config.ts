import type { Config } from 'tailwindcss'

/**
 * Tokens live in app/globals.css as CSS custom properties so the dark-mode
 * swap is a single class on <html>. This file only surfaces them to Tailwind.
 * Never hardcode a hex value in a component.
 */
const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      colors: {
        // Tokens are stored as "R G B" channels so Tailwind can compose the
        // alpha modifier (bg-bg/85, bg-ink/25) onto them.
        bg: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        'ink-muted': 'rgb(var(--ink-muted) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-soft': 'rgb(var(--accent-soft) / <alpha-value>)',
        'on-accent': 'rgb(var(--on-accent) / <alpha-value>)',
        hairline: 'rgb(var(--hairline) / <alpha-value>)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        serif: 'var(--font-serif)',
      },
      // Modular scale from the brief: 14 / 16 / 18 / 21 / 28 / 38 / 52 / 72
      fontSize: {
        xs: ['0.875rem', { lineHeight: '1.5' }], // 14
        sm: ['1rem', { lineHeight: '1.55' }], // 16
        base: ['1.125rem', { lineHeight: '1.65' }], // 18
        lg: ['1.3125rem', { lineHeight: '1.5' }], // 21
        xl: ['1.75rem', { lineHeight: '1.25', letterSpacing: '-0.015em' }], // 28
        '2xl': ['2.375rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }], // 38
        '3xl': ['3.25rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }], // 52
        '4xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.025em' }], // 72
      },
      maxWidth: {
        // 68-character measure at 18px Source Serif 4
        measure: '34rem',
        shell: '72rem',
      },
      boxShadow: {
        lift: '0 1px 2px var(--shadow-near), 0 8px 24px var(--shadow-far)',
        'lift-hover': '0 2px 4px var(--shadow-near), 0 14px 36px var(--shadow-far)',
      },
      transitionDuration: {
        120: '120ms',
      },
    },
  },
  plugins: [],
}

export default config
