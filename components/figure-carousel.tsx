'use client'

import { Carousel } from './carousel'
import { ResearchFigure, type FigureSpec } from './research-figure'

/** The project walkthrough: one demo at a time, with the sequence still
 *  readable as a thumbnail strip so the pipeline order is not lost. */
export function FigureCarousel({ figures }: { figures: FigureSpec[] }) {
  return (
    <Carousel
      label="System walkthrough"
      items={figures.map((f) => ({
        id: f.src,
        label: f.label,
        thumbSrc: `${f.src}-still.webp`,
        thumbAlt: f.alt,
      }))}
      renderSlide={(i) => <ResearchFigure figure={figures[i]} />}
    />
  )
}
