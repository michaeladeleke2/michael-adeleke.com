import type { Metadata } from 'next'
import { Inter_Tight, Source_Serif_4 } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ThemeScript } from '@/components/theme-script'
import { site } from '@/lib/site'

const display = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const serif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}, ${site.role}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name}, ${site.role}`,
    description: site.description,
    url: site.url,
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name}, ${site.role}`,
    description: site.description,
    images: ['/og.png'],
  },
  alternates: { canonical: '/' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded focus:bg-bg focus:px-4 focus:py-2 focus:text-sm focus:text-accent focus:shadow-lift"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
