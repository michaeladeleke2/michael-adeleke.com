export type Photo = {
  id: string
  src: string
  width: number
  height: number
  alt: string
  /** Captions carry context: where, when, what. A gallery without them is decoration. */
  caption: string
  where: string
  when: string
}

/**
 * Add files to /public/gallery and describe them here. `width` and `height`
 * are the image's real pixel dimensions — next/image needs them and they
 * prevent layout shift.
 */
export const photos: Photo[] = []
