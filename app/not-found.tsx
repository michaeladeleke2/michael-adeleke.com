import Link from 'next/link'
import { PageHeader, Shell } from '@/components/page-header'

export default function NotFound() {
  return (
    <Shell>
      <PageHeader
        title="No signal here"
        lede="That page does not exist. It may have moved, or the link may be out of date."
      />
      <p className="mt-10">
        <Link
          href="/"
          className="text-base text-accent underline underline-offset-[0.18em]"
        >
          Back to the home page
        </Link>
      </p>
    </Shell>
  )
}
