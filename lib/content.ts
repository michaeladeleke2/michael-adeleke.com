import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const CONTENT_DIR = path.join(process.cwd(), 'content')

export type ProjectFrontmatter = {
  title: string
  summary: string
  period: string
  area: string
  role?: string
  stack?: string[]
  links?: { label: string; href: string }[]
  featured?: boolean
  order?: number
  draft?: boolean
}

export type TeachingFrontmatter = {
  title: string
  theme: string
  date: string
  artifacts?: { label: string; file: string }[]
  competencies?: string[]
  draft?: boolean
  /** Marks a structural exemplar, rendered with a visible notice. */
  example?: boolean
}

export type Entry<T> = {
  slug: string
  frontmatter: T
  body: string
}

function readCollection<T>(dir: string): Entry<T>[] {
  const full = path.join(CONTENT_DIR, dir)
  if (!fs.existsSync(full)) return []
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(full, file), 'utf8')
      const { data, content } = matter(raw)
      return {
        slug: file.replace(/\.mdx$/, ''),
        frontmatter: data as T,
        body: content,
      }
    })
    .filter((e) => !(e.frontmatter as { draft?: boolean }).draft)
}

export function getProjects(): Entry<ProjectFrontmatter>[] {
  return readCollection<ProjectFrontmatter>('projects').sort(
    (a, b) => (a.frontmatter.order ?? 99) - (b.frontmatter.order ?? 99),
  )
}

export function getProject(slug: string) {
  return getProjects().find((p) => p.slug === slug)
}

/** The four sections every portfolio entry must carry. */
export const REQUIRED_TEACHING_SECTIONS = [
  'What the activity asked',
  'What I made',
  'What I learned',
  'How this shapes my teaching',
] as const

/**
 * An entry without the reflection is evidence of attendance, not of teaching
 * skill. Missing sections fail the build rather than shipping quietly.
 */
function assertTeachingSections(entry: Entry<TeachingFrontmatter>) {
  const headings = [...entry.body.matchAll(/^##\s+(.+)$/gm)].map((m) =>
    m[1].trim().toLowerCase(),
  )
  const missing = REQUIRED_TEACHING_SECTIONS.filter(
    (s) => !headings.includes(s.toLowerCase()),
  )
  if (missing.length > 0) {
    throw new Error(
      `content/teaching/${entry.slug}.mdx is missing required section(s): ` +
        missing.join(', ') +
        `. Every portfolio entry needs all four.`,
    )
  }
}

export function getTeachingEntries(): Entry<TeachingFrontmatter>[] {
  const entries = readCollection<TeachingFrontmatter>('teaching')
  entries.forEach(assertTeachingSections)
  return entries.sort((a, b) =>
    b.frontmatter.date.localeCompare(a.frontmatter.date),
  )
}

export function getTeachingEntry(slug: string) {
  return getTeachingEntries().find((e) => e.slug === slug)
}

/** Portfolio index order. Themes with no entries are not rendered. */
export const TEACHING_THEMES = [
  'Course and lesson design',
  'Assessment and feedback',
  'Inclusive and equitable teaching practice',
  'Reflection on practice',
] as const

export function getTeachingByTheme() {
  const entries = getTeachingEntries()
  const known = TEACHING_THEMES.map((theme) => ({
    theme,
    entries: entries.filter((e) => e.frontmatter.theme === theme),
  })).filter((g) => g.entries.length > 0)

  const other = entries.filter(
    (e) => !TEACHING_THEMES.includes(e.frontmatter.theme as never),
  )
  return other.length > 0
    ? [...known, { theme: 'Other', entries: other }]
    : known
}

export function getTeachingPhilosophy(): string {
  const file = path.join(CONTENT_DIR, 'teaching-philosophy.mdx')
  if (!fs.existsSync(file)) return ''
  return matter(fs.readFileSync(file, 'utf8')).content
}
