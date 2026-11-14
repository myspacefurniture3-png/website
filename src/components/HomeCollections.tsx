'use client'

import Link from 'next/link'
import { MAIN_CATEGORIES } from '@/lib/catalog'

const SHOP_BY_CATEGORY = MAIN_CATEGORIES.map((item) => ({
  title: item.title,
  href: item.href,
  image: item.image,
}))

function CategoryTile({
  title,
  href,
  image,
  aspect = 'aspect-[4/3]',
  motionIndex,
  wide = false,
}: {
  title: string
  href: string
  image: string
  aspect?: string
  motionIndex?: number
  wide?: boolean
}) {
  const driftClass =
    motionIndex === undefined
      ? ''
      : motionIndex % 2 === 0
        ? 'category-kenburns'
        : 'category-kenburns category-kenburns-alt'

  return (
    <Link
      href={href}
      className={`group block text-center ${
        wide ? 'col-span-2 md:col-span-1 max-w-sm mx-auto w-full md:max-w-none' : ''
      }`}
    >
      <div
        className={`relative ${aspect} overflow-hidden rounded-xl bg-[#e8e0d8] shadow-sm transition-shadow duration-500 group-hover:shadow-xl`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={title}
          className={`absolute inset-0 h-full w-full object-cover ${driftClass}`}
          style={motionIndex === undefined ? undefined : { animationDelay: `${motionIndex * -2.4}s` }}
          loading="lazy"
        />
      </div>
      <p className="mt-3.5 text-[14px] md:text-[15px] font-sans font-medium text-[#2c241c] tracking-wide group-hover:text-[#8B6B56] transition-colors">
        {title}
      </p>
    </Link>
  )
}

export default function HomeCollections() {
  const shopItems = SHOP_BY_CATEGORY

  return (
    <>
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex items-end justify-between gap-4 mb-10 md:mb-12">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] text-[#2c241c] font-light tracking-tight">
              Shop Our Popular Categories
            </h2>
            <Link
              href="/gallery"
              className="shrink-0 text-[12px] uppercase tracking-[0.16em] font-sans font-medium text-[#8B6B56] hover:text-[#7a5c49] transition-colors mb-1"
            >
              Explore All →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5 md:gap-6">
            {shopItems.map((item, index) => (
              <CategoryTile
                key={item.title}
                {...item}
                motionIndex={index}
                wide={index === shopItems.length - 1}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
