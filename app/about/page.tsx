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

      <div className="mt-10 flex justify-center">
        <Image
          src="/headshot.jpg"
          alt="Michael Adeleke"
          width={400}
          height={400}
          priority
          className="h-48 w-48 rounded-[4px] object-cover"
        />
      </div>

      <div className="prose-body mt-10 text-base text-ink">
        <p>
          I am a PhD student in computer science at the University of Alabama,
          in Chris Crawford&rsquo;s Human-Technology Interaction Lab. My work
          sits between two things that look separate and are not: radar
          sensing, and how people learn machine learning.
        </p>
        <p>
          The sensing side is micro-Doppler. A 60 GHz radar sensor returns a
          signal that, once you put it through a range FFT, clutter
          suppression, and a short-time Fourier transform, becomes an image of
          motion over time, a spectrogram in which a wave of the hand has a
          shape you can recognize. I care about what those systems can do as
          interfaces, and about the gap between how they behave in a lab and
          how they behave in a room full of people who did not read the manual.
        </p>
        <p>
          That gap is where the education work comes from. Machine learning is
          usually taught on datasets that have already been cleaned, labeled,
          and balanced by someone else, which quietly removes every decision
          that matters. SensDS, the system I build, hands those decisions back:
          students collect their own radar data, train on it, and watch the
          model fail in ways that are legible. A novelty detector I added as an
          engineering feature, flagging captures that fall outside the training
          distribution, turned out to be the best teaching moment in the
          system, because it makes distribution shift something that happens to
          you rather than a term in a lecture.
        </p>
        <p>
          Before Alabama I spent three years in Naja Mack&rsquo;s Human-AI
          eXperience Lab at Morgan State, working on VR for concussion
          education, bias in conversational AI, and K-12 computing outreach,
          and coordinating the CodeBears summer camp across three summers. I
          taught Introduction to Computer Science I there as adjunct faculty in
          spring 2025. Most of what I believe about teaching came out of those
          rooms.
        </p>
        <p>
          Where I am headed: sensing systems that are legible enough to learn
          from, and computing classrooms where the hard parts are visible
          instead of hidden.
        </p>
      </div>

      <section className="mt-16">
        <SectionHeading>Education</SectionHeading>
        <ul className="mx-auto mt-6 max-w-measure space-y-6">
          {education.map((e) => (
            <li key={e.institution}>
              <p className="text-base text-ink">{e.degree}</p>
              <p className="mt-0.5 text-xs text-ink-muted">
                {e.institution}, {e.location}. {e.period}.
              </p>
              {e.advisor && (
                <p className="text-xs text-ink-muted">Advisor: {e.advisor}</p>
              )}
              {e.notes && (
                <p className="text-xs text-ink-muted">{e.notes.join('. ')}.</p>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <SectionHeading>Research interests</SectionHeading>
        <ul className="mx-auto mt-6 max-w-measure space-y-1.5">
          {researchInterests.map((r) => (
            <li key={r} className="text-sm text-ink-muted">
              {r}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <SectionHeading>Positions</SectionHeading>
        <ul className="mx-auto mt-6 max-w-measure">
          {positions.map((p) => (
            <li
              key={p.title + p.period}
              className="border-b border-hairline py-5 last:border-0"
            >
              <p className="font-display text-base text-ink">{p.title}</p>
              <p className="mt-0.5 text-xs text-ink-muted">
                {p.org}, {p.location}. {p.period}.
              </p>
              <p className="mt-1.5 text-sm text-ink-muted">{p.summary}</p>
            </li>
          ))}
        </ul>
      </section>
    </Shell>
  )
}
