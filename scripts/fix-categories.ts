/**
 * Ensure Sanity category docs exist with pageUrl + URL fallbacks.
 * - Missing docs: createOrReplace from FALLBACK_CATEGORIES
 * - Existing docs: patch only missing fields (preserves uploaded image assets)
 *
 *   npm run fix:categories
 *   npx tsx scripts/fix-categories.ts
 *
 * Requires SANITY_API_WRITE_TOKEN (Editor) in .env.local
 */
import { createClient } from '@sanity/client'
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { FALLBACK_CATEGORIES } from '../src/lib/fallbackCategories'

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
const token = process.env.SANITY_API_WRITE_TOKEN?.trim()

if (!token) {
  console.error(
    [
      'SANITY_API_WRITE_TOKEN is missing or empty.',
      '1. Open https://www.sanity.io/manage/project/p3lp3hwm/api#tokens',
      '2. Create a token with Editor permissions',
      '3. Paste it into .env.local as SANITY_API_WRITE_TOKEN=...',
      '4. Re-run: npm run fix:categories',
    ].join('\n')
  )
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

type CategoryDoc = {
  _id: string
  title?: string
  slug?: string
  pageUrl?: string | null
  heroImageUrl?: string | null
  menuImageUrl?: string | null
  gallery?: Array<{
    _key?: string
    localSrc?: string | null
    alt?: string | null
    image?: unknown
  }> | null
}

const QUERY = `*[_type=="category"]{
  _id,
  title,
  "slug": slug.current,
  pageUrl,
  heroImageUrl,
  menuImageUrl,
  gallery
}`

function pageUrlForSlug(slug: string) {
  return `https://myyspacefurniture.com/${slug}`
}

function isEmptyGallery(gallery: CategoryDoc['gallery']) {
  return !gallery || gallery.length === 0
}

function slugFromId(id: string): string | undefined {
  const bare = id.startsWith('drafts.') ? id.slice('drafts.'.length) : id
  if (bare.startsWith('category-')) return bare.slice('category-'.length)
  return undefined
}

async function patchDoc(id: string, setFields: Record<string, unknown>) {
  if (Object.keys(setFields).length === 0) {
    console.log(`  skip ${id} (nothing to set)`)
    return false
  }
  await client.patch(id).set(setFields).commit()
  console.log(`  patched ${id}:`, Object.keys(setFields).join(', '))
  return true
}

function buildCreateDoc(category: (typeof FALLBACK_CATEGORIES)[number]) {
  const id = `category-${category.slug}`
  return {
    _id: id,
    _type: 'category' as const,
    title: category.title,
    navLabel: category.navLabel,
    slug: { _type: 'slug' as const, current: category.slug },
    subtitle: category.subtitle,
    pageUrl: pageUrlForSlug(category.slug),
    heroImageUrl: category.heroImage,
    menuImageUrl: category.menuImage,
    order: category.order,
    showInNav: category.showInNav,
    gallery: category.gallery.map((item, index) => ({
      _type: 'galleryItem' as const,
      _key: `${category.slug}-${index}`,
      localSrc: item.src,
      alt: item.alt,
    })),
  }
}

async function main() {
  const docs = await client.fetch<CategoryDoc[]>(QUERY)
  console.log(
    `Found ${docs.length} category document(s) (perspective=raw; includes drafts if token can see them).`
  )

  const bySlug = new Map<string, CategoryDoc[]>()
  const byId = new Map<string, CategoryDoc>()

  for (const doc of docs) {
    byId.set(doc._id, doc)
    const slug = doc.slug || slugFromId(doc._id)
    if (!slug) continue
    const list = bySlug.get(slug) ?? []
    list.push(doc)
    bySlug.set(slug, list)
  }

  let createdCount = 0
  let patchedCount = 0

  for (const category of FALLBACK_CATEGORIES) {
    const slug = category.slug
    const id = `category-${slug}`
    const existing = bySlug.get(slug) ?? []
    const published = byId.get(id)
    const hasAny = existing.length > 0 || published

    console.log(`\n→ ${slug} (id=${id})`)

    if (!hasAny) {
      await client.createOrReplace(buildCreateDoc(category))
      console.log(`  created ${id} with pageUrl + image fallbacks`)
      createdCount += 1
      continue
    }

    // Patch every matching doc (published + drafts) for missing fields only
    const targets =
      existing.length > 0
        ? existing
        : published
          ? [published]
          : []

    for (const doc of targets) {
      const setFields: Record<string, unknown> = {}
      const desiredPageUrl = pageUrlForSlug(slug)

      if (!doc.pageUrl || doc.pageUrl !== desiredPageUrl) {
        setFields.pageUrl = desiredPageUrl
      }
      if (!doc.heroImageUrl && category.heroImage) {
        setFields.heroImageUrl = category.heroImage
      }
      if (!doc.menuImageUrl && category.menuImage) {
        setFields.menuImageUrl = category.menuImage
      }
      if (isEmptyGallery(doc.gallery) && category.gallery?.length) {
        setFields.gallery = category.gallery.map((item, index) => ({
          _type: 'galleryItem',
          _key: `${slug}-${index}`,
          localSrc: item.src,
          alt: item.alt,
        }))
      }

      const didPatch = await patchDoc(doc._id, setFields)
      if (didPatch) patchedCount += 1
    }

    // Ensure published id exists even if only a draft was present
    if (!published && !byId.has(id)) {
      const draftOnly = existing.some((d) => d._id.startsWith('drafts.'))
      if (draftOnly) {
        await client.createOrReplace(buildCreateDoc(category))
        console.log(`  created published ${id} (only draft existed)`)
        createdCount += 1
      }
    }
  }

  const verify = await client.fetch<
    Array<{ _id: string; slug?: string; pageUrl?: string }>
  >(
    `*[_type=="category"]{_id,"slug":slug.current,pageUrl} | order(slug asc)`
  )
  console.log(`\nVerify: ${verify.length} category doc(s) now in dataset (raw).`)
  for (const row of verify) {
    console.log(`  ${row._id} slug=${row.slug ?? '—'} pageUrl=${row.pageUrl ?? '—'}`)
  }

  console.log(
    `\nDone. Created ${createdCount}, patched ${patchedCount} (of ${FALLBACK_CATEGORIES.length} expected collections).`
  )
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
