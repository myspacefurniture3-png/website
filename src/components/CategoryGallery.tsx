'use client'

import { useState } from 'react'
import type { GalleryItem } from '@/lib/types'

function tileClass(index: number) {
  const pattern = index % 7
  if (pattern === 0) return 'md:col-span-2 aspect-[16/10]'
  if (pattern === 3 || pattern === 6) return 'aspect-[16/11]'
  return 'aspect-[4/5]'
}

export default function CategoryGallery({ images, title }: { images: GalleryItem[]; title: string }) {
  const [active, setActive] = useState<GalleryItem | null>(null)

  if (!images.length) {
    return (
      <p className="text-center text-[#1a1a1a]/50 py-20 text-sm tracking-[0.16em] uppercase font-sans">
        New pieces for this collection will appear here soon.
      </p>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
        {images.map((item, index) => (
          <button
            key={`${item.src}-${index}`}
            type="button"
            onClick={() => setActive(item)}
            className={`group relative overflow-hidden bg-[#eeeae4] text-left ${tileClass(index)}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt={item.alt || title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-x-0 bottom-0 p-4 md:p-6 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-white text-[10px] uppercase tracking-[0.22em] font-sans">{title}</span>
            </span>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[120] bg-black/80 flex items-center justify-center p-6"
          onClick={() => setActive(null)}
        >
          <button
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
