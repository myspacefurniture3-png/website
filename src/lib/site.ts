export const SITE_URL = 'https://myyspacefurniture.com'

/** Google Maps place pin for the Roseville showroom */
export const SHOWROOM_MAPS_URL =
  'https://www.google.com/maps/place/MyySpace+Furniture+%26+Mattress/@38.7465805,-121.2606694,17z/data=!3m1!4b1!4m6!3m5!1s0x678ab9b0c002b107:0xbff9cbf87975ed3c!8m2!3d38.7465805!4d-121.2606694!16s%2Fg%2F11yjlt_j7s?hl=en&entry=ttu&g_ep=EgoyMDI2MDkxNi4wIKXMDSoASAFQAw%3D%3D'

export function absoluteUrl(path: string) {
  if (!path) return SITE_URL
  if (/^https?:\/\//.test(path)) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
