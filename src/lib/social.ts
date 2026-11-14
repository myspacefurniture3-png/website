import { SHOWROOM_MAPS_URL } from '@/lib/site'

export const SOCIAL_PROFILES = {
  instagram:
    'https://www.instagram.com/myyspacefurniture?psln=MW1pMTh1dzRneGV6NQ%3D%3D&utm_source=qr',
  tiktok: 'https://www.tiktok.com/@myyspacefurniture?_r=1&_t=ZP-9BLxkE76QXe',
  /** Google icon opens the Roseville showroom pin. */
  google: SHOWROOM_MAPS_URL,
  googleReviews: SHOWROOM_MAPS_URL,
} as const

/** Default hashtags / keywords appended to share copy for discovery */
export const SHARE_KEYWORDS = [
  'MyySpaceFurniture',
  'RosevilleFurniture',
  'SacramentoFurniture',
  'CustomFurniture',
  'HomeDecor',
  'FurnitureShowroom',
]

export function shareHashtagQuery(extra: string[] = []) {
  return [...SHARE_KEYWORDS, ...extra]
    .map((tag) => tag.replace(/^#/, ''))
    .filter(Boolean)
    .join(',')
}

export function shareText(title: string, excerpt?: string) {
  const base = excerpt?.trim() || title
  const tags = SHARE_KEYWORDS.slice(0, 4)
    .map((tag) => `#${tag}`)
    .join(' ')
  return `${base}\n\n${tags}`
}
