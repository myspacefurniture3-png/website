import { existsSync } from 'fs'
import path from 'path'
import type { GalleryItem } from '@/lib/types'

export function publicImageExists(src: string) {
  if (!src) return false
  if (/^https?:\/\//.test(src) || src.startsWith('//')) return true
  if (!src.startsWith('/')) return false
  const relative = decodeURIComponent(src.split('?')[0].replace(/^\//, ''))
  return existsSync(path.join(process.cwd(), 'public', relative))
}

export function filterAvailableImages(images: GalleryItem[], limit?: number) {
  const available = images.filter((item) => publicImageExists(item.src))
  return typeof limit === 'number' ? available.slice(0, limit) : available
}
