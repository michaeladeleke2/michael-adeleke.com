import type { Metadata } from 'next'
import { PageHeader, Shell } from '@/components/page-header'
import { GalleryGrid } from '@/components/gallery-grid'
import { photos } from '@/content/gallery'

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Conference presentations, classroom and camp sessions, and lab hardware.',
  alternates: { canonical: '/gallery/' },
}

export default function GalleryPage() {
  return (
    <Shell>
      <PageHeader
        title="Gallery"
        lede="Conferences, classrooms, and hardware."
      />
      {photos.length > 0 ? (
        <GalleryGrid photos={photos} />
      ) : (
        <p className="mt-10 max-w-measure text-base text-ink-muted">
          Photos are being added. Drop files into{' '}
          <code>/public/gallery</code> and describe them in{' '}
          <code>content/gallery.ts</code>.
        </p>
      )}
    </Shell>
  )
}
