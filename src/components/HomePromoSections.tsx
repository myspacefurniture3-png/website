'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { SHOWROOM_MAPS_URL } from '@/lib/site'

export function PromoBanner() {
  return (
    <section className="bg-[#F8F5F2] border-y border-[#e8e0d8]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 py-10 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 rounded-xl bg-white border border-[#e8e0d8] px-6 sm:px-10 py-8 md:py-9">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#8B6B56] font-sans font-medium mb-2">
              Limited Time Offer
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-[2.15rem] text-[#2c241c] font-light tracking-tight leading-tight">
              Get 40% Off Your First Purchase
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 self-start md:self-center bg-[#2c241c] hover:bg-[#3d3228] text-white text-[12px] uppercase tracking-[0.16em] font-sans font-medium px-7 py-3.5 transition-colors duration-300 shrink-0"
          >
            Shop Now <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export function CustomFurnitureBanner() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-0 overflow-hidden rounded-xl bg-[#F8F5F2]">
          <div className="relative min-h-[280px] lg:min-h-[420px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/products/custom-furniture/custom-new (12).jpeg"
              alt="Custom fabric and furniture options"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-14 py-12 lg:py-16">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.6rem] text-[#2c241c] font-light tracking-tight leading-tight">
              Your Style. Your Space.
              <br />
              Custom Made.
            </h2>
            <p className="mt-4 text-[15px] text-[#2c241c]/65 font-light leading-relaxed max-w-md">
              Choose fabric, color, and size — we build furniture that fits your home perfectly.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-5">
              {[
                { label: 'Choose Your Fabric', icon: 'fabric' },
                { label: 'Select Your Color', icon: 'color' },
                { label: 'Custom Sizes', icon: 'size' },
                { label: 'Unique Designs', icon: 'design' },
              ].map((step) => (
                <div key={step.label} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white border border-[#e8e0d8] text-[#8B6B56]">
                    <StepIcon name={step.icon} />
                  </span>
                  <span className="text-[13px] font-sans font-medium text-[#2c241c] leading-snug pt-2">
                    {step.label}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/custom-furniture"
              className="mt-10 inline-flex items-center justify-center gap-2 self-start bg-[#8B6B56] hover:bg-[#7a5c49] text-white text-[12px] uppercase tracking-[0.16em] font-sans font-medium px-7 py-3.5 transition-colors duration-300"
            >
              Customize Your Furniture <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function StepIcon({ name }: { name: string }) {
  const common = 'w-4 h-4'
  if (name === 'fabric') {
    return (
      <svg className={common} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    )
  }
  if (name === 'color') {
    return (
      <svg className={common} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
      </svg>
    )
  }
  if (name === 'size') {
    return (
      <svg className={common} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
      </svg>
    )
  }
  return (
    <svg className={common} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
  )
}

export function ServiceHighlights() {
  return (
    <section className="bg-[#F8F5F2] py-12 md:py-16">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="rounded-xl bg-white border border-[#e8e0d8] px-8 py-10 flex flex-col items-start">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F8F5F2] text-[#8B6B56] mb-5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
              </svg>
            </span>
            <h3 className="font-serif text-2xl text-[#2c241c] font-light tracking-tight">Flexible Financing Options</h3>
            <p className="mt-3 text-[14px] text-[#2c241c]/65 font-light leading-relaxed">
              Make premium furniture fit your budget with easy financing plans.
            </p>
            <Link
              href="/financing"
              className="mt-6 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] font-sans font-medium text-[#8B6B56] hover:text-[#7a5c49] transition-colors"
            >
              Explore Financing <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="rounded-xl bg-white border border-[#e8e0d8] px-8 py-10 flex flex-col items-start">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F8F5F2] text-[#8B6B56] mb-5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.991c0-.18.016-.357.047-.53a2.25 2.25 0 012.253-1.802H19.5a2.25 2.25 0 012.25 2.25v.991M12.75 7.573V5.25A2.25 2.25 0 0010.5 3h-3A2.25 2.25 0 005.25 5.25v2.323" />
              </svg>
            </span>
            <h3 className="font-serif text-2xl text-[#2c241c] font-light tracking-tight">
              Delivery Across California & Nevada
            </h3>
            <p className="mt-3 text-[14px] text-[#2c241c]/65 font-light leading-relaxed">
              Professional delivery and setup across California and Nevada.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] font-sans font-medium text-[#8B6B56] hover:text-[#7a5c49] transition-colors"
            >
              Learn More <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function ShowroomVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.defaultMuted = true
    video.playsInline = true

    const tryPlay = () => {
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) tryPlay()
        })
      },
      { threshold: 0.2 }
    )
    observer.observe(video)

    return () => {
      video.removeEventListener('loadeddata', tryPlay)
      video.removeEventListener('canplay', tryPlay)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="relative min-h-[260px] lg:min-h-[340px] overflow-hidden rounded-xl bg-[#2c241c]">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/hero2.mp4"
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        poster="/Website/IMG_4546.PNG"
        aria-label="MyySpace Furniture showroom video"
      />
      <div className="absolute inset-0 bg-black/15 pointer-events-none" />
    </div>
  )
}

export function ShowroomSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid lg:grid-cols-3 gap-5 items-stretch">
          <div className="relative min-h-[260px] lg:min-h-[340px] overflow-hidden rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Website/IMG_4543.PNG"
              alt="MyySpace Furniture showroom"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="rounded-xl bg-[#F8F5F2] px-8 py-10 flex flex-col justify-center text-center lg:text-left">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#8B6B56] font-sans font-medium mb-3">
              Visit Our Showroom
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-[#2c241c] font-light tracking-tight">
              1811 Douglas Blvd
              <br />
              Roseville, CA
            </h2>
            <div className="mt-5 space-y-1 text-[14px] text-[#2c241c]/70 font-light">
              <p>Mon – Sat: 10:00 AM – 7:00 PM</p>
              <p>Sunday: 11:00 AM – 6:00 PM</p>
              <a href="tel:+19166611073" className="block pt-2 text-[#2c241c] hover:text-[#8B6B56] transition-colors">
                (916) 661-1073
              </a>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href={SHOWROOM_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#8B6B56] hover:bg-[#7a5c49] text-white text-[11px] uppercase tracking-[0.16em] font-sans font-medium px-5 py-3 transition-colors"
              >
                Get Directions <span aria-hidden>→</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-[#2c241c]/20 hover:border-[#8B6B56] text-[#2c241c] text-[11px] uppercase tracking-[0.16em] font-sans font-medium px-5 py-3 transition-colors"
              >
                Contact Us <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          <ShowroomVideo />
        </div>
      </div>
    </section>
  )
}
