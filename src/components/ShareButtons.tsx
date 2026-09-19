'use client'

import { useState } from 'react'
import { absoluteUrl } from '@/lib/site'
import { shareHashtagQuery, shareText } from '@/lib/social'
import {
  IconEmail,
  IconFacebook,
  IconLink,
  IconLinkedIn,
  IconNativeShare,
  IconPinterest,
  IconWhatsApp,
  IconX,
} from '@/components/SocialIcons'

type ShareButtonsProps = {
  title: string
  excerpt?: string
  path: string
  image?: string
  keywords?: string[]
}

const btnClass =
  'inline-flex h-10 w-10 items-center justify-center border border-[#1a1a1a]/30 text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a] transition-colors'

export default function ShareButtons({ title, excerpt, path, image, keywords = [] }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const url = absoluteUrl(path)
  const imageUrl = image ? absoluteUrl(image) : ''
  const text = shareText(title, excerpt)
  const hashtags = shareHashtagQuery(keywords)
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedText = encodeURIComponent(text)

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
        await navigator.share({ title, text, url })
        return
      } catch {
        return
      }
    }
    copyLink()
  }

  const actions = [
    {
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
      Icon: IconFacebook,
    },
    {
      label: 'X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}&hashtags=${encodeURIComponent(hashtags)}`,
      Icon: IconX,
    },
    {
      label: 'Pinterest',
      href: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedText}${
        imageUrl ? `&media=${encodeURIComponent(imageUrl)}` : ''
      }`,
      Icon: IconPinterest,
    },
    {
      label: 'WhatsApp',
      href: `https://wa.me/?text=${encodeURIComponent(`${text}\n\n${url}`)}`,
      Icon: IconWhatsApp,
    },
    {
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      Icon: IconLinkedIn,
    },
    {
      label: 'Email',
      href: `mailto:?subject=${encodedTitle}&body=${encodeURIComponent(`${text}\n\n${url}`)}`,
      Icon: IconEmail,
    },
  ]

  return (
    <div className="flex flex-wrap items-center gap-3">
      <p className="text-[10px] uppercase tracking-[0.22em] text-[#1a1a1a]/75 font-sans font-medium mr-1">Share</p>
      <button type="button" onClick={nativeShare} className={btnClass} aria-label="Share" title="Share">
        <IconNativeShare className="h-[18px] w-[18px]" />
      </button>
      {actions.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('mailto:') ? undefined : '_blank'}
          rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
          className={btnClass}
          aria-label={`Share on ${label}`}
          title={`Share on ${label}`}
        >
          <Icon className="h-[18px] w-[18px]" />
        </a>
      ))}
      <button
        type="button"
        onClick={copyLink}
        className={btnClass}
        aria-label={copied ? 'Link copied' : 'Copy link'}
        title={copied ? 'Copied' : 'Copy link'}
      >
        <IconLink className="h-[18px] w-[18px]" />
      </button>
    </div>
  )
}
