import { MDXRemote } from 'next-mdx-remote/rsc'
import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'

const components = {
  a: ({ href = '', ...props }: React.ComponentProps<'a'>) =>
    href.startsWith('/') ? (
      <Link href={href} {...props} />
    ) : (
      <a href={href} {...props} />
    ),
  img: (props: ImageProps) => (
    // MDX authors must supply width/height; next/image enforces it.
    <Image {...props} alt={props.alt ?? ''} />
  ),
}

/** Long-form content: portfolio reflections and project write-ups. */
export function Mdx({ source }: { source: string }) {
  return (
    <div className="prose-body">
      <MDXRemote source={source} components={components} />
    </div>
  )
}
