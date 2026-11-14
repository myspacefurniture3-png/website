'use client'

import { SOCIAL_PROFILES } from '@/lib/social'
import { IconGoogleReviews, IconInstagram, IconTikTok } from '@/components/SocialIcons'

const FOLLOW = [
  { key: 'instagram', label: 'Follow on Instagram', href: SOCIAL_PROFILES.instagram, Icon: IconInstagram },
  { key: 'tiktok', label: 'Follow on TikTok', href: SOCIAL_PROFILES.tiktok, Icon: IconTikTok },
  { key: 'google', label: 'Find us on Google Maps', href: SOCIAL_PROFILES.google, Icon: IconGoogleReviews },
] as const

/**
 * Branded follow buttons for Instagram, TikTok, and Google Maps.
 */
export default function SocialFollowButtons({
  className = '',
  size = 'md',
  tone = 'dark',
}: {
  className?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  tone?: 'dark' | 'light'
}) {
  const box =
    size === 'xs' ? 'h-8 w-8' : size === 'sm' ? 'h-10 w-10' : size === 'lg' ? 'h-12 w-12' : 'h-11 w-11'
  const icon =
    size === 'xs' ? 'h-3.5 w-3.5' : size === 'lg' ? 'h-5 w-5' : 'h-[18px] w-[18px]'
  const toneClass =
    tone === 'light'
      ? 'border-white/35 text-white hover:bg-white hover:text-[#2c241c] hover:border-white'
      : 'border-[#2c241c]/25 text-[#2c241c] hover:bg-[#8B6B56] hover:text-white hover:border-[#8B6B56]'

  return (
    <div className={`flex flex-wrap items-center ${size === 'lg' ? 'gap-3' : 'gap-2'} ${className}`}>
      {FOLLOW.map(({ key, label, href, Icon }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className={`${box} inline-flex items-center justify-center rounded-full border transition-colors ${toneClass}`}
        >
          <Icon className={`${icon} block shrink-0`} />
        </a>
      ))}
    </div>
  )
}
