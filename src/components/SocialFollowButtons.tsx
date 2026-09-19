'use client'

import { SOCIAL_PROFILES } from '@/lib/social'
import { IconFacebook, IconGoogleReviews, IconInstagram } from '@/components/SocialIcons'

const FOLLOW = [
  { key: 'facebook', label: 'Facebook', href: SOCIAL_PROFILES.facebook, Icon: IconFacebook },
  { key: 'instagram', label: 'Instagram', href: SOCIAL_PROFILES.instagram, Icon: IconInstagram },
  { key: 'google', label: 'Google Reviews', href: SOCIAL_PROFILES.googleReviews, Icon: IconGoogleReviews },
] as const

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
  const box = size === 'sm' ? 'h-10 w-10' : 'h-11 w-11'
  const icon = size === 'sm' ? 'h-[18px] w-[18px]' : 'h-5 w-5'

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
          className={`${box} inline-flex items-center justify-center border border-[#1a1a1a]/30 text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a] transition-colors`}
        >
          <Icon className={icon} />
        </a>
      ))}
    </div>
  )
}
