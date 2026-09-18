export const SITE_URL = 'https://myyspacefurniture.com'

export function absoluteUrl(path: string) {
  if (!path) return SITE_URL
  if (/^https?:\/\//.test(path)) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
