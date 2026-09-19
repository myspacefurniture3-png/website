'use client'

import { SOCIAL_PROFILES } from '@/lib/social'

type SocialKey = 'facebook' | 'instagram' | 'google'

const ICONS: Record<
  SocialKey,
  { label: string; href: string; viewBox: string; path: string }
> = {
  facebook: {
    label: 'Facebook',
    href: SOCIAL_PROFILES.facebook,
    viewBox: '0 0 24 24',
    path: 'M14 8.5h2.5V5.8c0-1.1-.1-2.8-2.8-2.8H13.3C10.2 3 9.5 4.7 9.5 7.1v1.4H7v3.1h2.5V21h3.3v-9.4H15.5L16 8.5H14z',
  },
  instagram: {
    label: 'Instagram',
    href: SOCIAL_PROFILES.instagram,
    viewBox: '0 0 24 24',
    path: 'M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2zm0 7.9A3.1 3.1 0 1 1 12 8.9a3.1 3.1 0 0 1 0 6.2zm5.1-8.2a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM12 4.4c-2.1 0-2.3 0-3.1.1-2 .1-3.4 1.5-3.5 3.5-.1.8-.1 1-.1 3.1s0 2.3.1 3.1c.1 2 1.5 3.4 3.5 3.5.8.1 1 .1 3.1.1s2.3 0 3.1-.1c2-.1 3.4-1.5 3.5-3.5.1-.8.1-1 .1-3.1s0-2.3-.1-3.1c-.1-2-1.5-3.4-3.5-3.5-.8-.1-1-.1-3.1-.1zm0 1.5c2 0 2.3 0 3.1.1 1.5.1 2.2.8 2.3 2.3.1.8.1 1 .1 3.1s0 2.3-.1 3.1c-.1 1.5-.8 2.2-2.3 2.3-.8.1-1.1.1-3.1.1s-2.3 0-3.1-.1c-1.5-.1-2.2-.8-2.3-2.3-.1-.8-.1-1-.1-3.1s0-2.3.1-3.1c.1-1.5.8-2.2 2.3-2.3.8-.1 1.1-.1 3.1-.1z',
  },
  google: {
    label: 'Google Reviews',
    href: SOCIAL_PROFILES.googleReviews,
    viewBox: '0 0 24 24',
    path: 'M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4c-.2 1.2-1 2.3-2.1 3v2.5h3.4c2-1.8 3-4.5 3-7.3zM12 22c2.8 0 5.2-.9 6.9-2.5l-3.4-2.5c-.9.6-2.1 1-3.5 1-2.7 0-5-1.8-5.8-4.3H2.7v2.6C4.4 19.7 8 22 12 22zM6.2 13.7c-.2-.6-.3-1.2-.3-1.7s.1-1.2.3-1.7V7.7H2.7C2.1 9 1.8 10.4 1.8 12s.3 3 1 4.3l3.4-2.6zM12 5.9c1.5 0 2.9.5 4 1.6l3-3C17.2 2.7 14.8 1.8 12 1.8 8 1.8 4.4 4.1 2.7 7.7l3.5 2.6C7 7.7 9.3 5.9 12 5.9z',
  },
}

/**
 * Branded follow buttons for Facebook, Instagram, and Google Reviews.
 */
export default function SocialFollowButtons({
  className = '',
  size = 'md',
}: {
  className?: string
  size?: 'sm' | 'md'
}) {
  const box = size === 'sm' ? 'h-9 w-9' : 'h-10 w-10'
  const icon = size === 'sm' ? 'h-4 w-4' : 'h-[18px] w-[18px]'

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {(Object.keys(ICONS) as SocialKey[]).map((key) => {
        const item = ICONS[key]
        return (
          <a
            key={key}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            title={item.label}
            className={`${box} inline-flex items-center justify-center border border-[#1a1a1a]/25 text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a] transition-colors`}
          >
            <svg className={icon} viewBox={item.viewBox} fill="currentColor" aria-hidden>
              <path d={item.path} />
            </svg>
          </a>
        )
      })}
    </div>
  )
}
