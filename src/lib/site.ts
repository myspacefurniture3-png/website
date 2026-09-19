export const SITE_URL = 'https://myyspacefurniture.com'

/** Google Maps place pin for the Roseville showroom */
export const SHOWROOM_MAPS_URL =
  'https://www.google.com/maps/place/MyySpace+Furniture+%26+Mattress/@38.7465805,-121.2606694,17z'

export function absoluteUrl(path: string) {
  if (!path) return SITE_URL
  if (/^https?:\/\//.test(path)) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
