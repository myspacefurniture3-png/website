import { MetadataRoute } from 'next'
import { MAIN_CATEGORIES } from '@/lib/catalog'
import { SITE_URL } from '@/lib/site'
import { getPosts } from '@/sanity/fetch'

const BASE = SITE_URL

/** Routes that must never appear in the sitemap (CMS / private tools). */
const BLOCKED_PATH_PREFIXES = ['/studio', '/api', '/admin']

function isAllowed(path: string) {
  return !BLOCKED_PATH_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const today = new Date()
  const posts = await getPosts()

  const staticRoutes = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/faq', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/financing', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/gallery', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/blog', priority: 0.85, changeFrequency: 'weekly' as const },
  ]
    .filter((item) => isAllowed(item.path || '/'))
    .map((item) => ({
      url: `${BASE}${item.path}`,
      lastModified: today,
      changeFrequency: item.changeFrequency,
      priority: item.priority,
    }))

  const categoryRoutes = MAIN_CATEGORIES.filter((item) => isAllowed(item.href)).map((item) => ({
    url: `${BASE}${item.href}`,
    lastModified: today,
    changeFrequency: 'weekly' as const,
    priority: 0.95,
  }))

  // All published journal posts (featured posts get higher priority for discovery)
  const blogRoutes = posts
    .filter((post) => post.slug && isAllowed(`/blog/${post.slug}`))
    .map((post) => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : today,
      changeFrequency: 'weekly' as const,
      priority: post.featured ? 0.85 : 0.75,
    }))

  return [...staticRoutes, ...categoryRoutes, ...blogRoutes]
}
