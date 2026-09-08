import type { MetadataRoute } from 'next'
import { INDEXABLE, site } from '@/lib/site'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  // Crawling stays allowed even pre-launch: the per-page noindex tag only
  // works if the crawler is permitted to fetch the page and read it.
  return {
    rules: { userAgent: '*', allow: '/' },
    ...(INDEXABLE ? { sitemap: `${site.url}/sitemap.xml` } : {}),
  }
}
