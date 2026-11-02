'use client'

import Link from 'next/link'
import type { Category } from '@/lib/types'

/** Mockup: top row of 4, bottom row of 3 — equal tiles, labels under images */
const SHOP_BY_CATEGORY = [
  {
    title: 'Living Room',
    href: '/loveseats',
    image: '/Website/IMG_4546.PNG',
  },
  {
    title: 'Bedroom',
    href: '/bedroom-sets',
    image: '/Website/IMG_4365.PNG',
  },
  {
    title: 'Kids & Teens',
    href: '/bunk-beds',
    image: '/Website/IMG_4296.PNG',
  },
  {
    title: 'Dining Room',
    href: '/dining-tables',
    image: '/Website/IMG_4654.PNG',
  },
  {
    title: 'Vanities & Mirrors',
    href: '/vanities',
    image: '/Website/IMG_4335.PNG',
  },
  {
    title: 'Outdoor Furniture',
    href: '/contact',
    image: '/Website/IMG_4543.PNG',
  },
  {
    title: 'Custom Furniture',
    href: '/custom-furniture',
    image: '/products/custom-furniture/custom-new (12).jpeg',
  },
]

/** Mockup: single row of 6 popular tiles */
const POPULAR = [
  { title: 'Beds', href: '/bedroom-sets', image: '/Website/IMG_4365.PNG' },
  { title: 'Bunk Beds', href: '/bunk-beds', image: '/Website/IMG_4300.PNG' },
  { title: 'Recliners', href: '/loveseats', image: '/Website/IMG_4540.PNG' },
  { title: 'Vanities', href: '/vanities', image: '/Website/IMG_4335.PNG' },
  { title: 'Mattresses', href: '/mattresses', image: '/products/mattress-18.jpeg' },
  { title: 'Outdoor Swings', href: '/contact', image: '/Website/IMG_4549.PNG' },
]

type Props = {
  categories: Category[]
}

function CategoryTile({
  title,
  href,
  image,
  aspect = 'aspect-[4/3]',
}: {
  title: string
  href: string
  image: string
  aspect?: string
}) {
  return (
    <Link href={href} className="group block text-center">
      <div className={`relative ${aspect} overflow-hidden rounded-xl bg-[#e8e0d8]`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <p className="mt-3.5 text-[14px] md:text-[15px] font-sans font-medium text-[#2c241c] tracking-wide group-hover:text-[#8B6B56] transition-colors">
        {title}
      </p>
    </Link>
  )
}

export default function HomeCollections({ categories }: Props) {
  const customImage =
    categories.find((c) => c.slug === 'custom-furniture')?.menuImage ||
    categories.find((c) => c.slug === 'custom-furniture')?.heroImage

  const shopItems = SHOP_BY_CATEGORY.map((item) =>
    item.href === '/custom-furniture' && customImage
      ? { ...item, image: customImage }
      : item
  )

  const topRow = shopItems.slice(0, 4)
  const bottomRow = shopItems.slice(4)

  return (
    <>
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex items-end justify-between gap-4 mb-10 md:mb-12">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] text-[#2c241c] font-light tracking-tight">
              Shop by Category
            </h2>
            <Link
              href="/gallery"
              className="shrink-0 text-[12px] uppercase tracking-[0.16em] font-sans font-medium text-[#8B6B56] hover:text-[#7a5c49] transition-colors mb-1"
            >
              Explore All →
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {topRow.map((item) => (
              <CategoryTile key={item.title} {...item} />
            ))}
          </div>

          <div className="mt-5 md:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6">
            {bottomRow.map((item) => (
              <CategoryTile key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F8F5F2] py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex items-end justify-between gap-4 mb-10 md:mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-[#2c241c] font-light tracking-tight">
              Shop Our Popular Categories
            </h2>
            <Link
              href="/gallery"
              className="shrink-0 text-[12px] uppercase tracking-[0.16em] font-sans font-medium text-[#8B6B56] hover:text-[#7a5c49] transition-colors mb-1"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 md:gap-6">
            {POPULAR.map((item) => (
              <CategoryTile
                key={item.title}
                {...item}
                aspect="aspect-square"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
