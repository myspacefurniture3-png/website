'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { GOOGLE_REVIEWS_SUMMARY } from '@/data/googleReviews'
import { useCategories } from '@/components/CategoriesProvider'

export default function Footer() {
  const year = new Date().getFullYear()
  const categories = useCategories()

  return (
    <footer className="bg-[#f8f6f3] text-[#1a1a1a] border-t border-black/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-14 py-16">
        <div className="flex justify-center pb-12">
          <Link href="/" className="inline-block">
            <div className="w-64 h-24 relative">
              <Image src="/logo.png" alt="My Space Furniture" fill className="object-contain" />
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-14">
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.22em] mb-6 font-bold">Collections</h4>
            <ul className="space-y-3">
              {categories.map((item) => (
                <li key={item.slug}>
                  <Link href={`/${item.slug}`} className="text-sm tracking-wide text-[#1a1a1a]/70 hover:text-[#1a1a1a]">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.22em] mb-6 font-bold">Visit</h4>
            <ul className="space-y-3 text-sm text-[#1a1a1a]/70">
              <li>
                <Link href="/about" className="hover:text-[#1a1a1a]">About Us</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#1a1a1a]">Gallery</Link>
              </li>
              <li>
                <Link href="/financing" className="hover:text-[#1a1a1a]">Financing</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#1a1a1a]">FAQs</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#1a1a1a]">Journal</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.22em] mb-6 font-bold">Contact</h4>
            <ul className="space-y-3 text-sm text-[#1a1a1a]/70">
              <li>
                <a href="tel:+19166611073" className="hover:text-[#1a1a1a]">(916) 661-1073</a>
              </li>
              <li>
                <a href="tel:+19169940612" className="hover:text-[#1a1a1a]">(916) 994-0612</a>
              </li>
              <li>
                <a href="mailto:info@myyspacefurniture.com" className="hover:text-[#1a1a1a]">info@myyspacefurniture.com</a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/place/MyySpace+Furniture+%26+Mattress/@38.7465805,-121.2606694,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#1a1a1a]"
                >
                  1811 Douglas Blvd<br />Roseville, CA 95661
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.22em] mb-6 font-bold">Follow</h4>
            <div className="flex gap-4 mb-8">
              <a href="https://www.facebook.com/Myyspacefurniture/" target="_blank" rel="noopener noreferrer" className="text-sm uppercase tracking-[0.16em] hover:opacity-50">Facebook</a>
              <a href="https://www.instagram.com/myyspacefurniture/" target="_blank" rel="noopener noreferrer" className="text-sm uppercase tracking-[0.16em] hover:opacity-50">Instagram</a>
            </div>
            <a href={GOOGLE_REVIEWS_SUMMARY.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[#1a1a1a]/70 hover:text-[#1a1a1a]">
              {GOOGLE_REVIEWS_SUMMARY.averageRating.toFixed(1)} · {GOOGLE_REVIEWS_SUMMARY.totalReviews} Google reviews
            </a>
          </div>
        </div>

        <div className="border-t border-black/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] uppercase tracking-[0.16em] text-[#1a1a1a]/50">
          <p>© {year} My Space Furniture</p>
          <Link href="/contact" className="hover:text-[#1a1a1a]">Contact</Link>
        </div>
      </div>
    </footer>
  )
}
