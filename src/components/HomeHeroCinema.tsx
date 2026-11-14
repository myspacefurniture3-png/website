'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function HomeHeroCinema() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    video.muted = true
    video.defaultMuted = true
    video.playsInline = true

    const tryPlay = () => {
      if (motion.matches) {
        video.pause()
        return
      }
      const playPromise = video.play()
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          // Autoplay may be blocked until the next user gesture; keep muted for retry.
        })
      }
    }

    tryPlay()
    video.addEventListener('loadeddata', tryPlay)
    video.addEventListener('canplay', tryPlay)
    motion.addEventListener('change', tryPlay)

    return () => {
      video.removeEventListener('loadeddata', tryPlay)
      video.removeEventListener('canplay', tryPlay)
      motion.removeEventListener('change', tryPlay)
    }
  }, [])

  return (
    <section className="relative w-full h-[78vh] min-h-[520px] max-h-[820px] overflow-hidden bg-[#2c241c]">
      <video
        ref={videoRef}
        className="absolute inset-0 z-[1] h-full w-full object-cover"
        src="/videos/hero2.mp4"
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        poster="/Website/IMG_4546.PNG"
        aria-label="MyySpace Furniture showroom video"
      />

      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/45 via-black/15 to-transparent" />

      <div className="absolute inset-0 z-20 flex items-center">
        <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-10 lg:px-14">
          <div className="max-w-xl">
            <p className="text-[11px] sm:text-[12px] uppercase tracking-[0.28em] text-white font-sans mb-4">
              MyySpace Furniture
            </p>
            <h1 className="font-serif text-[2.6rem] sm:text-5xl md:text-[3.5rem] lg:text-[4rem] font-light leading-[1.08] text-white tracking-tight">
              Furniture That Feels Like Home
            </h1>
            <p className="mt-5 text-[15px] sm:text-base md:text-lg text-white font-normal leading-relaxed max-w-md">
              Modern Designs. Custom Options. Exceptional Value.
            </p>
            <Link
              href="/sofas-sectionals"
              className="mt-8 inline-flex items-center gap-2 bg-[#8B6B56] hover:bg-[#7a5c49] text-white text-[12px] uppercase tracking-[0.16em] font-sans font-medium px-7 py-3.5 transition-colors duration-300"
            >
              Shop Now
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
