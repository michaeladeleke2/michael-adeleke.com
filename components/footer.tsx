import Link from 'next/link'
import { nav, profiles, site } from '@/lib/site'

export function Footer() {
  return (
    <footer className="mt-16 border-t border-hairline">
      {/* One centred stack. The nav runs horizontally rather than as a tall
          column, which is what was opening a large void down the right side. */}
      <div className="mx-auto max-w-[54rem] px-5 py-8 text-center sm:px-8">
        <p className="font-display text-sm font-semibold text-ink">
          {site.name}
        </p>
        <p className="mt-1 text-xs text-ink-muted">
          {site.role}, {site.affiliation}
        </p>

        <nav aria-label="Footer" className="mt-4">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-xs text-ink-muted transition-colors duration-120 hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <li>
            <a
              href={`mailto:${site.email}`}
              className="text-xs text-accent underline underline-offset-[0.18em]"
            >
              {site.email}
            </a>
          </li>
          {profiles.map((p) => (
            <li key={p.label}>
              <a
                href={p.url}
                className="text-xs text-accent underline underline-offset-[0.18em]"
              >
                {p.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-5 text-xs text-ink-muted">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  )
}
