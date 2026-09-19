/**
 * Export missing local journal posts from src/data/blogs.ts into Sanity.
 * SAFE by default: never overwrites title/excerpt/body/bodyHtml on existing docs
 * (Studio edits are preserved). Only creates missing posts and can ensure
 * published+featured flags.
 *
 *   npm run seed:posts
 *   npx tsx scripts/seed-posts.ts
 *   npx tsx scripts/seed-posts.ts --force   # dangerous: overwrite content from local
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

const FORCE = process.argv.includes('--force')
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

if (FORCE) {
  console.warn('WARNING: --force will overwrite existing post content from local blogs.ts')
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
  const fallback = new Date('2026-01-01T12:00:00.000Z')
  fallback.setDate(fallback.getDate() + index)
  return fallback.toISOString()
}

type ExistingPost = {
  _id: string
  slug?: string
  title?: string
  coverImage?: unknown
  coverImageUrl?: string | null
  body?: unknown[] | null
  bodyHtml?: string | null
  published?: boolean | null
  featured?: boolean | null
}

async function seedPosts() {
  const existing = await client.fetch<ExistingPost[]>(
    `*[_type == "post"]{
      _id,
      "slug": slug.current,
      title,
      coverImage,
      coverImageUrl,
      body,
      bodyHtml,
      published,
      featured
    }`
  )
  const bySlug = new Map(
    existing.filter((doc) => doc.slug).map((doc) => [doc.slug as string, doc])
  )

  console.log(`Local blogs: ${blogs.length}`)
  console.log(`Existing Sanity posts: ${existing.length}`)
  console.log(`Mode: ${FORCE ? 'FORCE overwrite' : 'safe (create missing only)'}`)

  let created = 0
  let skipped = 0
  let flagged = 0
  let forced = 0

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
      featured: index === 0,
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

    if (FORCE) {
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
        featured: index === 0,
        published: true,
        bodyHtml: payload.bodyHtml,
        seoTitle: payload.seoTitle,
        seoDescription: payload.seoDescription,
      }
      if (!found.coverImageUrl && post.coverImage) {
        patch.coverImageUrl = post.coverImage
      }
      await client.patch(found._id).set(patch).commit()
      forced += 1
      console.log(`Forced   ${post.slug} (${found._id})`)
      continue
    }

    // Safe mode: never touch Studio content — only ensure published
    const flagPatch: Record<string, unknown> = {}
    if (found.published === false) flagPatch.published = true
    // Only the newest local entry should stay featured by default; clear others later in a pass
    if (!found.coverImageUrl && !found.coverImage && post.coverImage) {
      flagPatch.coverImageUrl = post.coverImage
    }

    if (Object.keys(flagPatch).length > 0) {
      await client.patch(found._id).set(flagPatch).commit()
      flagged += 1
      console.log(`Flagged  ${post.slug} (${found._id}) ${JSON.stringify(flagPatch)}`)
    } else {
      skipped += 1
      console.log(`Skipped  ${post.slug} (keeping Studio content)`)
    }
  }

  // Ensure exactly one featured post (newest by publishedAt)
  const allPosts = await client.fetch<Array<{ _id: string; featured?: boolean }>>(
    `*[_type == "post" && published != false] | order(publishedAt desc) { _id, featured }`
  )
  if (allPosts.length > 0) {
    const [first, ...rest] = allPosts
    if (first.featured !== true) {
      await client.patch(first._id).set({ featured: true }).commit()
      console.log(`Featured ${first._id}`)
    }
    for (const doc of rest) {
      if (doc.featured) {
        await client.patch(doc._id).set({ featured: false }).commit()
        console.log(`Unfeatured ${doc._id}`)
      }
    }
  }

  const after = await client.fetch<
    Array<{ _id: string; slug: string; title?: string; featured?: boolean; published?: boolean }>
  >(
    `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      featured,
      published
    }`
  )

  console.log('')
  console.log(
    `Done. created=${created} skipped=${skipped} flagged=${flagged} forced=${forced} totalInSanity=${after.length}`
  )
  for (const doc of after) {
    console.log(
      `  - ${doc.slug || '(no-slug)'}  "${doc.title || ''}"  featured=${doc.featured !== false}  published=${doc.published !== false}  id=${doc._id}`
    )
  }
}

seedPosts().catch((error) => {
  console.error(error)
  process.exit(1)
})
