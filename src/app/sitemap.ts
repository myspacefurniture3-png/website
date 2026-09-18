import { MetadataRoute } from 'next'
import { getCategories, getPosts } from '@/sanity/fetch'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://myyspacefurniture.com'
  const today = new Date()
  const categories = await getCategories()
  const posts = await getPosts()

  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/faq',
    '/financing',
    '/gallery',
    '/blog',
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: today,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }))

  const categoryRoutes = categories.map((item) => ({
    url: `${baseUrl}/${item.slug}`,
    lastModified: today,
    changeFrequency: 'weekly' as const,
    priority: 0.95,
  }))

  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: today,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...categoryRoutes, ...blogRoutes]
}
