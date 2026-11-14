/**
 * Align published Sanity category fields with the five live collections.
 * Updates slug, title, nav label, page URL, order, and showInNav.
 * Does not replace gallery photos.
 *
 *   npx tsx scripts/align-category-fields.ts
 */
import { createClient } from '@sanity/client'
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { MAIN_CATEGORIES } from '../src/lib/catalog'
import { FALLBACK_CATEGORIES } from '../src/lib/fallbackCategories'
import { SITE_URL } from '../src/lib/site'

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

const token = process.env.SANITY_API_WRITE_TOKEN?.trim()
if (!token) {
  console.error('Set SANITY_API_WRITE_TOKEN in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'p3lp3hwm',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const LIVE_BY_OLD_ID: Record<string, (typeof MAIN_CATEGORIES)[number]['slug']> = {
  'category-loveseats': 'sofas-sectionals',
  'category-bedroom-sets': 'bedroom-sets',
  'category-dining-tables': 'dining-sets',
  'category-bunk-beds': 'kids-bunk-beds',
}

const HIDE = [
  { id: 'category-leather-sectionals', pageUrl: `${SITE_URL}/sofas-sectionals` },
  { id: 'category-fabric-sectionals', pageUrl: `${SITE_URL}/sofas-sectionals` },
  { id: 'category-mattresses', pageUrl: `${SITE_URL}/bedroom-sets` },
  { id: 'category-vanities', pageUrl: `${SITE_URL}/gallery` },
  { id: 'category-custom-furniture', pageUrl: `${SITE_URL}/contact` },
]

async function align() {
  for (const [id, slug] of Object.entries(LIVE_BY_OLD_ID)) {
    const category = MAIN_CATEGORIES.find((item) => item.slug === slug)
    if (!category) continue
    await client
      .patch(id)
      .set({
        title: category.title,
        navLabel: category.title,
        slug: { _type: 'slug', current: category.slug },
        subtitle: category.subtitle,
        pageUrl: `${SITE_URL}${category.href}`,
        order: category.order,
        showInNav: true,
      })
      .commit()
    console.log('Updated', id, '→', category.slug)
  }

  for (const item of HIDE) {
    await client.patch(item.id).set({ showInNav: false, pageUrl: item.pageUrl }).commit()
    console.log('Hidden', item.id)
  }

  const outdoor = FALLBACK_CATEGORIES.find((item) => item.slug === 'outdoor')
  const existingOutdoor = await client.fetch<{ _id: string } | null>(
    `*[_type == "category" && slug.current == "outdoor"][0]{_id}`
  )
  if (!existingOutdoor && outdoor) {
    await client.createOrReplace({
      _id: 'category-outdoor',
      _type: 'category',
      title: outdoor.title,
      navLabel: outdoor.navLabel,
      slug: { _type: 'slug', current: outdoor.slug },
      subtitle: outdoor.subtitle,
      pageUrl: `${SITE_URL}/outdoor`,
      heroImageUrl: outdoor.heroImage,
      menuImageUrl: outdoor.menuImage,
      order: outdoor.order,
      showInNav: true,
      gallery: outdoor.gallery.map((item, index) => ({
        _type: 'image',
        _key: `outdoor-${index}`,
        localSrc: item.src,
        alt: item.alt,
      })),
    })
    console.log('Created category-outdoor')
  } else {
    console.log('Outdoor already exists', existingOutdoor?._id)
  }
}

align().catch((error) => {
  console.error(error)
  process.exit(1)
})
