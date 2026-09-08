export function PageHeader({
  title,
  lede,
  meta,
}: {
  title: string
  lede?: string
  meta?: React.ReactNode
}) {
  return (
    <header className="border-b border-hairline pb-8 text-center">
      <h1 className="mx-auto max-w-[20ch] font-display text-2xl text-ink sm:text-3xl">
        {title}
      </h1>
      {lede && (
        <p className="mx-auto mt-4 max-w-measure text-base text-ink-muted">
          {lede}
        </p>
      )}
      {meta && <div className="mt-5 flex justify-center">{meta}</div>}
    </header>
  )
}

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-shell px-5 pt-12 sm:px-8 sm:pt-16">
      {children}
    </div>
  )
}

export function SectionHeading({
  children,
  align = 'center',
}: {
  children: React.ReactNode
  align?: 'center' | 'left'
}) {
  return (
    <h2
      className={`font-display text-ink ${
        align === 'center' ? 'text-center text-xl' : 'text-left text-lg'
      }`}
    >
      {children}
    </h2>
  )
}
