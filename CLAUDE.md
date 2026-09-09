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
| Home hero capture | `public/hero/capture.webp` + `capture-still.webp` |
| Master screen recordings | `media/sensds-*.gif` (tracked) |
| SensDS walkthrough figures | `public/research/sensds/`, built by `scripts/build-research-figures.py` |
| Headshot | `public/headshot.jpg` (400x400; display at 12rem or under to stay above 2x) |
| OG card | `public/og.png` |
| Hero + OG build script | `scripts/build-hero-capture.py` (see below) |

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

**Layout is centred; body text is not.** Page titles, ledes and section
headings are centred (`PageHeader`, `SectionHeading`). The columns beneath them
are centred too, but the text inside stays left-aligned: centred ragged-left
prose is hard to read past a couple of lines. Two measures are in play —
`max-w-measure` (34rem) for prose, and `max-w-list` (42rem) for citations,
talks and awards, where 34rem shreds a reference line. A page picks one and
sticks to it so the left edges line up.

**The site is currently noindexed.** `INDEXABLE` in `lib/site.ts` is `false`,
which adds `noindex, nofollow` to every page and withholds the sitemap. It is
deliberately paired with a `robots.txt` that still allows crawling, because a
disallowed crawler never reads the noindex tag and Google will list the bare
URL anyway. Flipping it to `true` is the launch; do not flip it while the
teaching philosophy is still a draft in the wrong voice or the example
portfolio entry is still present.

**Every teaching entry needs all four sections.** `lib/content.ts` throws at
build time if an entry is missing "What the activity asked", "What I made",
"What I learned", or "How this shapes my teaching". An entry without the
reflection is evidence of attendance, not of teaching skill. Do not weaken this
check to get a build through.

**Carousels auto-advance, and that is the one exception to the rule below.**
`components/carousel.tsx` rotates the SensDS walkthrough and the gallery. It
never starts under `prefers-reduced-motion`, pauses on hover and on keyboard
focus, stops permanently the moment the reader navigates or clicks into a
slide, and always shows a pause control. WCAG 2.2.2 requires that last one for
anything moving longer than five seconds. Do not remove it.

**One non-user-triggered animation, on the home hero.** It is a real
micro-Doppler capture from SensDS, authored with a WebP loop count of 1: it
plays through once and holds its final frame. It does not loop. Everything else
on the site responds to a click, hover, or route change. No scroll-triggered
fade-ups, no typewriter, no count-ups, no parallax. Every animation is wrapped
in a `prefers-reduced-motion` check — the hero never requests the animated file
at all under reduced motion.

**The hero is an `<img>`, not `next/image`.** `next/image` puts animated WebP
through its loader and drops the animation. It is also loaded in two stages:
the 10 KB still renders first so it, not the 652 KB animation, is the largest
contentful paint.

**`--capture-field` does not change between themes.** It matches the jet
colormap's own background so the capture's letterbox is invisible. It belongs
to the data, not to the site palette — that is why it is the one token with the
same value in `:root` and `.dark`.

## Rebuilding the hero capture

```bash
python3 scripts/build-hero-capture.py
```

The master recording is tracked at `media/sensds-micro-doppler-capture.gif`, so
the hero and the OG card can always be rebuilt from source.

**Only frames 0-199 of that recording are usable.** Past frame 200 a mouse
cursor drifts through the plot; around frame 342 a macOS system menu ("Screen
Saver", "Lock Screen") drops over the middle of it; and from about frame 386
the signal is flat because the recording is being stopped. The script crops to
the plot interior at roughly +/-2.5 m/s, which also removes the axes and a
stray cursor sitting in the upper right, and drops to 16.7fps. That takes the
asset from 15.3 MB to 457 KB.

If you ever swap in a different recording, re-check `FIRST_FRAME`, `LAST_FRAME`
and `CROP` at the top of the script. They are specific to this capture, and the
UI intrusions above are exactly the kind of thing that ships unnoticed.

## Walkthrough figures on a project page

Add a `figures:` list to a project's MDX frontmatter and they render as a
click-to-play sequence under the write-up. Each entry needs `src` (path with no
extension), `width`, `height`, `label`, `caption` and `alt`; the build script
writes `<src>.webp` and `<src>-still.webp`.

```bash
python3 scripts/build-research-figures.py [name ...]
```

Only the stills load with the page; the animation is fetched on click. That is
deliberate — four looping demos would break the site's rule of a single
non-user-triggered animation, and would cost about 1.3 MB on load.

**The three app captures are 400px wide and upscale 2.16x to fill the column.**
Re-record them at native window resolution and rerun the script; the figure
`width`/`height` in frontmatter are the only other things to update.

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

Prose style: no em dashes. Use a comma, a colon, or a second sentence. They had
built up across the content and read as a tell.

Set `draft: true` on any entry or project to keep it out of the build.

## Deployment

Vercel, static export. Domain stays registered at GoDaddy; only DNS points to
Vercel. See `README.md` for the DNS records.
