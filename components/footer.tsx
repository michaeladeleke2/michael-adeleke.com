import Link from 'next/link'
import { nav, profiles, site } from '@/lib/site'

export function Footer() {
  return (
    <footer className="mt-16 border-t border-hairline">
      <div className="mx-auto flex max-w-shell flex-col gap-8 px-5 py-10 sm:px-8 md:flex-row md:justify-between">
        <div className="max-w-measure">
          <p className="font-display text-sm font-semibold text-ink">
            {site.name}
          </p>
          <p className="mt-2 text-xs text-ink-muted">
            {site.role}, {site.affiliation}.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-3 inline-block text-xs text-accent underline underline-offset-[0.18em]"
          >
            {site.email}
          </a>
        </div>

        <div className="flex gap-12">
          <nav aria-label="Footer">
            <ul className="space-y-1.5">
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
          {profiles.length > 0 && (
            <ul className="space-y-1.5">
              {profiles.map((p) => (
                <li key={p.label}>
                  <a
                    href={p.url}
                    className="text-xs text-ink-muted transition-colors duration-120 hover:text-ink"
                  >
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="mx-auto max-w-shell px-5 pb-8 sm:px-8">
        <p className="text-xs text-ink-muted">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  )
}
