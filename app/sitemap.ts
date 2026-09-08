import type { MetadataRoute } from 'next'
import { getProjects, getTeachingEntries } from '@/lib/content'
import { site } from '@/lib/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '/',
    '/about/',
    '/research/',
    '/publications/',
    '/teaching/',
    '/cv/',
    '/gallery/',
    '/contact/',
    ...getProjects().map((p) => `/research/${p.slug}/`),
    ...getTeachingEntries().map((e) => `/teaching/${e.slug}/`),
  ]

  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '/' ? 1 : 0.7,
  }))
}
