import { client } from './client'
import { categoriesQuery, categoryBySlugQuery, postBySlugQuery, postsQuery } from './queries'
import { FALLBACK_CATEGORIES } from '@/lib/fallbackCategories'
import { filterAvailableImages, publicImageExists } from '@/lib/publicImages'
import { blogs } from '@/data/blogs'
import type { Category, Post } from '@/lib/types'

function isValidCategory(value: unknown): value is Category {
  const item = value as Category
  return Boolean(item?.slug && item?.title)
}

function normalizeCategory(item: Category): Category {
  return {
    ...item,
    navLabel: item.navLabel || item.title,
    subtitle: item.subtitle || '',
    heroImage: [item.heroImage, item.menuImage].find((src) => src && publicImageExists(src)) || '',
    menuImage: [item.menuImage, item.heroImage].find((src) => src && publicImageExists(src)) || '',
    order: item.order ?? 0,
    showInNav: item.showInNav !== false,
    gallery: filterAvailableImages((item.gallery || []).filter((entry) => entry?.src)),
  }
}

function formatPost(post: Post): Post {
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : post.date
  const tags = (post.tags || []).filter(Boolean)
  return {
    ...post,
    date: date || '',
    coverImage: post.coverImage && publicImageExists(post.coverImage)
      ? post.coverImage
      : '/products/loveseat (9).jpeg',
    content: post.content || '',
    body: post.body || [],
    author: post.author || 'My Space Furniture',
    readTime: post.readTime || '',
    category: post.category || 'Journal',
    kicker: post.kicker || '',
    featured: Boolean(post.featured),
    featuredQuote: post.featuredQuote || '',
    tags: tags.length ? tags : post.category ? [post.category] : [],
    seoTitle: post.seoTitle || post.title,
    seoDescription: post.seoDescription || post.excerpt || '',
    relatedCategories: (post.relatedCategories || []).filter((item) => item?.slug && item?.title),
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const data = await client.fetch<Category[]>(categoriesQuery)
    const categories = (data || []).filter(isValidCategory).map(normalizeCategory)
    if (categories.length > 0) return categories
  } catch (error) {
    console.error('Sanity categories fetch failed, using fallback', error)
  }
  return FALLBACK_CATEGORIES.map(normalizeCategory)
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const data = await client.fetch<Category | null>(categoryBySlugQuery, { slug })
    if (data && isValidCategory(data)) return normalizeCategory(data)
  } catch (error) {
    console.error('Sanity category fetch failed, using fallback', error)
  }
  const fallback = FALLBACK_CATEGORIES.find((item) => item.slug === slug)
  return fallback ? normalizeCategory(fallback) : null
}

export async function getPosts(): Promise<Post[]> {
  try {
    const data = await client.fetch<Post[]>(postsQuery)
    const posts = (data || []).filter((item) => item?.slug && item?.title).map(formatPost)
    if (posts.length > 0) return posts
  } catch (error) {
    console.error('Sanity posts fetch failed, using fallback', error)
  }
  return blogs.map((item, index) =>
    formatPost({
      ...item,
      featured: index === 0,
      tags: item.tags || [item.category],
    })
  )
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const data = await client.fetch<Post | null>(postBySlugQuery, { slug })
    if (data?.slug && data?.title) return formatPost(data)
  } catch (error) {
    console.error('Sanity post fetch failed, using fallback', error)
  }
  const fallback = blogs.find((item) => item.slug === slug)
  return fallback ? formatPost({ ...fallback, tags: fallback.tags || [fallback.category] }) : null
}
