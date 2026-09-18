'use client'

import { useState } from 'react'
import type { GalleryItem } from '@/lib/types'

export default function CategoryGallery({ images, title }: { images: GalleryItem[]; title: string }) {
  const [active, setActive] = useState<GalleryItem | null>(null)

  if (!images.length) {
    return (
      <p className="text-center text-[#1a1a1a]/50 py-20 text-sm tracking-wide">
        New pieces for this collection will appear here soon.
      </p>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-7">
        {images.map((item, index) => (
          <button
            key={`${item.src}-${index}`}
            type="button"
            onClick={() => setActive(item)}
            className="group relative aspect-[4/5] overflow-hidden bg-[#eeeae4] text-left"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt={item.alt || title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[120] bg-black/80 flex items-center justify-center p-6"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute top-6 right-6 text-white text-[11px] uppercase tracking-[0.2em]"
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
