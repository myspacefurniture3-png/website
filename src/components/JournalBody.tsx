import Image from 'next/image'
import { PortableText, type PortableTextComponents } from 'next-sanity'
import { urlFor } from '@/sanity/image'

const calloutStyles: Record<string, string> = {
  tip: 'border-l border-[#1a1a1a]/30 bg-[#eeeae4]/60',
  note: 'border-l border-[#1a1a1a]/20 bg-white/50',
  important: 'border-l border-[#1a1a1a] bg-[#1a1a1a]/[0.04]',
}

export const journalPortableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-serif text-2xl md:text-3xl font-light mt-12 mb-4 text-[#1a1a1a]">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-xl md:text-2xl font-light mt-10 mb-3 text-[#1a1a1a]">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="font-serif text-xl md:text-2xl font-light leading-snug text-[#1a1a1a]/85 my-10 border-l border-black/25 pl-6">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p className="text-[#1a1a1a]/90 leading-relaxed mb-5 font-light">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-6 space-y-2 text-[#1a1a1a]/90">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-[#1a1a1a]/90">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || '#'
      const blank = value?.blank !== false
      return (
        <a
          href={href}
          target={blank ? '_blank' : undefined}
          rel={blank ? 'noopener noreferrer' : undefined}
          className="underline underline-offset-4 decoration-black/30 hover:decoration-black/70 transition"
        >
          {children}
        </a>
      )
    },
    underline: ({ children }) => <span className="underline underline-offset-4">{children}</span>,
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      const src = urlFor(value).width(1400).height(900).fit('crop').url()
      return (
        <figure className="my-10 not-prose">
          <div className="relative w-full aspect-[14/9] bg-[#eeeae4] overflow-hidden">
            <Image src={src} alt={value.alt || ''} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-[#1a1a1a]/55 font-light">{value.caption}</figcaption>
          )}
        </figure>
      )
    },
    callout: ({ value }) => {
      const tone = (value?.tone as string) || 'tip'
      const label = tone === 'important' ? 'Important' : tone === 'note' ? 'Note' : 'Tip'
      return (
        <aside className={`my-8 px-5 py-4 not-prose ${calloutStyles[tone] || calloutStyles.tip}`}>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/45 mb-2">{label}</p>
          <p className="text-[#1a1a1a]/85 leading-relaxed font-light m-0">{value?.text}</p>
        </aside>
      )
    },
  },
}

export default function JournalBody({ value }: { value: unknown[] }) {
  return <PortableText value={value as never} components={journalPortableTextComponents} />
}
