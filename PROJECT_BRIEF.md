# michael-adeleke.com — Project Brief

Hand this file to Claude Code as the starting context. Save it in the repo root as
`PROJECT_BRIEF.md` and reference it from `CLAUDE.md`.

---

## 1. What this is

A personal academic website for Michael Adeleke, PhD student in Computer Science at
the University of Alabama. It has two jobs:

1. **Public professional presence.** The page that comes up when a program chair, a
   collaborator, or a hiring committee searches his name. Research, publications,
   projects, CV.
2. **Teaching portfolio.** A structured, reflective portfolio of teaching artifacts,
   built to satisfy a graduate course requirement (AHE 603, College and University
   Teaching) and to be sent to search committees for teaching positions.

Audience, in priority order: academic search committees and program chairs, research
collaborators, industry recruiters, prospective students and mentees.

The site must load fast, read well on a phone, and be legible to someone skimming for
thirty seconds.

---

## 2. Stack

- **Next.js 15, App Router, static export** (`output: 'export'`). Static export because
  the site has no server needs and this makes hosting trivial and free. App Router
  because the route structure maps cleanly to the content sections.
- **TypeScript.**
- **Tailwind CSS** for styling, with the design tokens in section 4 defined as CSS
  custom properties in `globals.css` and surfaced through `tailwind.config.ts`. Do not
  hardcode hex values in components.
- **Framer Motion** for interaction. See section 5 for what motion is and is not for.
- **MDX** for teaching portfolio entries and project write-ups, so content lives in
  files rather than in JSX. Use `@next/mdx` or `next-mdx-remote`.
- **next/image** for all images, with explicit width and height.

No CMS, no database, no auth. Content is files in the repo.

### Deployment

Deploy to **Vercel** (free tier, zero config for Next.js). The domain stays registered
at GoDaddy; only DNS points elsewhere. Do not transfer the domain.

In GoDaddy DNS:
- `A` record, host `@`, pointing to Vercel's apex IP (Vercel shows the current value
  when the domain is added to the project)
- `CNAME` record, host `www`, pointing to the Vercel-provided target

Add both `michael-adeleke.com` and `www.michael-adeleke.com` in the Vercel project and
set the apex as primary. Propagation is usually under an hour.

---

## 3. Route structure

```
/                     Home
/about                Bio, background, headshot, current focus
/research             Research areas + project index
/research/[slug]      Individual project write-up
/publications         Publications, presentations, awards
/teaching             Teaching philosophy + portfolio index
/teaching/[slug]      Individual portfolio entry
/cv                   Embedded PDF viewer + download link
/gallery              Photo gallery
/contact              Email, LinkedIn, GitHub, Google Scholar
```

Persistent header nav across all routes. On mobile it collapses to a sheet, not a
hamburger dropdown that pushes content.

`/teaching` is the portfolio index and is publicly linkable on its own, so it can be
sent as a single URL in a job application without the recipient having to navigate.

---

## 4. Design direction

### The idea

Michael's research is radar sensing: micro-Doppler spectrograms, range-Doppler maps,
signal returns over time. That is the visual vernacular this site should borrow from,
and it is what keeps it from looking like every other academic template. Spectrograms
are horizontal bands of varying intensity against a dark field. That is the motif:
horizontal banding, intensity as hierarchy, a sense of signal resolving out of noise.

**Spend the boldness on the home hero.** Everything else stays quiet.

### Color

Light mode:
```
--bg          #FFFFFF   page
--surface     #F6F4F3   raised panels, code blocks
--ink         #1A1614   body text
--ink-muted   #6B625E   secondary text, dates, captions
--accent      #A31621   deep crimson — links, active nav, key emphasis
--accent-soft #E8C4C7   accent at low intensity — rules, spectrogram low bands
```

Dark mode:
```
--bg          #121011   page
--surface     #1D1A1B   raised panels
--ink         #EDE9E7   body text
--ink-muted   #948B87   secondary text
--accent      #D42C3A   crimson, lifted for contrast on dark
--accent-soft #4A1D22   accent at low intensity
```

