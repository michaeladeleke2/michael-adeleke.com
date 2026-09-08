# michael-adeleke.com

Personal academic site for Michael Adeleke. Read `PROJECT_BRIEF.md` first — it is
the design and content brief this site is built to, and it takes precedence over
inference from the code.

## Stack

Next.js 15 App Router with `output: 'export'` (fully static, no server),
TypeScript, Tailwind CSS 3, Framer Motion, MDX via `next-mdx-remote/rsc`.

```bash
npm run dev        # localhost:3000
npm run build      # static export to ./out
npm run typecheck
```

Do not run `next build` while `next dev` is running — they share `.next` and the
dev server ends up serving stale chunks. Stop dev first.

## Where things live

| What | Where |
| --- | --- |
| Design tokens | `app/globals.css` (`:root` / `.dark`), surfaced in `tailwind.config.ts` |
| Site config, nav, social links | `lib/site.ts` |
| Structured CV data | `content/publications.ts`, `presentations.ts`, `awards.ts`, `cv-data.ts` |
| Project write-ups | `content/projects/*.mdx` |
| Teaching portfolio | `content/teaching/*.mdx`, `content/teaching-philosophy.mdx` |
| Gallery photos | `public/gallery/` + `content/gallery.ts` |
| CV PDF | `public/cv/michael-adeleke-cv.pdf` — keep this path stable, it is linked from application materials |
| OG card | `public/og.png`, regenerate with `python3 scripts/generate-og.py` |

## Rules that are load-bearing

**Colour tokens are stored as `R G B` channels, not hex.** `--bg: 255 255 255`,
consumed as `rgb(var(--bg) / <alpha-value>)`. This is what lets `bg-bg/85` and
`bg-ink/25` work; with a plain `var(--bg)` Tailwind silently drops the alpha
modifier and the colour computes to transparent. Keep the hex in the trailing
comment. Never hardcode a hex in a component.

**`--accent` differs from the brief in dark mode.** The brief specifies
`#D42C3A`, which measures 3.81:1 on `--bg` and 3.47:1 on `--surface`, below the
4.5:1 floor the brief also sets. It is `#E64C57` here (5.00 / 4.55). Text sitting
*on* accent uses `text-on-accent`, which flips white/near-black by theme for the
same reason.

**The mobile sheet is rendered outside `<header>`.** The header has
`backdrop-blur`, and an element with `backdrop-filter` becomes the containing
block for its `position: fixed` descendants — inside the header, the sheet gets
pinned to the 64px header box instead of the viewport.

**Every teaching entry needs all four sections.** `lib/content.ts` throws at
build time if an entry is missing "What the activity asked", "What I made",
"What I learned", or "How this shapes my teaching". An entry without the
reflection is evidence of attendance, not of teaching skill. Do not weaken this
check to get a build through.

**One non-user-triggered animation, on the home hero.** Everything else responds
to a click, hover, or route change. No scroll-triggered fade-ups, no typewriter,
no count-ups, no parallax outside the hero. Every animation is wrapped in a
`prefers-reduced-motion` check.

## Adding content

A teaching portfolio entry — `content/teaching/<slug>.mdx`:

```mdx
---
title: "…"
theme: "Course and lesson design"   # one of TEACHING_THEMES in lib/content.ts
date: "2026-02-14"
artifacts:
  - { label: "Unit plan", file: "/teaching/files/unit-plan.pdf" }
competencies: ["Learning objectives", "Alignment"]
---

## What the activity asked
## What I made
## What I learned
## How this shapes my teaching
```

Put artifact files in `public/teaching/files/`. Before publishing, check each
one for anything identifying classmates or students, and redact it.

Set `draft: true` on any entry or project to keep it out of the build.

## Deployment

Vercel, static export. Domain stays registered at GoDaddy; only DNS points to
Vercel. See `README.md` for the DNS records.
