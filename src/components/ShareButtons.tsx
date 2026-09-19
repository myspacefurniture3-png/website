'use client'

import { useState } from 'react'
import { absoluteUrl } from '@/lib/site'
import { shareHashtagQuery, shareText } from '@/lib/social'

type ShareButtonsProps = {
  title: string
  excerpt?: string
  path: string
  image?: string
  keywords?: string[]
}

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14 8.5h2.5V5.8c0-1.1-.1-2.8-2.8-2.8H13.3C10.2 3 9.5 4.7 9.5 7.1v1.4H7v3.1h2.5V21h3.3v-9.4H15.5L16 8.5H14z" />
    </svg>
  )
}

function IconX({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.5 3h3.1l-6.8 7.8L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8L17.5 3zm-1.1 16.2h1.7L7.7 4.7H5.9l10.5 14.5z" />
    </svg>
  )
}

function IconPinterest({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.1 2C6.8 2 3.5 5.7 3.5 10.2c0 2.8 1.5 5 3.8 5 .4 0 .8-.2.9-.5l.3-1.1c.1-.4.1-.5.3-.8.3-.5.1-1-.2-1.4-.6-.7-.9-1.6-.9-2.7 0-3.5 2.6-6.6 6.8-6.6 3.7 0 5.7 2.3 5.7 5.3 0 4-1.8 7.4-4.4 7.4-1.4 0-2.5-1.2-2.2-2.6.4-1.7 1.2-3.6 1.2-4.8 0-1.1-.6-2-1.8-2-1.4 0-2.6 1.5-2.6 3.5 0 1.3.4 2.1.4 2.1L8.6 19c-.5 2-.1 4.5-.1 4.7 0 .1.1.1.2.1.1 0 .1-.1.2-.2.7-1 1.3-2.6 1.6-3.9.1-.3.5-2 1.5-5.2.5.9 1.9 1.7 3.4 1.7 4.5 0 7.5-4.1 7.5-9.6C22.9 5.3 18.6 2 12.1 2z" />
    </svg>
  )
}

function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.1 4.9A9.9 9.9 0 0 0 12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.4A9.9 9.9 0 0 0 12 22c5.5 0 10-4.5 10-10 0-2.7-1.1-5.1-2.9-7.1zM12 20.1c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.1 8.1 0 0 1 3.9 12c0-4.5 3.6-8.1 8.1-8.1 2.2 0 4.2.8 5.7 2.4A8 8 0 0 1 20.1 12c0 4.5-3.6 8.1-8.1 8.1zm4.4-6.1c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.7.9-.1.2-.3.2-.5.1-.2-.1-.9-.3-1.8-1.1-.7-.6-1.1-1.3-1.2-1.5-.1-.2 0-.3.1-.4.1-.1.2-.3.3-.4.1-.1.1-.2.2-.3.1-.1 0-.3 0-.4 0-.1-.5-1.3-.7-1.7-.2-.5-.4-.4-.5-.4h-.4c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.4 3.8 3.4.5.2.9.4 1.3.5.5.2 1 .1 1.3.1.4-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.2-.2-.4-.3z" />
    </svg>
  )
}

function IconLinkedIn({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.5 9.5H3.7V20h2.8V9.5zM5.1 4a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2zM20.3 13.3c0-2.5-1.3-4.1-3.7-4.1-1.2 0-2.1.5-2.5 1.3h-.1V9.5h-2.7c0 .7 0 8.5 0 8.5h2.7v-5.4c0-.3 0-.6.1-.8.2-.6.8-1.3 1.8-1.3 1.3 0 1.8.9 1.8 2.3V20h2.8v-6.7z" />
    </svg>
  )
}

function IconEmail({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="M3 7l9 7 9-7" />
    </svg>
  )
}

function IconLink({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M10 13a5 5 0 0 0 7.1 0l2.1-2.1a5 5 0 0 0-7.1-7.1L10.8 5" />
      <path d="M14 11a5 5 0 0 0-7.1 0L4.8 13.1a5 5 0 0 0 7.1 7.1L13.2 19" />
    </svg>
  )
}

const btnClass =
  'inline-flex h-10 w-10 items-center justify-center border border-[#1a1a1a]/25 text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a] transition-colors'

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
      icon: IconFacebook,
    },
    {
      label: 'X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}&hashtags=${encodeURIComponent(hashtags)}`,
      icon: IconX,
    },
    {
      label: 'Pinterest',
      href: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedText}${
        imageUrl ? `&media=${encodeURIComponent(imageUrl)}` : ''
      }`,
      icon: IconPinterest,
    },
    {
      label: 'WhatsApp',
      href: `https://wa.me/?text=${encodeURIComponent(`${text}\n\n${url}`)}`,
      icon: IconWhatsApp,
    },
    {
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: IconLinkedIn,
    },
    {
      label: 'Email',
      href: `mailto:?subject=${encodedTitle}&body=${encodeURIComponent(`${text}\n\n${url}`)}`,
      icon: IconEmail,
    },
  ]

  return (
    <div className="flex flex-wrap items-center gap-3">
      <p className="text-[10px] uppercase tracking-[0.22em] text-[#1a1a1a]/75 font-sans font-medium mr-1">Share</p>
      <button type="button" onClick={nativeShare} className={btnClass} aria-label="Share" title="Share">
        <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <circle cx="18" cy="5" r="2.5" />
          <circle cx="6" cy="12" r="2.5" />
          <circle cx="18" cy="19" r="2.5" />
          <path d="M8.4 10.8l7.2-4.2M8.4 13.2l7.2 4.2" />
        </svg>
      </button>
      {actions.map((item) => {
        const Icon = item.icon
        return (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith('mailto:') ? undefined : '_blank'}
            rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            className={btnClass}
            aria-label={`Share on ${item.label}`}
            title={`Share on ${item.label}`}
          >
            <Icon className="h-[18px] w-[18px]" />
          </a>
        )
      })}
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