Notes on the red. `#A31621` is a deep oxblood crimson, not a bright signal red. It is
close enough to Alabama crimson to feel connected without imitating university
branding, and it holds up as a link color at body size, which a brighter red does not.
Verify all text pairs at 4.5:1 minimum. `--accent` on `--bg` passes in both modes;
`--accent-soft` is for surfaces and rules only, never for text.

Dark mode is a class on `<html>`, toggled by a control in the header, defaulting to the
system preference and persisting the user's choice in localStorage. Read the stored
value in a blocking inline script in `<head>` so there is no flash on load.

### Typography

Two families, clearly distinct:

- **Display and headings:** a grotesque with real character at large sizes. Use
  **Söhne** if licensed, otherwise **Inter Tight** at weight 600, tracking tightened to
  about `-0.02em` at display sizes. Set headings in sentence case.
- **Body:** **Source Serif 4**, 400, at 18px base with 1.65 line-height. A serif at
  reading size signals the academic register without the site having to say so, and it
  distinguishes long-form portfolio reflections from interface text.
- **Data and metadata** (dates, venues, DOIs, page counts): body serif at 15px in
  `--ink-muted`. Do not reach for a monospace face for these; it is a tell.

Type scale, following a classic modular progression:
`14 / 16 / 18 / 21 / 28 / 38 / 52 / 72`

Body line length capped at 68 characters (`max-w-[34rem]` at 18px serif).

### Things to avoid

These are the defaults that make a page look generated, and this site should not have
them:

- All-caps tracked-out eyebrow labels above headings
- Metadata strings joined with middle dots
- Identical rounded cards with identical soft grey shadows for every content type
- Numbered markers (01 / 02 / 03) on content that is not a sequence
- Gradient washes used as decoration
- A `→` glued onto every link and button
- Accenting one word of a headline in a different color

---

## 5. Interaction and motion

The request was for things that float and feel interactive. The line to hold: motion
that responds to the user is good, motion that plays at the user is noise. Build the
first, skip the second.

**Build these:**

- **Home hero, one orchestrated moment.** A canvas or SVG spectrogram band that
  resolves from noise into structure once, on load, over about 1.2s, then holds
  still. It is the one non-user-triggered animation on the site. If a WebGL or canvas
  version proves fussy, an animated SVG with a mask sweep is fine.
- **Cursor-reactive depth on the hero.** The spectrogram bands shift on a parallax of a
  few pixels following pointer position. Subtle, capped at about 8px of travel.
- **Publication entries expand in place.** Clicking a publication reveals the abstract
  and links beneath it with a height transition. This is the "floating" interaction
  that actually earns its place, because it answers a click.
- **Portfolio entry cards lift on hover**, 2px translate and a shadow that deepens,
  120ms. One hover treatment, used consistently.
- **Nav underline slides between active routes** using a Framer Motion `layoutId`.
- **Gallery lightbox** with shared-element transition from thumbnail to full image.

**Do not build:**

- Fade-and-slide-up entrances on every section as the user scrolls. This is the single
  most common generated-page tell.
- Typewriter text effects
- Parallax on anything other than the hero
- Count-up number animations

Wrap every animation in a `prefers-reduced-motion` check. When reduced motion is set,
the hero renders in its resolved final state immediately and hover lifts become color
changes only.

---

## 6. Content

Real content comes from the CV. Store it as typed data, not as JSX prose, so it can be
updated in one place:

```
/content
  publications.ts     Structured citation objects
  presentations.ts
  awards.ts
  projects/           MDX, one file per project
  teaching/           MDX, one file per portfolio entry
  teaching-philosophy.mdx
```

### Publication data shape

```ts
type Publication = {
  id: string
  type: 'conference' | 'extended-abstract' | 'under-review'
  authors: string[]          // "Michael B. Adeleke" gets bolded at render time
  year: number
  title: string
  venue: string
  venueShort?: string        // "SIGCSE 2024"
  location?: string
  pages?: string
  doi?: string
  abstract?: string
  pdfUrl?: string
}
```

Render the author list with Michael's name in `font-semibold`. Author position is
information; make it readable at a glance.

### What goes on each page

