'use client'

import React from 'react'
import Link from 'next/link'
import { useCategories } from '@/components/CategoriesProvider'
import { SHOWROOM_MAPS_URL } from '@/lib/site'
import SocialFollowButtons from '@/components/SocialFollowButtons'

const linkClass =
  'block text-[15px] text-[#2c241c]/75 hover:text-[#8B6B56] leading-relaxed transition-colors'

export default function Footer() {
  const year = new Date().getFullYear()
  const categories = useCategories()

  return (
    <footer className="bg-[#F8F5F2] text-[#2c241c] border-t border-[#e8e0d8]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
          <div>
            <h4 className="font-serif text-2xl font-light text-[#2c241c] mb-5">MyySpace Furniture</h4>
            <p className="text-[15px] md:text-base text-[#2c241c]/65 font-light leading-relaxed mb-6">
              Premium furniture and custom pieces for every room — Roseville showroom serving California & Nevada.
            </p>
            <SocialFollowButtons size="lg" />
          </div>

          <div>
            <h4 className="text-[13px] uppercase tracking-[0.18em] mb-5 font-sans font-medium text-[#2c241c]">
              Collections
            </h4>
            <ul className="space-y-3.5">
              {categories.slice(0, 8).map((item) => (
                <li key={item.slug}>
                  <Link href={`/${item.slug}`} className={linkClass}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] uppercase tracking-[0.18em] mb-5 font-sans font-medium text-[#2c241c]">
              Customer Care
            </h4>
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
                <a href="mailto:info@myyspacefurniture.com" className={linkClass}>
                  info@myyspacefurniture.com
                </a>
              </li>
              <li>
                <Link href="/financing" className={linkClass}>
                  Financing
                </Link>
              </li>
              <li>
                <Link href="/faq" className={linkClass}>
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] uppercase tracking-[0.18em] mb-5 font-sans font-medium text-[#2c241c]">
              Visit
            </h4>
            <ul className="space-y-3.5">
              <li>
                <a href={SHOWROOM_MAPS_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  1811 Douglas Blvd
                  <br />
                  Roseville, CA 95661
                </a>
              </li>
              <li>
                <Link href="/gallery" className={linkClass}>
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className={linkClass}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className={linkClass}>
                  Journal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-[#e8e0d8] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[13px] text-[#2c241c]/55">© {year} MyySpace Furniture. All rights reserved.</p>
          <p className="text-[13px] text-[#2c241c]/55">Roseville, CA · Delivery across CA & NV</p>
        </div>
      </div>
    </footer>
  )
}
