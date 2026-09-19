/**
 * Seed Sanity with original Myy Space categories and blog posts.
 * Requires SANITY_API_WRITE_TOKEN with Editor access.
 *
 *   npx tsx scripts/seed-sanity.ts
 */
import { createClient } from '@sanity/client'
import { blogs } from '../src/data/blogs'
import { FALLBACK_CATEGORIES } from '../src/lib/fallbackCategories'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'p3lp3hwm'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!token) {
  console.error('Set SANITY_API_WRITE_TOKEN before seeding.')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

async function seed() {
  for (const category of FALLBACK_CATEGORIES) {
    const id = `category-${category.slug}`
    await client.createOrReplace({
      _id: id,
      _type: 'category',
      title: category.title,
      navLabel: category.navLabel,
      slug: { _type: 'slug', current: category.slug },
      subtitle: category.subtitle,
      pageUrl: `https://myyspacefurniture.com/${category.slug}`,
      heroImageUrl: category.heroImage,
      menuImageUrl: category.menuImage,
      order: category.order,
      showInNav: category.showInNav,
      gallery: category.gallery.map((item, index) => ({
        _type: 'galleryItem',
        _key: `${category.slug}-${index}`,
        localSrc: item.src,
        alt: item.alt,
      })),
    })
    console.log('Upserted category', category.slug)
  }

  for (const post of blogs) {
    const id = `post-${post.slug}`
    await client.createOrReplace({
      _id: id,
      _type: 'post',
      title: post.title,
      slug: { _type: 'slug', current: post.slug },
      excerpt: post.excerpt,
      coverImageUrl: post.coverImage,
      category: post.category,
      publishedAt: new Date(post.date).toISOString(),
      readTime: post.readTime,
      author: post.author,
      bodyHtml: post.content,
    })
    console.log('Upserted post', post.slug)
  }

  console.log('Seed complete.')
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})
