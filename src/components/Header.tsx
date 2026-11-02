'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useCategories } from '@/components/CategoriesProvider'
import { SHOWROOM_MAPS_URL } from '@/lib/site'

const ANNOUNCEMENTS = [
  { label: 'Delivery Across California & Nevada', icon: 'delivery' as const },
  { label: 'Custom Furniture Available', icon: 'custom' as const },
  { label: 'Flexible Financing Options', icon: 'financing' as const },
]

function AnnouncementIcon({ name }: { name: (typeof ANNOUNCEMENTS)[number]['icon'] }) {
  const common = 'w-3.5 h-3.5 shrink-0 text-white/75'
  if (name === 'delivery') {
    return (
      <svg className={common} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.991c0-.18.016-.357.047-.53a2.25 2.25 0 012.253-1.802H19.5a2.25 2.25 0 012.25 2.25v.991M12.75 7.573V5.25A2.25 2.25 0 0010.5 3h-3A2.25 2.25 0 005.25 5.25v2.323"
        />
      </svg>
    )
  }
  if (name === 'custom') {
    return (
      <svg className={common} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 12.75V18a.75.75 0 00.75.75h.75v-2.25h13.5V18.75h.75a.75.75 0 00.75-.75v-5.25A2.25 2.25 0 0017.25 10.5H6.75a2.25 2.25 0 00-2.25 2.25z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 10.5V8.25A2.25 2.25 0 018.25 6h7.5A2.25 2.25 0 0118 8.25V10.5"
        />
      </svg>
    )
  }
  return (
    <svg className={common} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
      />
    </svg>
  )
}

const PRIMARY_NAV = [
  { href: '/loveseats', label: 'Living Room' },
  { href: '/bedroom-sets', label: 'Bedroom' },
  { href: '/bunk-beds', label: 'Kids & Teens' },
  { href: '/dining-tables', label: 'Dining Room' },
  { href: '/vanities', label: 'Vanities & Mirrors' },
  { href: '/contact', label: 'Outdoor' },
  { href: '/custom-furniture', label: 'Custom' },
]

