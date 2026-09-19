'use client'

import { useState } from 'react'
import { absoluteUrl } from '@/lib/site'

export default function ShareButtons({
  title,
  excerpt,
  path,
  image,
}: {
  title: string
  excerpt?: string
  path: string
  image?: string
}) {
  const [copied, setCopied] = useState(false)
  const url = absoluteUrl(path)
  const imageUrl = image ? absoluteUrl(image) : ''
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const nativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, text: excerpt || title, url })
        return
      } catch {
        return
      }
    }
    copyLink()
  }

  const links = [
    {
      label: 'Email',
      href: `mailto:?subject=${encodedTitle}&body=${encodeURIComponent(`${excerpt || title}\n\n${url}`)}`,
    },
    {
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: 'Pinterest',
      href: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}${
        imageUrl ? `&media=${encodeURIComponent(imageUrl)}` : ''
      }`,
    },
  ]

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
      <p className="text-[10px] uppercase tracking-[0.22em] text-[#1a1a1a]/75 font-sans font-medium">Share</p>
      <button
        type="button"
        onClick={nativeShare}
        className="text-[11px] uppercase tracking-[0.18em] text-[#1a1a1a] hover:opacity-50 transition"
      >
        Share
      </button>
      {links.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target={item.href.startsWith('mailto:') ? undefined : '_blank'}
          rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
          className="text-[11px] uppercase tracking-[0.18em] text-[#1a1a1a] hover:opacity-50 transition"
        >
          {item.label}
        </a>
      ))}
      <button
        type="button"
        onClick={copyLink}
        className="text-[11px] uppercase tracking-[0.18em] text-[#1a1a1a] hover:opacity-50 transition"
      >
        {copied ? 'Copied' : 'Copy link'}
      </button>
    </div>
  )
}
