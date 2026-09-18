'use client'

import React from 'react'

const SITE = 'https://www.celestialwebsolutions.net'
const CONTACTS = [
  { label: 'Website', value: 'celestialwebsolutions.net', href: SITE },
  { label: 'Email', value: 'info@celestialwebsolutions.net', href: 'mailto:info@celestialwebsolutions.net' },
  { label: 'Phone', value: '+233 53 050 5031', href: 'tel:+233530505031' },
  { label: 'WhatsApp', value: '+233 245 709 341', href: 'https://wa.me/233245709341' },
]

export function SupportIcon() {
  return (
    <svg viewBox="0 0 25 25" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="12.5" cy="12.5" r="8.25" />
      <path d="M12.5 11.2v5.3M12.5 8.2v.8" />
    </svg>
  )
}

export default function SupportTool() {
  return (
    <div
      style={{
        minHeight: '100%',
        background: '#f8f6f3',
        color: '#1a1a1a',
        fontFamily: 'Jost, Helvetica Neue, Arial, sans-serif',
        padding: '48px 24px 72px',
      }}
    >
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <p
          style={{
            fontSize: 11,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(26,26,26,0.45)',
            marginBottom: 16,
          }}
        >
          Website support
        </p>
        <h1
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontWeight: 300,
            fontSize: 42,
            letterSpacing: '0.04em',
            margin: '0 0 16px',
          }}
        >
          Celestial Web Solutions
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: 'rgba(26,26,26,0.7)', fontWeight: 300, maxWidth: 560 }}>
          For help with this website — content, layout, or technical issues — contact the studio that built and
          maintains My Space Furniture.
        </p>

        <div
          style={{
            marginTop: 36,
            background: '#1a1a1a',
            color: '#f8f6f3',
            padding: '36px 32px',
          }}
        >
          <p
            style={{
              fontSize: 11,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'rgba(248,246,243,0.55)',
              marginBottom: 22,
            }}
          >
            Contact
          </p>
          <div style={{ display: 'grid', gap: 18 }}>
            {CONTACTS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.5, marginBottom: 4 }}>
                  {item.label}
                </div>
                <div style={{ fontSize: 18, fontFamily: 'Cormorant Garamond, Georgia, serif', fontWeight: 400 }}>
                  {item.value}
                </div>
              </a>
            ))}
          </div>

          <div style={{ height: 1, background: 'rgba(248,246,243,0.12)', margin: '28px 0' }} />
          <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.5, marginBottom: 8 }}>
            Offices
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.7, fontWeight: 300, opacity: 0.9 }}>
            Keta, Volta Region, Ghana
            <br />
            Accra, Greater Accra, Ghana
            <br />
            235 Agblor Link, Keta
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 24 }}>
          <a
            href={SITE}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '14px 22px',
              border: '1px solid #1a1a1a',
              color: '#1a1a1a',
              textDecoration: 'none',
              fontSize: 11,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Visit website
          </a>
          <a
            href={`${SITE}/contact`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '14px 22px',
              background: '#1a1a1a',
              color: '#f8f6f3',
              textDecoration: 'none',
              fontSize: 11,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Open contact page
          </a>
          <a
            href="https://wa.me/233245709341"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '14px 22px',
              border: '1px solid #1a1a1a',
              color: '#1a1a1a',
              textDecoration: 'none',
              fontSize: 11,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
