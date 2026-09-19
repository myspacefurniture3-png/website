/**
 * Sync Sanity categories from FALLBACK_CATEGORIES (Website photos + write-ups).
 * Patches existing docs; creates missing ones. Does not wipe uploaded Sanity image assets
 * unless heroImageUrl/menuImageUrl/gallery are being refreshed by design.
 *
 *   npm run sync:categories
 */
import { createClient } from '@sanity/client'
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { FALLBACK_CATEGORIES } from '../src/lib/fallbackCategories'

function loadEnvLocal() {
  const envPath = resolve(process.cwd(), '.env.local')
  if (!existsSync(envPath)) return
  for (const line of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
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
    if (!process.env[key]) process.env[key] = value
  }
}

loadEnvLocal()

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'p3lp3hwm'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token =
  process.env.SANITY_API_WRITE_TOKEN?.trim() || process.env.SANITY_API_READ_TOKEN?.trim()

if (!token) {
  console.error('Set SANITY_API_WRITE_TOKEN in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
  perspective: 'raw',
})

async function sync() {
  for (const category of FALLBACK_CATEGORIES) {
    const id = `category-${category.slug}`
    const pageUrl = `https://myyspacefurniture.com/${category.slug}`
    const gallery = category.gallery.map((item, index) => ({
      _type: 'galleryItem',
      _key: `${category.slug}-${index}`,
      localSrc: item.src,
      alt: item.alt,
    }))

    const payload = {
      _type: 'category' as const,
      title: category.title,
      navLabel: category.navLabel,
      slug: { _type: 'slug' as const, current: category.slug },
      subtitle: category.subtitle,
      pageUrl,
      heroImageUrl: category.heroImage,
      menuImageUrl: category.menuImage,
      order: category.order,
      showInNav: category.showInNav,
      gallery,
    }

    const existing = await client.fetch<{ _id: string } | null>(`*[_id==$id][0]{_id}`, { id })
    if (existing) {
      await client
        .patch(id)
        .set({
          title: payload.title,
          navLabel: payload.navLabel,
          slug: payload.slug,
          subtitle: payload.subtitle,
          pageUrl: payload.pageUrl,
          heroImageUrl: payload.heroImageUrl,
          menuImageUrl: payload.menuImageUrl,
          order: payload.order,
          showInNav: payload.showInNav,
          gallery: payload.gallery,
        })
        .commit()
      console.log('Updated', id, '→', category.heroImage)
    } else {
      await client.createOrReplace({ _id: id, ...payload })
      console.log('Created', id)
    }
  }
  console.log('Sync complete:', FALLBACK_CATEGORIES.length, 'categories')
}

sync().catch((error) => {
  console.error(error)
  process.exit(1)
})
