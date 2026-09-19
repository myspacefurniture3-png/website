'use client'

import Link from 'next/link'

const STRIP = [
  '/Website/IMG_4546.PNG',
  '/Website/IMG_4500.PNG',
  '/Website/IMG_4657.PNG',
  '/Website/IMG_4540.PNG',
  '/Website/IMG_4335.PNG',
  '/Website/IMG_4549.PNG',
  '/Website/IMG_4365.PNG',
  '/Website/IMG_4654.PNG',
  '/Website/IMG_4580.PNG',
  '/Website/IMG_4498.PNG',
]

/** Slow horizontal drift of lifestyle frames — film-strip energy between sections */
export default function HomeImageDrift() {
  const loop = [...STRIP, ...STRIP]

  return (
    <section className="bg-[#f8f6f3] border-b border-black/10 overflow-hidden py-3 md:py-4" aria-label="Collection preview">
      <div className="flex w-max animate-image-drift hover:[animation-play-state:paused]">
        {loop.map((src, index) => (
          <Link
            key={`${src}-${index}`}
            href="/gallery"
            className="relative mx-1.5 md:mx-2 h-[22vh] md:h-[28vh] w-[34vw] md:w-[22vw] min-w-[160px] max-w-[320px] overflow-hidden bg-[#eeeae4] shrink-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
          </Link>
        ))}
      </div>
    </section>
  )
}
