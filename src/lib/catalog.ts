/** Customer-facing collections shown in the nav, homepage, and footer. */
export const MAIN_CATEGORIES = [
  {
    title: 'Sofas & Sectionals',
    slug: 'sofas-sectionals',
    href: '/sofas-sectionals',
    image: '/Website/IMG_4546.PNG',
    subtitle: 'Sofas, loveseats, and sectionals for living rooms that gather.',
    order: 1,
  },
  {
    title: 'Bedroom Sets',
    slug: 'bedroom-sets',
    href: '/bedroom-sets',
    image: '/Website/IMG_4365.PNG',
    subtitle: 'Complete bedroom suites — statement headboards, nightstands, and soft light.',
    order: 2,
  },
  {
    title: 'Dining Sets',
    slug: 'dining-sets',
    href: '/dining-sets',
    image: '/Website/IMG_4654.PNG',
    subtitle: 'Dining sets for everyday meals and evening company.',
    order: 3,
  },
  {
    title: 'Kids & Bunk Beds',
    slug: 'kids-bunk-beds',
    href: '/kids-bunk-beds',
    image: '/Website/IMG_4296.PNG',
    subtitle: 'Kids beds, bunks, and lofts for shared rooms.',
    order: 4,
  },
  {
    title: 'Outdoor',
    slug: 'outdoor',
    href: '/outdoor',
    image: '/Website/IMG_4543.PNG',
    subtitle: 'Outdoor seating for patios and poolsides — see the collection in our Roseville showroom.',
    order: 5,
  },
] as const

export type MainCategorySlug = (typeof MAIN_CATEGORIES)[number]['slug']

/** Older sectional collections folded into Sofas & Sectionals, then dropped. */
export const SOFA_GALLERY_SLUGS = ['leather-sectionals', 'fabric-sectionals'] as const

/** Previous URLs that should resolve to the current category slugs. */
export const CATEGORY_SLUG_REMAP: Record<string, string> = {
  loveseats: 'sofas-sectionals',
  'dining-tables': 'dining-sets',
  'bunk-beds': 'kids-bunk-beds',
}
