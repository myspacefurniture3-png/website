export const SOCIAL_PROFILES = {
  facebook: 'https://www.facebook.com/Myyspacefurniture/',
  instagram: 'https://www.instagram.com/myyspacefurniture/',
  googleReviews: 'https://maps.app.goo.gl/ng8ENb6grLjczfCL8?g_st=ac',
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