**Home.** The hero. One sentence on what he works on. Three or four cards linking to
Research, Publications, Teaching, CV. Most recent thing (the AHFE presentation, the
SIGCSE submission) surfaced as a short "recent" line. Nothing else. Resist the urge to
put a full bio here.

**About.** Headshot. Two or three paragraphs: the through-line from radar sensing to
accessible ML education, why those connect, where he's headed. Education, advisors,
fellowships. This page can be personal in a way the others should not be.

**Research.** Short framing of the research areas, then project entries. Seed with:
- SensDSv2 — radar-based ML education platform. This is the flagship; give it the
  fullest write-up, with screenshots of the six-tab interface and a spectrogram
  capture.
- Collision Course — VR concussion awareness
- CodeBears — summer coding camp, K-12 outreach
- GradPulse — hold this until it has something to show

**Publications.** Grouped as on the CV: peer-reviewed conference papers, extended
abstracts, under review. Then presentations and research competitions. Then awards.
DOIs are links.

**Teaching.** Philosophy statement first, at reading length, not bullet points. Then
the portfolio index. See section 7.

**CV.** Embed the PDF with a browser-native viewer and a prominent download button.
Keep the PDF at a stable path (`/cv/michael-adeleke-cv.pdf`) so links in application
materials do not break when it is updated.

**Gallery.** Conference photos, camp and classroom photos, lab and hardware shots.
Captions carry context: where, when, what. A gallery without captions is decoration.

---

## 7. Teaching portfolio structure

This is the part that does double duty, so it needs more structure than a list of
uploads.

`/teaching` opens with the **teaching philosophy statement**, then the portfolio index
grouped by theme rather than by class session. Suggested themes, to be adjusted once
the ten activities are chosen:

- Course and lesson design
- Assessment and feedback
- Inclusive and equitable teaching practice
- Reflection on practice

Each entry is an MDX file with this frontmatter and structure:

```mdx
---
title: "Backward design for an intro programming unit"
theme: "Course and lesson design"
date: "2026-02-14"
artifacts:
  - { label: "Unit plan", file: "/teaching/files/unit-plan.pdf" }
competencies: ["Learning objectives", "Alignment", "Assessment design"]
---

## What the activity asked

One short paragraph. Set the context for a reader who was not in the room.

## What I made

What the artifact is and the decisions behind it.

## What I learned

The honest part. What surprised you, what you would do differently.

## How this shapes my teaching

The connection to practice. This is the paragraph a search committee actually reads.
```

Two things to enforce in the build:

- **Every entry needs all four sections.** An entry without the reflection is evidence
  of attendance, not of teaching skill.
- **Artifacts attach to entries; they are never the entry.** The page is the reflection
  with the file linked from it.

Before publishing, check each artifact for anything that identifies classmates,
students, or their work. Redact or replace with a description if so.

---

## 8. Quality floor

Not optional, and not worth announcing on the page:

- Responsive from 360px up. Test at 360, 768, 1280.
- Visible keyboard focus rings using `--accent`. Do not remove outlines.
- `prefers-reduced-motion` respected everywhere.
- All text at 4.5:1 contrast minimum in both themes.
- Semantic HTML. One `h1` per page, headings in order.
- Per-route metadata: title, description, Open Graph image. This site's main job is
  showing up correctly when someone searches his name.
- `JSON-LD` `Person` schema on the home page with `name`, `jobTitle`, `affiliation`,
  `sameAs` links to LinkedIn, GitHub, ORCID, Google Scholar.
- `sitemap.xml` and `robots.txt`.
- Lighthouse: 95+ on performance and accessibility before launch.

---

## 9. Build order

1. Scaffold, tokens, theme toggle, header and footer, one placeholder route
2. Typography scale and base prose styles, verified against a real paragraph
3. Content data layer and MDX pipeline
4. About, Publications, CV — the pages with the least uncertainty
5. Research and project pages
6. Teaching philosophy and portfolio system
7. Home hero, last, once the rest of the site's visual language is settled
8. Gallery
9. Metadata, schema, sitemap, accessibility audit
10. Deploy to Vercel, point GoDaddy DNS, verify both apex and www

Building the hero last is deliberate. It is the one place taking a visual risk, and it
should react to the site that exists rather than dictate it.
