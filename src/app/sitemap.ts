import { MetadataRoute } from 'next'
import { getCategories, getPosts } from '@/sanity/fetch'

const BASE = 'https://myyspacefurniture.com'

/** Routes that must never appear in the sitemap (CMS / private tools). */
const BLOCKED_PATH_PREFIXES = ['/studio', '/api', '/admin']

function isAllowed(path: string) {
  return !BLOCKED_PATH_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const today = new Date()
  const categories = await getCategories()
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

  const categoryRoutes = categories
    .filter((item) => item.slug && isAllowed(`/${item.slug}`))
    .map((item) => ({
      url: `${BASE}/${item.slug}`,
      lastModified: today,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    }))

  const blogRoutes = posts
    .filter((post) => post.slug && isAllowed(`/blog/${post.slug}`))
    .map((post) => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : today,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  return [...staticRoutes, ...categoryRoutes, ...blogRoutes]
}
