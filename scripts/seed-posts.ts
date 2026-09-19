/**
 * Export all local journal posts from src/data/blogs.ts into Sanity.
 * - Creates missing posts
 * - Updates existing posts with content + SEO fields
 * - Marks every post published + featured (sitemap + journal)
 *
 *   npm run seed:posts
 *   npx tsx scripts/seed-posts.ts
 *
 * Requires SANITY_API_WRITE_TOKEN (Editor) in .env.local
 */
import { createClient } from '@sanity/client'
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { blogs } from '../src/data/blogs'

function loadEnvLocal() {
  const envPath = resolve(process.cwd(), '.env.local')
  if (!existsSync(envPath)) return
  const text = readFileSync(envPath, 'utf8')
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (process.env[key] === undefined || process.env[key] === '') {
      process.env[key] = value
    }
  }
}

loadEnvLocal()

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'p3lp3hwm'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token =
  process.env.SANITY_API_WRITE_TOKEN?.trim() || process.env.SANITY_API_READ_TOKEN?.trim()

if (!token) {
  console.error(
    [
      'SANITY_API_WRITE_TOKEN is missing or empty.',
      '1. Open https://www.sanity.io/manage/project/p3lp3hwm/api#tokens',
      '2. Create a token with Editor permissions',
      '3. Paste it into .env.local as SANITY_API_WRITE_TOKEN=...',
      '4. Re-run: npm run seed:posts',
    ].join('\n')
  )
  process.exit(1)
}

if (!process.env.SANITY_API_WRITE_TOKEN?.trim()) {
  console.warn('SANITY_API_WRITE_TOKEN empty — using SANITY_API_READ_TOKEN (needs Editor access).')
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
  perspective: 'raw',
})

function parsePublishedAt(date: string, index: number) {
  const parsed = Date.parse(date)
  if (!Number.isNaN(parsed)) return new Date(parsed).toISOString()
  // Stable fallback so newer local entries still sort later when date is invalid
  const fallback = new Date('2026-01-01T12:00:00.000Z')
  fallback.setDate(fallback.getDate() + index)
  return fallback.toISOString()
}

type ExistingPost = {
  _id: string
  slug?: string
  coverImage?: unknown
  coverImageUrl?: string | null
  body?: unknown[] | null
}

async function seedPosts() {
  const existing = await client.fetch<ExistingPost[]>(
    `*[_type == "post"]{ _id, "slug": slug.current, coverImage, coverImageUrl, body }`
  )
  const bySlug = new Map(
    existing
      .filter((doc) => doc.slug)
      .map((doc) => [doc.slug as string, doc])
  )

  console.log(`Local blogs: ${blogs.length}`)
  console.log(`Existing Sanity posts: ${existing.length}`)

  let created = 0
  let updated = 0

  for (let index = 0; index < blogs.length; index += 1) {
    const post = blogs[index]
    const id = `post-${post.slug}`
    const found = bySlug.get(post.slug)
    const publishedAt = parsePublishedAt(post.date, index)
    const tags = post.tags?.length ? post.tags : [post.category].filter(Boolean)

    const payload = {
      _type: 'post' as const,
      title: post.title,
      slug: { _type: 'slug' as const, current: post.slug },
      excerpt: post.excerpt,
      kicker: post.kicker || post.category,
      featuredQuote: post.featuredQuote || '',
      coverImageUrl: post.coverImage,
      category: post.category,
      tags,
      author: post.author || 'Myy Space Furniture',
      readTime: post.readTime,
      publishedAt,
      featured: true,
      published: true,
      bodyHtml: post.content.trim(),
      seoTitle: post.title.slice(0, 70),
      seoDescription: post.excerpt.slice(0, 160),
    }

    if (!found) {
      await client.createOrReplace({ _id: id, ...payload })
      created += 1
      console.log(`Created  ${post.slug}`)
      continue
    }

    // Update content fields; keep Studio-uploaded coverImage / portable body if present
    const patch: Record<string, unknown> = {
      title: payload.title,
      slug: payload.slug,
      excerpt: payload.excerpt,
      kicker: payload.kicker,
      featuredQuote: payload.featuredQuote,
      category: payload.category,
      tags: payload.tags,
      author: payload.author,
      readTime: payload.readTime,
      publishedAt: payload.publishedAt,
      featured: true,
      published: true,
      bodyHtml: payload.bodyHtml,
      seoTitle: payload.seoTitle,
      seoDescription: payload.seoDescription,
    }

    if (!found.coverImageUrl && post.coverImage) {
      patch.coverImageUrl = post.coverImage
    }

    await client.patch(found._id).set(patch).commit()
    updated += 1
    console.log(`Updated  ${post.slug} (${found._id})`)
  }

  const after = await client.fetch<Array<{ slug: string; featured?: boolean; published?: boolean }>>(
    `*[_type == "post"] | order(publishedAt desc) {
      "slug": slug.current,
      featured,
      published
    }`
  )

  console.log('')
  console.log(`Done. created=${created} updated=${updated} totalInSanity=${after.length}`)
  for (const doc of after) {
    console.log(
      `  - ${doc.slug}  featured=${doc.featured !== false}  published=${doc.published !== false}`
    )
  }
}

seedPosts().catch((error) => {
  console.error(error)
  process.exit(1)
})
