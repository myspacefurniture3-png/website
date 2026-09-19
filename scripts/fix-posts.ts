/**
 * Align Sanity journal featured flags (exactly one featured) and
 * restore the Studio sustainable post title if it was overwritten by seed.
 *
 *   npx tsx scripts/fix-posts.ts
 */
import { createClient } from '@sanity/client'
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

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
  console.error('Set SANITY_API_WRITE_TOKEN or SANITY_API_READ_TOKEN in .env.local')
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

const SUSTAINABLE_ID = 'ba595f7b-9789-4ac0-81df-29fdb268715e'
const RESTORED_TITLE = 'The Sustainable Furniture Guide: How to Buy Pieces That Last'

async function main() {
  const all = await client.fetch<
    Array<{
      _id: string
      title?: string
      slug?: string
      published?: boolean
      featured?: boolean
      publishedAt?: string
      hasBody?: boolean
      bodyHtmlLen?: number
    }>
  >(
    `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      published,
      featured,
      publishedAt,
      "hasBody": defined(body) && count(body) > 0,
      "bodyHtmlLen": length(bodyHtml)
    }`
  )

  const live = all.filter((p) => p.published !== false)
  console.log(`Sanity posts total=${all.length} published=${live.length}`)
  for (const p of all) {
    console.log(
      `  ${p.published === false ? 'DRAFT' : 'LIVE '}  featured=${Boolean(p.featured)}  ${p.slug}  "${p.title}"`
    )
  }

  // Exactly one featured among published posts
  if (live.length > 0) {
    const [first, ...rest] = live
    if (!first.featured) {
      await client.patch(first._id).set({ featured: true }).commit()
      console.log(`Set featured: ${first.slug}`)
    }
    for (const doc of rest) {
      if (doc.featured) {
        await client.patch(doc._id).set({ featured: false }).commit()
        console.log(`Cleared featured: ${doc.slug}`)
      }
    }
  }

  // Restore sustainable Studio title + clear seeded bodyHtml when portable body exists
  const sustainable = all.find((p) => p._id === SUSTAINABLE_ID || p.slug === 'sustainable-furniture-guide')
  if (sustainable) {
    const patch = client.patch(sustainable._id)
    let changed = false
    if (sustainable.title !== RESTORED_TITLE) {
      patch.set({
        title: RESTORED_TITLE,
        seoTitle: RESTORED_TITLE.slice(0, 70),
      })
      changed = true
    }
    if (sustainable.hasBody && (sustainable.bodyHtmlLen || 0) > 0) {
      patch.unset(['bodyHtml'])
      changed = true
    }
    if (changed) {
      await patch.commit()
      console.log(`Restored sustainable post title and cleared bodyHtml on ${sustainable._id}`)
    } else {
      console.log('Sustainable post already restored')
    }
  }

  const after = await client.fetch<Array<{ slug?: string; featured?: boolean; published?: boolean }>>(
    `*[_type == "post" && published != false] | order(publishedAt desc) {
      "slug": slug.current,
      featured,
      published
    }`
  )
  console.log(`\nLive journal count (matches site query): ${after.length}`)
  console.log(`Featured: ${after.find((p) => p.featured)?.slug || '(none)'}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
