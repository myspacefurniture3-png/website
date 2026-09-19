import type { MetadataRoute } from 'next'

const BASE = 'https://myyspacefurniture.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/studio',
          '/studio/',
          '/studio/*',
          '/api/',
          '/api/*',
          '/admin/',
          '/admin/*',
          '/_next/',
          '/_next/*',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/studio', '/studio/', '/studio/*', '/api/', '/api/*', '/admin/', '/admin/*'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/studio', '/studio/', '/studio/*', '/api/', '/api/*', '/admin/', '/admin/*'],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  }
}
