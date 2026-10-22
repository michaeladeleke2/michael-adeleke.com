import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHeader, SectionHeading, Shell } from '@/components/page-header'
import {
  education,
  memberships,
  positions,
  researchInterests,
  technicalSkills,
} from '@/content/cv-data'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Michael Adeleke is a PhD student at the University of Alabama working on radar sensing and accessible machine learning education.',
  alternates: { canonical: '/about/' },
}

export default function AboutPage() {
  return (
    <Shell>
      <PageHeader title="About" />

      {/* Two columns, centred as a block. The grid is capped at its own
          content width so it sits in the middle of the shell rather than
          hugging the left edge with dead space on the right. */}
      <div className="mx-auto mt-10 grid max-w-[54rem] gap-12 lg:grid-cols-[minmax(0,34rem)_minmax(0,16rem)]">
        <div className="text-base text-ink [&>*+*]:mt-[1.1em]">
          <p>
            I&rsquo;m a PhD student in Computer Science at the University of
            Alabama, working with Dr. Chris Crawford in the Human-Technology
            Interaction Lab (HTIL). My research explores how sensing
            technologies, machine learning, and human-computer interaction can
            create interactive experiences while making computing more
            accessible and engaging to learn.
          </p>
          <p>
            My current work focuses on radar-based sensing and micro-Doppler
            signal processing. Using a 60 GHz radar sensor, I investigate how
            movements can be captured, processed, and interpreted to support
            interactive human-technology experiences. I&rsquo;m also developing
            SensDS, a platform designed to bring radar sensing and machine
            learning into hands-on educational settings. Rather than giving
            students preprocessed datasets and trained models, SensDS lets them
            collect their own data, train models, test predictions, and
            investigate how and why those models fail. Through this work,
            I&rsquo;m interested in making the underlying decisions and
            limitations of machine learning visible to learners.
          </p>
          <p>
            Before joining Alabama, I spent nearly three years conducting
            research in Dr. Naja Mack&rsquo;s Human-AI eXperience Lab at Morgan
            State University. My work spanned virtual reality for concussion
            education, bias in conversational AI, and culturally responsive
            computing education. I also taught Introduction to Computer Science
            I as an adjunct instructor and coordinated CodeBears, a K–12
            computing outreach program that introduced students to programming
            and STEM. These experiences continue to shape my interest in
            designing technology and learning environments that meet people
            where they are.
          </p>
          <p>
            Beyond my individual research projects, I&rsquo;m interested in
            human-computer interaction, machine learning for interactive
            systems, virtual reality for learning, and broadening participation
            in computing. Across these areas, I aim to build systems that
            people can interact with, understand, and learn from, while
            investigating how technology can support more inclusive computing
            experiences.
          </p>
        </div>

        <aside className="space-y-8">
          <Image
            src="/headshot.jpg"
            alt="Michael Adeleke"
            width={400}
            height={400}
            priority
            className="w-full rounded-[4px] object-cover"
          />

          <section>
            <SectionHeading align="left">Education</SectionHeading>
            <ul className="mt-3 space-y-4">
              {education.map((e) => (
                <li key={e.institution}>
                  <p className="text-sm text-ink">{e.degree}</p>
                  <p className="mt-0.5 text-xs text-ink-muted">
                    {e.institution}, {e.location}. {e.period}.
                  </p>
                  {e.advisor && (
                    <p className="text-xs text-ink-muted">
                      Advisor: {e.advisor}
                    </p>
                  )}
                  {e.notes && (
                    <p className="text-xs text-ink-muted">
                      {e.notes.join('. ')}.
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <SectionHeading align="left">Research interests</SectionHeading>
            <ul className="mt-3 space-y-1.5">
              {researchInterests.map((r) => (
                <li key={r} className="text-xs text-ink-muted">
                  {r}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <SectionHeading align="left">Memberships</SectionHeading>
            <ul className="mt-3 space-y-1.5">
              {memberships.map((m) => (
                <li key={m} className="text-xs text-ink-muted">
                  {m}
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      {/* Full width rather than in the sidebar: these are comma lists that
          wrapped badly at 16rem, and moving them out is what balances the two
          columns above, which were 586px apart in content height. */}
      <section className="mx-auto mt-12 max-w-[54rem]">
        <SectionHeading>Technical skills</SectionHeading>
        <dl className="mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2">
          {technicalSkills.map((g) => (
            <div key={g.label}>
              <dt className="font-display text-sm text-ink">{g.label}</dt>
              <dd className="mt-1 text-sm text-ink-muted">
                {g.items.join(', ')}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto mt-12 max-w-[54rem]">
        <SectionHeading>Positions</SectionHeading>
        {/* An ordered list, because it is one: a spine with a marker per role,
            read newest first. The marker for a role with no end date is drawn
            in accent, so what is current is visible without reading a date.
            The ring punches a hole in the spine so the marker sits on it
            rather than over it. */}
        <ol className="relative mt-8 border-l border-hairline pl-6 sm:pl-9">
          {positions.map((p) => {
            const current = !p.end
            return (
              <li key={p.title + p.period} className="relative pb-9 last:pb-0">
                <span
                  aria-hidden="true"
                  className={`absolute -left-[28.5px] top-[0.4rem] h-[9px] w-[9px] rounded-full ring-4 ring-bg sm:-left-[40.5px] ${
                    current ? 'bg-accent' : 'bg-ink-muted'
                  }`}
                />
                <p className="text-xs text-ink-muted">
                  {p.period}
                  {/* A real space, not just the margin: without it this reads
                      as "presentNow" to a screen reader. */}
                  {current && (
                    <>
                      {' '}
                      <span className="ml-1 font-display text-accent">Now</span>
                    </>
                  )}
                </p>
                <p className="mt-1 font-display text-base text-ink">
                  {p.title}
                </p>
                <p className="mt-0.5 text-xs text-ink-muted">
                  {[p.org, p.location].filter(Boolean).join(', ')}
                </p>
                <p className="mt-2 max-w-measure text-sm text-ink-muted">
                  {p.summary}
                </p>
              </li>
            )
          })}
        </ol>
      </section>
    </Shell>
  )
}
