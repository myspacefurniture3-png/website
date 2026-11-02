'use client'

import { SOCIAL_PROFILES } from '@/lib/social'
import { IconFacebook, IconGoogleReviews, IconInstagram } from '@/components/SocialIcons'

const FOLLOW = [
  { key: 'facebook', label: 'Follow on Facebook', href: SOCIAL_PROFILES.facebook, Icon: IconFacebook },
  { key: 'instagram', label: 'Follow on Instagram', href: SOCIAL_PROFILES.instagram, Icon: IconInstagram },
  { key: 'google', label: 'Read our Google Reviews', href: SOCIAL_PROFILES.googleReviews, Icon: IconGoogleReviews },
] as const

/**
 * Branded follow buttons for Facebook, Instagram, and Google Reviews.
 */
export default function SocialFollowButtons({
  className = '',
  size = 'md',
}: {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const box =
    size === 'sm' ? 'h-10 w-10' : size === 'lg' ? 'h-12 w-12' : 'h-11 w-11'
  const icon =
    size === 'sm' ? 'h-[18px] w-[18px]' : size === 'lg' ? 'h-5 w-5' : 'h-[18px] w-[18px]'

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {FOLLOW.map(({ key, label, href, Icon }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className={`${box} inline-flex items-center justify-center rounded-full border border-[#2c241c]/25 text-[#2c241c] hover:bg-[#8B6B56] hover:text-white hover:border-[#8B6B56] transition-colors`}
        >
          <Icon
            className={`${icon} block shrink-0 ${
              key === 'facebook' ? 'translate-x-[0.5px]' : ''
            }`}
          />
        </a>
      ))}
    </div>
  )
}
