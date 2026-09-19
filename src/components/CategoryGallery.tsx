'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { GalleryItem } from '@/lib/types'

type Props = {
  images: GalleryItem[]
  title: string
  shopHref?: string
}

/** RH-style product grid used on collection pages */
export default function CategoryGallery({ images, title, shopHref }: Props) {
  const [active, setActive] = useState<GalleryItem | null>(null)
  const [hidden, setHidden] = useState<Set<string>>(new Set())
  const visible = images.filter((item) => !hidden.has(item.src))

  if (!visible.length) {
    return (
      <p className="text-center text-[#1a1a1a]/50 py-20 text-sm tracking-[0.16em] uppercase font-sans">
        New pieces for this collection will appear here soon.
      </p>
    )
  }

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 md:gap-x-16 gap-y-16 md:gap-y-24">
          {visible.map((item, index) => {
            const label = (item.alt || title).toUpperCase()
            return (
              <article key={`${item.src}-${index}`} className="group text-center">
                <button
                  type="button"
                  onClick={() => setActive(item)}
                  className="block w-full bg-[#eeeae4] aspect-[4/3] overflow-hidden mb-7 md:mb-8"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.alt || title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    onError={() => setHidden((current) => new Set(current).add(item.src))}
                  />
                </button>
                <h2 className="text-[12px] md:text-[13px] uppercase tracking-[0.18em] font-sans text-[#1a1a1a] font-medium px-4">
                  {label}
                </h2>
                <p className="mt-3 text-[10px] md:text-[11px] uppercase tracking-[0.16em] font-sans text-[#1a1a1a]/45 px-4">
                  Showroom pricing · Financing available
                </p>
                {shopHref ? (
                  <Link
                    href={shopHref}
                    className="inline-flex items-center gap-2 mt-4 text-[11px] uppercase tracking-[0.2em] font-sans text-[#1a1a1a] hover:opacity-55 transition"
                  >
                    <span aria-hidden>+</span>
                    <span>Shop</span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActive(item)}
                    className="inline-flex items-center gap-2 mt-4 text-[11px] uppercase tracking-[0.2em] font-sans text-[#1a1a1a] hover:opacity-55 transition"
                  >
                    <span aria-hidden>+</span>
                    <span>Shop</span>
                  </button>
                )}
              </article>
            )
          })}
        </div>

        {shopHref && (
          <div className="text-center mt-20 md:mt-28">
            <Link
              href="/contact"
              className="inline-block text-[11px] uppercase tracking-[0.22em] font-sans text-[#1a1a1a] hover:opacity-55 transition"
            >
              Inquire in the showroom →
            </Link>
          </div>
        )}
      </div>

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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={active.src}
            alt={active.alt || title}
            className="max-h-[88vh] max-w-full object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
