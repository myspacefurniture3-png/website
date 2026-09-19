'use client'

import Link from 'next/link'
import type { Category } from '@/lib/types'

type Panel = {
  href: string
  image: string
  kicker: string
  title: string
  subtitle?: string
  line?: string
  tall?: boolean
}

function CollectionPanel({ panel }: { panel: Panel }) {
  return (
    <Link
      href={panel.href}
      className={`relative block w-full overflow-hidden group ${
        panel.tall ? 'h-[72vh] md:h-[88vh] min-h-[520px]' : 'h-[58vh] md:h-[72vh] min-h-[420px]'
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={panel.image}
        alt={panel.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[10s] ease-out group-hover:scale-[1.04]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/45 transition-opacity duration-500 group-hover:from-black/35 group-hover:to-black/55" />
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white px-6">
        <p className="text-[11px] md:text-[12px] uppercase tracking-[0.32em] text-white/75 mb-4 md:mb-5 font-sans">
          {panel.kicker}
        </p>
        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-serif font-light tracking-[0.12em] leading-none">
          {panel.title}
        </h2>
        {panel.subtitle && (
          <p className="mt-3 md:mt-4 text-[15px] md:text-[18px] uppercase tracking-[0.26em] font-serif font-light text-white/85">
            {panel.subtitle}
          </p>
        )}
        {panel.line && (
          <p className="mt-5 max-w-lg text-[13px] md:text-[14px] font-light tracking-wide text-white/80 normal-case leading-relaxed">
            {panel.line}
          </p>
        )}
        <span className="mt-8 text-[11px] uppercase tracking-[0.22em] font-sans text-white/90 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          Explore
        </span>
      </div>
    </Link>
  )
}

function splitTitle(title: string): { main: string; sub?: string } {
  const upper = title.toUpperCase()
  // Prefer short display titles like RH (one strong word when possible)
  if (upper.includes('SOFAS')) return { main: 'SOFAS', sub: '& LOVESEATS' }
  if (upper.includes('BEDROOM')) return { main: 'BEDROOM', sub: 'SETS' }
  if (upper.includes('DINING')) return { main: 'DINING', sub: 'TABLES' }
  if (upper.includes('LEATHER')) return { main: 'LEATHER', sub: 'SECTIONALS' }
  if (upper.includes('FABRIC')) return { main: 'FABRIC', sub: 'SELECTIONS' }
  if (upper.includes('MATTRESS')) return { main: 'MATTRESSES' }
  if (upper.includes('VANIT')) return { main: 'VANITIES' }
  if (upper.includes('BUNK')) return { main: 'BUNK BEDS' }
  if (upper.includes('CUSTOM')) return { main: 'CUSTOM', sub: 'FURNITURE' }
  return { main: upper }
}

type Props = {
  categories: Category[]
}

/**
 * RH-style homepage: stacked full-bleed collection panels (not a mosaic grid).
 */
export default function HomeCollections({ categories }: Props) {
  const ordered = [...categories].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  const panels: Panel[] = ordered
    .filter((item) => item.heroImage || item.menuImage)
    .map((item, index) => {
      const parts = splitTitle(item.title)
      return {
        href: `/${item.slug}`,
        image: item.heroImage || item.menuImage,
        kicker: index === 0 ? 'Featured' : 'Collection',
        title: parts.main,
        subtitle: parts.sub,
        line: item.subtitle || undefined,
        tall: index % 3 === 0,
      }
    })

  if (!panels.length) return null

  return (
    <section className="bg-[#1a1a1a]">
      <div className="space-y-0">
        {panels.map((panel) => (
          <CollectionPanel key={panel.href} panel={panel} />
        ))}
      </div>

      <div className="bg-[#f8f6f3] text-center py-14 md:py-16 px-6">
        <Link
          href="/gallery"
          className="inline-block text-[11px] uppercase tracking-[0.24em] font-sans text-[#1a1a1a] hover:opacity-55 transition"
        >
          View the entire gallery →
        </Link>
      </div>
    </section>
  )
}
