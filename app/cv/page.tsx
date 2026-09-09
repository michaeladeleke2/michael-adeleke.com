import type { Metadata } from 'next'
import { PageHeader, Shell } from '@/components/page-header'
import { CV_PATH } from '@/lib/site'

export const metadata: Metadata = {
  title: 'CV',
  description: 'Curriculum vitae for Michael Adeleke.',
  alternates: { canonical: '/cv/' },
}

export default function CvPage() {
  return (
    <Shell>
      <PageHeader
        title="Curriculum vitae"
        meta={
          <a
            href={CV_PATH}
            download
            className="inline-flex items-center rounded-full bg-accent px-5 py-2.5 font-display text-sm font-semibold text-on-accent transition-opacity duration-120 hover:opacity-90"
          >
            Download PDF
          </a>
        }
      />

      <div className="mt-6 overflow-hidden rounded-[4px] border border-hairline bg-surface">
        <object
          data={CV_PATH}
          type="application/pdf"
          className="h-[80vh] min-h-[520px] w-full"
          aria-label="Curriculum vitae, PDF"
        >
          <div className="p-8">
            <p className="max-w-measure text-base text-ink-muted">
              Your browser cannot display the PDF inline.{' '}
              <a
                href={CV_PATH}
                className="text-accent underline underline-offset-[0.18em]"
              >
                Download the CV
              </a>{' '}
              instead.
            </p>
          </div>
        </object>
      </div>
    </Shell>
  )
}
