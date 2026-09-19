/** Shared monochrome brand icons for follow + share controls */

type IconProps = { className?: string }

export function IconFacebook({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.9v-2.9h2.4V9.86c0-2.37 1.41-3.68 3.56-3.68 1.03 0 2.11.18 2.11.18v2.32h-1.19c-1.17 0-1.54.73-1.54 1.48v1.78h2.62l-.42 2.9h-2.2V22c4.78-.75 8.44-4.91 8.44-9.93z" />
    </svg>
  )
}

export function IconInstagram({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2A3.2 3.2 0 1 1 12 8.8a3.2 3.2 0 0 1 0 6.4z" />
      <path d="M16.8 6.1a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z" />
      <path d="M12 2.2c-2.7 0-3.1 0-4.1.1-2.7.1-4.1 1.5-4.2 4.2-.1 1-.1 1.4-.1 4.1s0 3.1.1 4.1c.1 2.7 1.5 4.1 4.2 4.2 1 .1 1.4.1 4.1.1s3.1 0 4.1-.1c2.7-.1 4.1-1.5 4.2-4.2.1-1 .1-1.4.1-4.1s0-3.1-.1-4.1c-.1-2.7-1.5-4.1-4.2-4.2-1-.1-1.4-.1-4.1-.1zm0 1.6c2.7 0 3 0 4 .1 2 .1 2.9 1 3 3 .1 1 .1 1.3.1 4s0 3-.1 4c-.1 2-1 2.9-3 3-1 .1-1.3.1-4 .1s-3 0-4-.1c-2-.1-2.9-1-3-3-.1-1-.1-1.3-.1-4s0-3 .1-4c.1-2 1-2.9 3-3 1-.1 1.3-.1 4-.1z" />
    </svg>
  )
}

export function IconGoogle({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M21.6 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.5z" />
      <path d="M12 22c2.7 0 5-.9 6.7-2.4l-3.2-2.5c-.9.6-2 1-3.5 1-2.7 0-5-1.8-5.8-4.2H2.9v2.6A10 10 0 0 0 12 22z" />
      <path d="M6.2 13.9c-.2-.6-.4-1.2-.4-1.9s.1-1.3.4-1.9V7.5H2.9A10 10 0 0 0 2 12c0 1.6.4 3.1 1 4.4l3.2-2.5z" />
      <path d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.9-2.9C17 2.7 14.7 1.8 12 1.8A10 10 0 0 0 2.9 7.5l3.3 2.6C7 7.7 9.3 5.9 12 5.9z" />
    </svg>
  )
}

/** Star mark — clearer for Google Reviews than a lone G */
export function IconGoogleReviews({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.5l2.6 5.4 6 .9-4.3 4.2 1 5.9L12 16.1 6.7 18.9l1-5.9L3.4 8.8l6-.9L12 2.5z" />
    </svg>
  )
}

export function IconX({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.2 2H21l-6.6 7.5L22 22h-6.1l-4.8-6.3L5.5 22H2.7l7-8L2 2h6.2l4.3 5.7L18.2 2zm-1.1 18h1.7L7.1 3.9H5.3L17.1 20z" />
    </svg>
  )
}

export function IconPinterest({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.02 2C6.5 2 3 5.7 3 10.1c0 3.3 1.9 5.8 4.4 5.8.4 0 .9-.2 1.1-.5l.4-1.4c.1-.4.1-.5.4-.8.4-.6.2-1.1-.2-1.6-.6-.8-1-1.7-1-2.9 0-3.7 2.8-7.1 7.3-7.1 4 0 6.2 2.4 6.2 5.7 0 4.3-1.9 7.9-4.7 7.9-1.5 0-2.6-1.2-2.3-2.8.4-1.8 1.3-3.8 1.3-5.1 0-1.2-.6-2.2-2-2.2-1.6 0-2.8 1.6-2.8 3.8 0 1.4.5 2.3.5 2.3l-1.8 7.5c-.4 1.8 0 4 0 4.2 0 .1.1.1.2 0 .1 0 .2-.1.2-.2.8-1.1 1.4-2.6 1.7-3.9.1-.4.6-2.2 1.6-5.5.5 1 2 1.8 3.6 1.8 4.8 0 8.1-4.4 8.1-10.2C23 5.2 18.5 2 12.02 2z" />
    </svg>
  )
}

export function IconWhatsApp({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.45 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02zm-7 15.24h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.8-.23-.09-.4-.12-.56.12-.17.25-.64.8-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.09-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.22.25-.87.85-.87 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.17-.47-.29z" />
    </svg>
  )
}

export function IconLinkedIn({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z" />
    </svg>
  )
}

export function IconEmail({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z" />
    </svg>
  )
}

export function IconLink({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3.9 12a5 5 0 0 1 5-5h3v2h-3a3 3 0 1 0 0 6h3v2h-3a5 5 0 0 1-5-5zm7-1h2v2h-2v-2zm4-4h-3v2h3a3 3 0 1 1 0 6h-3v2h3a5 5 0 0 0 0-10z" />
    </svg>
  )
}

export function IconNativeShare({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18 16.1a2.9 2.9 0 0 0-2.2 1l-6.3-3.6a3 3 0 0 0 0-1.9l6.3-3.6a2.9 2.9 0 1 0-.9-1.6l-6.3 3.6a2.9 2.9 0 1 0 0 5.1l6.3 3.6c.2 1.4 1.4 2.5 2.9 2.5a2.9 2.9 0 0 0 0-5.8z" />
    </svg>
  )
}
