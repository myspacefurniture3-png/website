'use client'

import React from 'react'
import Link from 'next/link'
import { useCategories } from '@/components/CategoriesProvider'
import { SHOWROOM_MAPS_URL } from '@/lib/site'
import SocialFollowButtons from '@/components/SocialFollowButtons'

const linkClass =
  'block text-[12px] uppercase tracking-[0.16em] text-[#1a1a1a]/85 hover:text-[#1a1a1a] leading-relaxed transition-colors'

export default function Footer() {
  const year = new Date().getFullYear()
  const categories = useCategories()

  return (
    <footer className="bg-[#f8f6f3] text-[#1a1a1a] border-t border-black/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-20 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14">
          <div>
            <h4 className="text-[12px] uppercase tracking-[0.2em] mb-7 font-medium text-[#1a1a1a]">Collections</h4>
            <ul className="space-y-3.5">
              <li>
                <Link href="/" className={linkClass}>
                  Home
                </Link>
              </li>
              {categories.map((item) => (
                <li key={item.slug}>
                  <Link href={`/${item.slug}`} className={linkClass}>
                    {item.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/gallery" className={linkClass}>
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[12px] uppercase tracking-[0.2em] mb-7 font-medium text-[#1a1a1a]">Customer Care</h4>
            <ul className="space-y-3.5">
              <li>
                <Link href="/contact" className={linkClass}>
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="tel:+19166611073" className={linkClass}>
                  (916) 661-1073
                </a>
              </li>
              <li>
                <a href="tel:+19169940612" className={linkClass}>
                  (916) 994-0612
                </a>
              </li>
              <li>
                <a href="mailto:info@myyspacefurniture.com" className={linkClass}>
                  info@myyspacefurniture.com
                </a>
              </li>
              <li>
                <a href={SHOWROOM_MAPS_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  1811 Douglas Blvd
                </a>
              </li>
              <li>
                <a href={SHOWROOM_MAPS_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Roseville, CA 95661
                </a>
              </li>
              <li>
                <Link href="/faq" className={linkClass}>
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[12px] uppercase tracking-[0.2em] mb-7 font-medium text-[#1a1a1a]">Our Company</h4>
            <ul className="space-y-3.5">
              <li>
                <Link href="/about" className={linkClass}>
                  About Us
                </Link>
              </li>
              <li>
                <a href={SHOWROOM_MAPS_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Showroom
                </a>
              </li>
              <li>
                <Link href="/blog" className={linkClass}>
                  Journal
                </Link>
              </li>
              <li>
                <Link href="/financing" className={linkClass}>
                  Financing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[12px] uppercase tracking-[0.2em] mb-7 font-medium text-[#1a1a1a]">Follow</h4>
            <SocialFollowButtons />
            <p className="mt-5 text-[11px] uppercase tracking-[0.16em] text-[#1a1a1a]/70 leading-relaxed">
              Facebook · Instagram · Google Reviews
            </p>
          </div>
        </div>

        <div className="pt-24 text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#1a1a1a]/65">Roseville, CA</p>
          <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-[#1a1a1a]/65">
            © {year} Myy Space Furniture
          </p>
        </div>
      </div>
    </footer>
  )
}
