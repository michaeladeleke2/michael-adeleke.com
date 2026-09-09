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
        <p className="mx-auto mt-8 max-w-measure text-center text-base text-ink-muted">
          Photos from conferences, camps, and the lab are on their way.
        </p>
      )}
    </Shell>
  )
}
