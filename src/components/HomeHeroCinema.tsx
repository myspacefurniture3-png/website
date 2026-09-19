'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'

const SLIDES = [
  { src: '/Website/IMG_4546.PNG', label: 'Living' },
  { src: '/Website/IMG_4500.PNG', label: 'Bedroom' },
  { src: '/Website/IMG_4654.PNG', label: 'Dining' },
  { src: '/Website/IMG_4549.PNG', label: 'Sectionals' },
  { src: '/Website/IMG_4498.PNG', label: 'Suites' },
  { src: '/Website/IMG_4365.PNG', label: 'Design' },
  { src: '/Website/IMG_4540.PNG', label: 'Sofas' },
  { src: '/Website/IMG_4296.PNG', label: 'Custom' },
]

const INTERVAL_MS = 5500

/**
 * RH-style full-bleed hero: images crossfade with a slow cinematic zoom.
 */
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
  }, [reduceMotion])

  return (
    <section className="relative w-full h-screen min-h-[640px] overflow-hidden bg-[#1a1a1a]">
      <Header transparent />

      <div className="absolute inset-0 z-[1]">
        {SLIDES.map((slide, i) => {
          const active = i === index
          return (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
                active ? 'opacity-100' : 'opacity-0'
              }`}
              aria-hidden={!active}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.src}
                alt=""
                className={`absolute inset-0 h-full w-full object-cover ${
                  reduceMotion
                    ? ''
                    : active
                      ? 'animate-hero-kenburns'
                      : 'scale-100'
                }`}
                style={{ transformOrigin: i % 2 === 0 ? '30% 40%' : '70% 55%' }}
              />
            </div>
          )
        })}
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/55 via-black/25 to-black/45" />

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-6 pointer-events-none">
        <p className="text-[12px] md:text-[14px] uppercase tracking-[0.36em] font-sans font-medium mb-5 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)]">
          Roseville
        </p>
        <h1 className="font-serif font-light leading-none tracking-[0.16em] text-[56px] md:text-[92px] lg:text-[112px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
          MYY SPACE
        </h1>
        <p className="mt-5 text-[16px] md:text-[22px] lg:text-[24px] uppercase tracking-[0.28em] font-serif font-light text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
          Furniture
        </p>
      </div>

      <div className="absolute bottom-8 md:bottom-12 left-0 right-0 z-20 flex flex-col items-center gap-5 px-6">
        <p className="text-center text-[13px] md:text-[15px] uppercase tracking-[0.22em] text-white/85 font-sans">
          Roseville showroom · Furniture for every room
        </p>
        <div className="flex items-center gap-2" aria-hidden>
          {SLIDES.map((slide, i) => (
            <span
              key={slide.src}
              className={`h-px transition-all duration-500 ${
                i === index ? 'w-8 bg-white' : 'w-3 bg-white/35'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
