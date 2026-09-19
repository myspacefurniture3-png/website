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
}: PageHeaderProps) {
  if (!heroImage) {
    return (
      <section className="bg-[#f8f6f3] text-center px-6 pt-16 md:pt-24 pb-10 md:pb-14">
        {kicker && (
          <p className="text-[12px] uppercase tracking-[0.22em] text-[#1a1a1a]/75 mb-4 font-sans font-medium">{kicker}</p>
        )}
        <h1 className="font-serif text-5xl md:text-7xl font-light tracking-wide text-[#1a1a1a]">{title}</h1>
        {subtitle && (
          <p className="mt-5 max-w-xl mx-auto text-sm md:text-base text-[#1a1a1a]/75 font-light leading-relaxed">
            {subtitle}
          </p>
        )}
      </section>
    )
  }

  return (
    <section className="relative w-full overflow-hidden bg-[#1a1a1a] h-[42vh] min-h-[280px] md:h-[52vh]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={heroImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/35" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        {kicker && (
          <p className="text-[12px] uppercase tracking-[0.22em] text-white/90 mb-4 font-medium">{kicker}</p>
        )}
        <h1 className="font-serif text-5xl md:text-7xl font-light text-white tracking-wide">{title}</h1>
        {subtitle && (
          <p className="mt-5 max-w-xl text-sm md:text-base text-white/90 font-light leading-relaxed">{subtitle}</p>
        )}
      </div>
    </section>
  )
}
