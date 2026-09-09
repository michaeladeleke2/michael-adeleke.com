import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHeader, SectionHeading, Shell } from '@/components/page-header'
import { education, positions, researchInterests } from '@/content/cv-data'

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
            I am a PhD student in Computer Science at the University of Alabama, working
            in Dr. Chris Crawford&rsquo;s Human-Technology Interaction Lab. My work sits
            between two things that look separate but are not: radar sensing and how
            people learn machine learning.
          </p>
          <p>
            The sensing side is micro-Doppler. A 60 GHz radar sensor returns a signal
            that, once processed through a range FFT, clutter suppression, and a
            short-time Fourier transform, becomes an image of motion over time: a
            spectrogram in which a wave of the hand has a shape you can recognize. I care
            about what these systems can do as interfaces and about the gap between how
            they behave in a lab and how they behave in a room full of people who did not
            read the manual.
          </p>
          <p>
            That gap is where the education work comes from. Machine learning is usually
            taught on datasets that have already been cleaned, labeled, and balanced by
            someone else, quietly removing many of the decisions that matter. SensDS, the
            system I am building, hands those decisions back: students collect their own
            radar data, train on it, and watch the model fail in ways that are legible. A
            novelty detector I added as an engineering feature flags captures that fall
            outside the training distribution. It also creates an opportunity to make
            distribution shift something students can encounter directly rather than
            simply a term discussed in a lecture.
          </p>
          <p>
            Before Alabama, I spent three years in Dr. Naja Mack&rsquo;s Human-AI eXperience
            Lab at Morgan State, working on VR for concussion education, bias in
            conversational AI, and K–12 computing outreach. I also coordinated the
            CodeBears summer camp across three summers and taught Introduction to Computer
            Science I as adjunct faculty in spring 2025. Most of what I believe about
            teaching came out of those rooms.
          </p>
          <p>
            Where I am headed: sensing systems that are legible enough to learn from, and
            computing classrooms where the hard parts are visible instead of hidden.
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
        </aside>
      </div>

      <section className="mx-auto mt-12 max-w-[54rem]">
        <SectionHeading>Positions</SectionHeading>
        <ul className="mt-6">
          {positions.map((p) => (
            <li
              key={p.title + p.period}
              className="grid gap-1 border-b border-hairline py-5 last:border-0 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-8"
            >
              <p className="text-xs text-ink-muted">{p.period}</p>
              <div>
                <p className="font-display text-base text-ink">{p.title}</p>
                <p className="mt-0.5 text-xs text-ink-muted">
                  {[p.org, p.location].filter(Boolean).join(', ')}
                </p>
                <p className="mt-1.5 text-sm text-ink-muted">{p.summary}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Shell>
  )
}
