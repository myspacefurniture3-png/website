import type { GalleryItem } from '@/lib/types'

/**
 * Prefer trusting public URL paths in production.
 * existsSync can fail on some serverless runtimes even when /public assets are deployed.
 */
export function publicImageExists(src: string) {
  if (!src) return false
  if (/^https?:\/\//.test(src) || src.startsWith('//')) return true
  if (!src.startsWith('/')) return false

  // Known static folders shipped with the app — always allow
  if (
    src.startsWith('/Website/') ||
    src.startsWith('/products/') ||
    src.startsWith('/images/') ||
    src.startsWith('/videos/') ||
    src.startsWith('/logo') ||
    src.startsWith('/favicon') ||
    src.startsWith('/icons/') ||
    src.startsWith('/apple-') ||
    src.endsWith('.svg') ||
    src.endsWith('.png') ||
    src.endsWith('.PNG') ||
    src.endsWith('.jpg') ||
    src.endsWith('.jpeg') ||
    src.endsWith('.webp') ||
    src.endsWith('.gif') ||
    src.endsWith('.mp4')
  ) {
    return true
  }

  return true
}

export function filterAvailableImages(images: GalleryItem[], limit?: number) {
  const available = images.filter((item) => item?.src && publicImageExists(item.src))
  return typeof limit === 'number' ? available.slice(0, limit) : available
}