const utilityLinks = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/financing', label: 'Financing' },
  { href: '/about', label: 'About Us' },
  { href: '/blog', label: 'Journal' },
  { href: '/faq', label: 'FAQs' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const pathname = usePathname()
  const categories = useCategories()
  const shopLinks = categories.map((item) => ({
    href: `/${item.slug}`,
    label: item.navLabel || item.title,
  }))
  const allSearchLinks = [
    ...PRIMARY_NAV,
    ...shopLinks,
    ...utilityLinks,
  ].filter((item, index, list) => list.findIndex((entry) => entry.href === item.href) === index)

  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen, searchOpen])

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus()
    } else {
      setSearchQuery('')
    }
  }, [searchOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        setSearchOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
  }, [pathname])

  const searchResults = searchQuery.trim()
    ? allSearchLinks.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.trim().toLowerCase())
      )
    : allSearchLinks.slice(0, 8)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

  return (
    <>
      <div className="sticky top-0 z-[60] relative">
      <div className="bg-[#2c241c] text-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-8 gap-y-2 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-sans font-medium">
          {ANNOUNCEMENTS.map((item) => (
            <span key={item.label} className="inline-flex items-center gap-2 text-white/90">
              <AnnouncementIcon name={item.icon} />
              <span>{item.label}</span>
            </span>
          ))}
        </div>
      </div>

      <header className="relative w-full bg-white/95 backdrop-blur-md border-b border-[#e8e0d8]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-[72px] lg:h-[84px]">
            <div className="flex items-center gap-3 lg:w-[200px]">
              <button
                className="lg:hidden p-1.5 -ml-1"
                onClick={() => {
                  setSearchOpen(false)
                  setMenuOpen(true)
                }}
                aria-label="Open menu"
                aria-expanded={menuOpen}
              >
                <div className="flex flex-col gap-[6px]">
                  <span className="block w-5 h-[1.5px] bg-[#2c241c]" />
                  <span className="block w-5 h-[1.5px] bg-[#2c241c]" />
                  <span className="block w-5 h-[1.5px] bg-[#2c241c]" />
                </div>
              </button>

              <Link href="/" className="relative block h-[52px] w-[148px] sm:h-[60px] sm:w-[170px] overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="MyySpace Furniture"
                  fill
                  sizes="170px"
                  className="object-contain scale-[1.65]"
                  priority
                />
              </Link>
            </div>

            <nav
              className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-x-5 xl:gap-x-7"
              aria-label="Shop categories"
            >
              {PRIMARY_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[11px] xl:text-[12px] uppercase tracking-[0.14em] font-sans font-medium whitespace-nowrap transition-colors duration-300 ${
                    isActive(item.href)
                      ? 'text-[#8B6B56]'
                      : 'text-[#2c241c]/80 hover:text-[#8B6B56]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center justify-end gap-1 sm:gap-2 lg:w-[200px]">
              <button
                onClick={() => {
                  setMenuOpen(false)
                  setSearchOpen(true)
                }}
                className="p-2.5 text-[#2c241c] hover:text-[#8B6B56] transition-colors"
                aria-label="Search"
                aria-expanded={searchOpen}
              >
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7" />
                  <path strokeLinecap="round" d="M20 20l-3-3" />
                </svg>
              </button>
              <Link
                href="/contact"
                className="p-2.5 text-[#2c241c] hover:text-[#8B6B56] transition-colors"
                aria-label="Contact us"
              >
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.118a7.5 7.5 0 0115 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.5-1.632z"
                  />
                </svg>
              </Link>
              <a
                href="tel:+19166611073"
                className="p-2.5 text-[#2c241c] hover:text-[#8B6B56] transition-colors"
                aria-label="Call us"
              >
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div
          className={`absolute inset-x-0 top-full z-[61] bg-[#F8F5F2] border-b border-[#e8e0d8] transition-all duration-300 ${
            searchOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
        >
          <div className="max-w-2xl mx-auto px-6 pt-8 pb-4">
            <div className="flex items-center gap-4 border-b border-[#2c241c]/15 pb-3">
              <svg className="w-5 h-5 text-[#2c241c] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" />
                <path strokeLinecap="round" d="M20 20l-3-3" />
              </svg>
              <input
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search collections"
                className="w-full bg-transparent text-base tracking-wide text-[#2c241c] placeholder:text-[#2c241c]/45 outline-none"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-[10px] uppercase tracking-[0.2em] text-[#2c241c]/60 hover:text-[#2c241c]"
              >
                Close
              </button>
            </div>
            <ul className="mt-4 max-h-[min(52vh,420px)] overflow-y-auto overscroll-contain space-y-1 pb-4 [-ms-overflow-style:none] [scrollbar-width:thin]">
              {searchResults.length === 0 ? (
                <li className="text-sm text-[#2c241c]/60 py-2">No matching collections</li>
              ) : (
                searchResults.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setSearchOpen(false)}
                      className="block py-2.5 text-base font-medium tracking-wide text-[#2c241c] hover:text-[#8B6B56] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </header>
      </div>

      {searchOpen && (
        <div className="fixed inset-0 z-[55] bg-black/20" onClick={() => setSearchOpen(false)} />
      )}

      <div
        className={`fixed inset-0 z-[100] lg:hidden ${
          menuOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/45 transition-opacity duration-300 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMenuOpen(false)}
        />
        <aside
          className={`absolute top-0 left-0 h-full w-[88%] max-w-[400px] bg-[#F8F5F2] flex flex-col shadow-2xl transition-transform duration-300 ease-out ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="flex items-center justify-between h-16 px-5 shrink-0 border-b border-[#e8e0d8]">
            <Link href="/" onClick={() => setMenuOpen(false)} className="relative block h-12 w-36 overflow-hidden">
              <Image src="/logo.png" alt="MyySpace Furniture" fill sizes="144px" className="object-contain scale-[1.65]" />
            </Link>
            <button onClick={() => setMenuOpen(false)} className="p-2" aria-label="Close menu">
              <svg className="w-5 h-5 text-[#2c241c]" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            <nav>
              <ul className="space-y-1">
                {PRIMARY_NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between py-3.5 text-[15px] uppercase tracking-[0.14em] font-sans font-medium text-[#2c241c]"
                    >
                      <span>{item.label}</span>
                      <svg className="w-4 h-4 text-[#8B6B56]" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="border-t border-[#e8e0d8] mt-5 pt-5">
                <ul>
                  {utilityLinks.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="block py-2.5 text-[13px] uppercase tracking-[0.14em] text-[#2c241c]/70"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <a
                      href={SHOWROOM_MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMenuOpen(false)}
                      className="block py-2.5 text-[13px] uppercase tracking-[0.14em] text-[#2c241c]/70"
                    >
                      Showroom
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </aside>
      </div>
    </>
  )
}
