'use client'

import { useMemo, useState, useTransition } from 'react'
import Link from 'next/link'

export type GalleryProduct = {
  id: string
  src: string
  title: string
  categorySlug: string
  categoryLabel: string
}

type Props = {
  products: GalleryProduct[]
  filters: { slug: string; label: string }[]
}

export default function GalleryExplorer({ products, filters }: Props) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [active, setActive] = useState<GalleryProduct | null>(null)
  const [hidden, setHidden] = useState<Set<string>>(new Set())
  const [, startTransition] = useTransition()

  const visible = useMemo(() => {
    return products.filter((item) => {
      if (hidden.has(item.src)) return false
      if (activeFilter === 'all') return true
      return item.categorySlug === activeFilter
    })
  }, [products, activeFilter, hidden])

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: 0 }
    for (const item of products) {
      if (hidden.has(item.src)) continue
      map.all += 1
      map[item.categorySlug] = (map[item.categorySlug] || 0) + 1
    }
    return map
  }, [products, hidden])

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 mb-12 md:mb-16">
        <div className="flex flex-wrap items-center justify-center gap-x-5 md:gap-x-7 gap-y-3 border-y border-black/15 py-5">
          <button
            type="button"
            onClick={() => startTransition(() => setActiveFilter('all'))}
            className={`text-[11px] md:text-[12px] uppercase tracking-[0.18em] font-sans font-medium transition ${
              activeFilter === 'all'
                ? 'text-[#1a1a1a] underline underline-offset-8 decoration-black/80'
                : 'text-[#1a1a1a]/75 hover:text-[#1a1a1a]'
            }`}
          >
            All{counts.all ? ` (${counts.all})` : ''}
          </button>
          {filters.map((filter) => (
            <button
              key={filter.slug}
              type="button"
              onClick={() => startTransition(() => setActiveFilter(filter.slug))}
              className={`text-[11px] md:text-[12px] uppercase tracking-[0.18em] font-sans font-medium transition ${
                activeFilter === filter.slug
                  ? 'text-[#1a1a1a] underline underline-offset-8 decoration-black/80'
                  : 'text-[#1a1a1a]/75 hover:text-[#1a1a1a]'
              }`}
            >
              {filter.label}
              {counts[filter.slug] ? ` (${counts[filter.slug]})` : ''}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="text-center text-[#1a1a1a]/70 py-24 text-[11px] uppercase tracking-[0.2em] font-sans">
          No pieces in this collection yet.
        </p>
      ) : (
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 md:gap-x-16 gap-y-16 md:gap-y-24">
            {visible.map((item) => (
              <article key={item.id} className="group text-center">
                <button
                  type="button"
                  onClick={() => setActive(item)}
                  className="block w-full bg-[#eeeae4] aspect-[4/3] overflow-hidden mb-7 md:mb-8"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    onError={() => setHidden((current) => new Set(current).add(item.src))}
                  />
                </button>

                <h2 className="text-[12px] md:text-[13px] uppercase tracking-[0.18em] font-sans text-[#1a1a1a] font-medium px-4">
                  {item.title}
                </h2>
                <p className="mt-3 text-[10px] md:text-[11px] uppercase tracking-[0.16em] font-sans text-[#1a1a1a]/70 px-4">
                  Showroom pricing · Financing available
                </p>
                <Link
                  href={`/${item.categorySlug}`}
                  className="inline-flex items-center gap-2 mt-4 text-[11px] uppercase tracking-[0.2em] font-sans text-[#1a1a1a] hover:opacity-55 transition"
                >
                  <span aria-hidden>+</span>
                  <span>Shop</span>
                </Link>
              </article>
            ))}
          </div>

          {activeFilter !== 'all' && (
            <div className="text-center mt-20 md:mt-28">
              <Link
                href={`/${activeFilter}`}
                className="inline-block text-[11px] uppercase tracking-[0.22em] font-sans text-[#1a1a1a] hover:opacity-55 transition"
              >
                View the entire collection →
              </Link>
            </div>
          )}
        </div>
      )}

      {active && (
        <div
          className="fixed inset-0 z-[120] bg-black/80 flex items-center justify-center p-6"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="absolute top-6 right-6 text-white text-[11px] uppercase tracking-[0.2em] font-sans"
            onClick={() => setActive(null)}
          >
            Close
          </button>
          <div className="max-w-5xl w-full text-center" onClick={(event) => event.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={active.src} alt={active.title} className="max-h-[78vh] w-full object-contain mx-auto" />
            <p className="mt-6 text-white text-[12px] uppercase tracking-[0.2em] font-sans">{active.title}</p>
            <Link
              href={`/${active.categorySlug}`}
              className="inline-flex items-center gap-2 mt-4 text-[11px] uppercase tracking-[0.2em] font-sans text-white/80 hover:text-white transition"
            >
              <span aria-hidden>+</span>
              <span>Shop {active.categoryLabel}</span>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
