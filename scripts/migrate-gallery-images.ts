/**
 * Turn category gallery items into Sanity image entries so Studio can
 * upload many photos at once. Keeps localSrc and the previous nested
 * image asset so the live site still resolves every photo.
 *
 *   npx tsx scripts/migrate-gallery-images.ts
 */
import { createClient } from '@sanity/client'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

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

type AssetRef = { _type?: string; _ref?: string }
type GalleryRaw = {
  _key?: string
  _type?: string
  alt?: string
  localSrc?: string
  asset?: AssetRef
  crop?: unknown
  hotspot?: unknown
  image?: { _type?: string; asset?: AssetRef; crop?: unknown; hotspot?: unknown }
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

function assetOf(item: GalleryRaw): AssetRef | undefined {
  if (item.asset?._ref) return item.asset
  if (item.image?.asset?._ref) return item.image.asset
  return undefined
}

function toImage(item: GalleryRaw, index: number) {
  const asset = assetOf(item)
  const crop = item.crop || item.image?.crop
  const hotspot = item.hotspot || item.image?.hotspot
  const next: Record<string, unknown> = {
    _type: 'image',
    _key: item._key || `gallery-${index}`,
  }
  if (asset) next.asset = asset
  if (crop) next.crop = crop
  if (hotspot) next.hotspot = hotspot
  if (item.alt) next.alt = item.alt
  if (item.localSrc) next.localSrc = item.localSrc
  if (item.image?.asset?._ref) next.image = item.image
  else if (asset) {
    next.image = {
      _type: 'image',
      asset,
      ...(crop ? { crop } : {}),
      ...(hotspot ? { hotspot } : {}),
    }
  }
  return next
}

async function main() {
  const docs = await client.fetch<
    { _id: string; slug?: string; gallery?: GalleryRaw[] }[]
  >(`*[_type == "category"]{_id, "slug": slug.current, gallery}`, {}, { perspective: 'raw' })

  let updated = 0
  for (const doc of docs) {
    const gallery = doc.gallery || []
    if (!gallery.length) continue
    const next = gallery.map(toImage)
    if (JSON.stringify(next) === JSON.stringify(gallery)) continue
    await client.patch(doc._id).set({ gallery: next }).commit()
    updated += 1
    console.log(`updated ${doc.slug || doc._id} (${gallery.length} photos)`)
  }
  console.log(`done: ${updated} documents`)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
