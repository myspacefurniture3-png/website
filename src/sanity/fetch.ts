import { client } from './client'
import { categoriesQuery, postBySlugQuery, postsQuery } from './queries'
import { FALLBACK_CATEGORIES } from '@/lib/fallbackCategories'
import { CATEGORY_SLUG_REMAP, MAIN_CATEGORIES, SOFA_GALLERY_SLUGS } from '@/lib/catalog'
import { filterAvailableImages, publicImageExists } from '@/lib/publicImages'
import { blogs } from '@/data/blogs'
import type { Category, GalleryItem, Post } from '@/lib/types'

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
    author: post.author || 'Myy Space Furniture',
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

function presentCategory(category: Category): Category {
  const slug = CATEGORY_SLUG_REMAP[category.slug] || category.slug
  const featured = MAIN_CATEGORIES.find((item) => item.slug === slug)
  if (!featured) return { ...category, slug }
  return {
    ...category,
    slug,
    title: featured.title,
    navLabel: featured.title,
    subtitle: featured.subtitle,
    order: featured.order,
    showInNav: true,
  }
}

function uniqueGallery(images: GalleryItem[]) {
  const seen = new Set<string>()
  return images.filter((image) => {
    if (!image?.src || seen.has(image.src)) return false
    seen.add(image.src)
    return true
  })
}

/** Pull leather and fabric sectionals into Sofas & Sectionals so that page matches the name. */
function mergeSofaGalleries(categories: Category[]): Category[] {
  const extras = categories.filter((item) =>
    (SOFA_GALLERY_SLUGS as readonly string[]).includes(item.slug)
  )
  if (!extras.length) return categories

  return categories.map((item) => {
    const slug = CATEGORY_SLUG_REMAP[item.slug] || item.slug
    if (slug !== 'sofas-sectionals') return item
    const sectionalShots = uniqueGallery(
      extras.flatMap((extra) => [
        ...extra.gallery,
        ...(extra.heroImage ? [{ src: extra.heroImage, alt: 'Sofas & Sectionals' }] : []),
        ...(extra.menuImage ? [{ src: extra.menuImage, alt: 'Sofas & Sectionals' }] : []),
      ])
    )
    const own = uniqueGallery(item.gallery)
    const fresh = sectionalShots.filter((image) => !own.some((shot) => shot.src === image.src))
    const lead = fresh.slice(0, 4)
    const rest = fresh.slice(4)
    return {
      ...item,
      gallery: uniqueGallery([...own.slice(0, 2), ...lead, ...own.slice(2), ...rest]),
    }
  })
}

function finalizeCategories(categories: Category[]): Category[] {
  const merged = mergeSofaGalleries(categories)
  const allowed = new Set(MAIN_CATEGORIES.map((item) => item.slug))
  const bySlug = new Map<string, Category>()

  for (const item of merged) {
    const presented = presentCategory(item)
    if (!allowed.has(presented.slug)) continue
    const existing = bySlug.get(presented.slug)
    if (!existing) {
      bySlug.set(presented.slug, presented)
      continue
    }
    bySlug.set(presented.slug, {
      ...existing,
      heroImage: existing.heroImage || presented.heroImage,
      menuImage: existing.menuImage || presented.menuImage,
      gallery: uniqueGallery([...existing.gallery, ...presented.gallery]),
    })
  }

  if (!bySlug.has('outdoor')) {
    const outdoor = FALLBACK_CATEGORIES.find((item) => item.slug === 'outdoor')
    if (outdoor) bySlug.set('outdoor', presentCategory(normalizeCategory(outdoor)))
  }

  return MAIN_CATEGORIES.map((item) => bySlug.get(item.slug)).filter((item): item is Category => Boolean(item))
}

export async function getCategories(): Promise<Category[]> {
  try {
    const data = await client.fetch<Category[]>(categoriesQuery)
    const categories = (data || []).filter(isValidCategory).map(normalizeCategory)
    if (categories.length > 0) return finalizeCategories(categories)
  } catch (error) {
    console.error('Sanity categories fetch failed, using fallback', error)
  }
  return finalizeCategories(FALLBACK_CATEGORIES.map(normalizeCategory))
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const categories = await getCategories()
    const match = categories.find((item) => item.slug === slug)
    if (match) return match
  } catch (error) {
    console.error('Sanity category fetch failed, using fallback', error)
  }
  const fallback = FALLBACK_CATEGORIES.find(
    (item) => item.slug === slug || CATEGORY_SLUG_REMAP[item.slug] === slug
  )
  if (!fallback) return null
  return finalizeCategories([normalizeCategory(fallback)])[0] ?? null
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
      featured: item.featured ?? index === 0,
      publishedAt: item.date ? new Date(item.date).toISOString() : undefined,
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
