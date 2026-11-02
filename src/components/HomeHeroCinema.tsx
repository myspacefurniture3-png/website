'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const SLIDES = [
  {
    src: '/Website/IMG_4546.PNG',
    headline: 'Furniture That Feels Like Home',
    sub: 'Modern Designs. Custom Options. Exceptional Value.',
    cta: { href: '/loveseats', label: 'Shop Now' },
  },
  {
    src: '/Website/IMG_4365.PNG',
    headline: 'Rest Beautifully Every Night',
    sub: 'Bedroom sets, bunks, and mattresses made for real life.',
    cta: { href: '/bedroom-sets', label: 'Shop Bedroom' },
  },
  {
    src: '/Website/IMG_4654.PNG',
    headline: 'Gather Around Something Special',
    sub: 'Dining tables and seating for every occasion.',
    cta: { href: '/dining-tables', label: 'Shop Dining' },
  },
  {
    src: '/Website/IMG_4296.PNG',
    headline: 'Built Exactly For Your Space',
    sub: 'Custom sizes, fabrics, and finishes — made to order.',
    cta: { href: '/custom-furniture', label: 'Customize' },
  },
]

const INTERVAL_MS = 6000

export default function HomeHeroCinema() {
  const [index, setIndex] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (reduceMotion) return
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length)
    }, INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [reduceMotion, index])

  const go = (dir: -1 | 1) => {
    setIndex((current) => (current + dir + SLIDES.length) % SLIDES.length)
  }

  const slide = SLIDES[index]

  return (
    <section className="relative w-full h-[78vh] min-h-[520px] max-h-[820px] overflow-hidden bg-[#2c241c]">
      <div className="absolute inset-0 z-[1]">
        {SLIDES.map((item, i) => {
          const active = i === index
          return (
            <div
              key={item.src}
              className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out ${
                active ? 'opacity-100' : 'opacity-0'
              }`}
              aria-hidden={!active}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt=""
                className={`absolute inset-0 h-full w-full object-cover ${
                  reduceMotion ? '' : active ? 'animate-hero-kenburns' : 'scale-100'
                }`}
                style={{ transformOrigin: i % 2 === 0 ? '35% 40%' : '65% 50%' }}
              />
            </div>
          )
        })}
      </div>

      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/55 via-black/30 to-black/10" />

      <div className="absolute inset-0 z-20 flex items-center">
        <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-10 lg:px-14">
          <div
            key={index}
            className="max-w-xl animate-fadeSlideUp"
          >
            <p className="text-[11px] sm:text-[12px] uppercase tracking-[0.28em] text-white/80 font-sans mb-4">
              MyySpace Furniture
            </p>
            <h1 className="font-serif text-[2.6rem] sm:text-5xl md:text-[3.5rem] lg:text-[4rem] font-light leading-[1.08] text-white tracking-tight">
              {slide.headline}
            </h1>
            <p className="mt-5 text-[15px] sm:text-base md:text-lg text-white/85 font-light leading-relaxed max-w-md">
              {slide.sub}
            </p>
            <Link
              href={slide.cta.href}
              className="mt-8 inline-flex items-center gap-2 bg-[#8B6B56] hover:bg-[#7a5c49] text-white text-[12px] uppercase tracking-[0.16em] font-sans font-medium px-7 py-3.5 transition-colors duration-300"
            >
              {slide.cta.label}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-20">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 flex items-center gap-4">
          <button
            onClick={() => go(-1)}
            className="w-10 h-10 rounded-full border border-white/40 text-white flex items-center justify-center hover:bg-white/15 transition-colors"
            aria-label="Previous slide"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={() => go(1)}
            className="w-10 h-10 rounded-full border border-white/40 text-white flex items-center justify-center hover:bg-white/15 transition-colors"
            aria-label="Next slide"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
          <div className="flex items-center gap-2 ml-2" aria-hidden>
            {SLIDES.map((item, i) => (
              <button
                key={item.src}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === index ? 'w-6 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
