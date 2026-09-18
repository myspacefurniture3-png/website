interface PageHeaderProps {
  title: string
  subtitle?: string
  heroImage?: string
  kicker?: string
  compact?: boolean
}

export default function PageHeader({
  title,
  subtitle,
  heroImage,
  kicker = 'Collection',
  compact = false,
}: PageHeaderProps) {
  return (
    <section
      className={`relative w-full overflow-hidden bg-[#1a1a1a] ${
        compact ? 'h-[36vh] min-h-[260px] md:h-[46vh]' : 'h-[48vh] min-h-[320px] md:h-[62vh]'
      }`}
    >
      {heroImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={heroImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
      )}
      <div className="absolute inset-0 bg-black/35" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        {kicker && (
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/70 mb-4">{kicker}</p>
        )}
        <h1 className="font-playfair text-4xl md:text-6xl font-light text-white tracking-wide">{title}</h1>
        {subtitle && (
          <p className="mt-5 max-w-xl text-sm md:text-base text-white/80 font-light leading-relaxed">{subtitle}</p>
        )}
      </div>
    </section>
  )
}
