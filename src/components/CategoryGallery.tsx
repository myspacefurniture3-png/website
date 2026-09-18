'use client'

import { useState } from 'react'
import type { GalleryItem } from '@/lib/types'

export default function CategoryGallery({ images, title }: { images: GalleryItem[]; title: string }) {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
        {visible.map((item, index) => (
          <button
            key={`${item.src}-${index}`}
            type="button"
            onClick={() => setActive(item)}
            className="group relative overflow-hidden bg-[#eeeae4] text-left aspect-[4/5]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt={item.alt || title}
              className="w-full h-full object-cover"
              onError={() => setHidden((current) => new Set(current).add(item.src))}
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
