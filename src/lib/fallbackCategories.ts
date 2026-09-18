import type { Category } from '@/lib/types'

const range = (count: number, path: (i: number) => string) =>
  Array.from({ length: count }, (_, i) => path(i + 1))

const items = (paths: string[], alt: string) => paths.map((src) => ({ src, alt }))

export const FALLBACK_CATEGORIES: Category[] = [
  {
    title: 'Sofas & Loveseats',
    navLabel: 'Sofas',
    slug: 'loveseats',
    subtitle: 'Premium sofas and loveseats for cozy seating spaces',
    heroImage: '/images/heroes/loveseats-hero.webp',
    menuImage: '/products/sofa.webp',
    order: 1,
    showInNav: true,
    gallery: items(
      [
        ...range(34, (i) => `/products/loveseat-${i}.webp`),
        ...range(14, (i) => `/products/loveseat (${i}).jpeg`),
      ],
      'Sofas & Loveseats'
    ),
  },
  {
    title: 'Bedroom Sets',
    navLabel: 'Bedroom',
    slug: 'bedroom-sets',
    subtitle: 'Complete bedroom solutions for restful nights',
    heroImage: '/images/heroes/bedroom-sets-hero.webp',
    menuImage: '/products/bedroom.webp',
    order: 2,
    showInNav: true,
    gallery: items(range(78, (i) => `/products/bedroom-${i}.webp`), 'Bedroom Set'),
  },
  {
    title: 'Dining Tables',
    navLabel: 'Dining',
    slug: 'dining-tables',
    subtitle: 'Dining tables and seating for gathering spaces',
    heroImage: '/images/heroes/dining-tables-hero.webp',
    menuImage: '/products/dining-table-2.webp',
    order: 3,
    showInNav: true,
    gallery: items(
      [
        ...range(12, (i) => `/products/dining-table-${i}.webp`),
        ...range(9, (i) => `/products/dinnig-table (${i}).jpeg`),
        '/products/dinning-table (10).jpeg',
      ],
      'Dining Table'
    ),
  },
  {
    title: 'Leather Sectionals',
    navLabel: 'Leather',
    slug: 'leather-sectionals',
    subtitle: 'Premium leather sectionals for sophisticated living spaces',
    heroImage: '/images/heroes/leather-sectionals-hero.webp',
    menuImage: '/products/leather-sectional-9.webp',
    order: 4,
    showInNav: true,
    gallery: items(range(31, (i) => `/products/leather-sectional-${i}.webp`), 'Leather Sectional'),
  },
  {
    title: 'Fabric Selections',
    navLabel: 'Fabric Selections',
    slug: 'fabric-sectionals',
    subtitle: 'Premium fabric selections for comfortable living spaces',
    heroImage: '/images/heroes/fabric-sectionals-hero.webp',
    menuImage: '/products/fabric-sectional-1.webp',
    order: 5,
    showInNav: true,
    gallery: items(range(42, (i) => `/products/fabric-sectional-${i}.webp`), 'Fabric Selections'),
  },
  {
    title: 'Mattresses',
    navLabel: 'Mattresses',
    slug: 'mattresses',
    subtitle: 'Quality mattresses for restful sleep',
    heroImage: '/images/heroes/mattresses-hero.webp',
    menuImage: '/products/custom-furniture/custom (18).jpeg',
    order: 6,
    showInNav: true,
    gallery: items(
      [
        ...range(21, (i) => `/products/mattress-${i}.webp`),
        '/products/mattress-18.jpeg',
        '/products/mattress-19.jpeg',
        '/products/mattress-21.jpeg',
        '/products/mattress.jpeg',
      ],
      'Mattress'
    ),
  },
  {
    title: 'Vanities',
    navLabel: 'Vanities',
    slug: 'vanities',
    subtitle: 'Premium vanities for bedroom and bathroom spaces',
    heroImage: '/images/heroes/vanities-hero.webp',
    menuImage: '/products/vanity-31.webp',
    order: 7,
    showInNav: true,
    gallery: items(range(52, (i) => `/products/vanity-${i}.webp`), 'Vanity'),
  },
  {
    title: 'Bunk Beds',
    navLabel: 'Bunk Beds',
    slug: 'bunk-beds',
    subtitle: 'Premium bunk beds and loft beds for every room',
    heroImage: '/images/heroes/bunk-beds-hero.webp',
    menuImage: '/products/bunk-bed-3.webp',
    order: 8,
    showInNav: true,
    gallery: items(
      [...range(33, (i) => `/products/bunk-bed-${i}.webp`), '/products/bunk-bed.jpeg'],
      'Bunk Bed'
    ),
  },
  {
    title: 'Custom Furniture',
    navLabel: 'Custom',
    slug: 'custom-furniture',
    subtitle: 'Design furniture tailored to your space and style',
    heroImage: '/products/custom-furniture/custom (3).jpeg',
    menuImage: '/products/custom-furniture/custom (1).jpeg',
    order: 9,
    showInNav: true,
    gallery: items(
      [
        '/products/custom-furniture/custom-bedroom-1.webp',
        ...range(20, (i) => `/products/custom-furniture/custom (${i}).jpeg`),
        ...range(57, (i) => `/products/custom-furniture/custom-new (${i}).jpeg`),
      ],
      'Custom Furniture'
    ),
  },
]
