'use client'

import Footer from '@/components/Footer'
import GoogleReviews from '@/components/GoogleReviews'
import HomeHeroCinema from '@/components/HomeHeroCinema'
import HomeImageDrift from '@/components/HomeImageDrift'
import HomeCollections from '@/components/HomeCollections'
import Link from 'next/link'
import { useCategories } from '@/components/CategoriesProvider'

export default function Home() {
  const categories = useCategories()

  return (
    <>
      <HomeHeroCinema />

      <section className="bg-[#f8f6f3] border-y border-black/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-8 text-[12px] uppercase tracking-[0.18em] text-[#1a1a1a]/70 font-sans">
          <span>50% off select pieces</span>
          <span className="hidden sm:inline text-black/20">·</span>
          <span>Financing available</span>
          <span className="hidden sm:inline text-black/20">·</span>
          <span>Same-day delivery</span>
        </div>
      </section>

      <HomeImageDrift />

      <main>
        <HomeCollections categories={categories} />

        <section className="py-20 md:py-28 bg-[#f8f6f3]">
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <p className="text-[12px] uppercase tracking-[0.26em] text-[#1a1a1a]/75 mb-4 font-sans font-medium">
                The Myy Space Difference
              </p>
              <h2 className="text-4xl md:text-5xl font-serif font-light text-[#1a1a1a] mb-4">Why Choose Us</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                {
                  title: 'Premium Quality',
                  description:
                    'Carefully curated furniture that meets our high standards for quality and durability.',
                },
                {
                  title: 'Expert Team',
                  description: 'Our knowledgeable staff is ready to help you find the perfect piece for your space.',
                },
                {
                  title: 'Custom Design',
                  description: 'Design your own furniture exactly as you envision it with our custom services.',
                },
                {
                  title: 'Competitive Prices',
                  description: 'Premium quality at fair prices with flexible financing options available.',
                },
                {
                  title: 'Fast Delivery',
                  description: 'Professional delivery service with white-glove handling and setup.',
                },
                {
                  title: 'Customer Support',
                  description: 'Exceptional customer service and comprehensive warranty coverage.',
                },
              ].map((feature) => (
                <div key={feature.title} className="text-center">
                  <div className="w-10 h-px bg-[#1a1a1a]/30 mx-auto mb-6" />
                  <h3 className="text-xl font-serif font-light text-[#1a1a1a] mb-3">{feature.title}</h3>
                  <p className="text-sm text-[#1a1a1a]/70 leading-relaxed font-light">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <GoogleReviews />

        <section className="py-24 md:py-32 bg-[#f8f6f3] border-t border-black/10">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-[12px] uppercase tracking-[0.26em] text-[#1a1a1a]/75 mb-6 font-sans font-medium">Visit</p>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-[#1a1a1a] mb-6 leading-tight">
              Ready to Transform Your Space?
            </h2>
            <p className="text-base text-[#1a1a1a]/75 mb-10 font-light leading-relaxed">
              Visit our showroom or contact us today to explore our full collection of premium furniture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-10 py-3.5 border border-[#1a1a1a] text-[12px] uppercase tracking-[0.18em] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-all duration-300"
              >
                Get in Touch
              </Link>
              <Link
                href="/financing"
                className="px-10 py-3.5 border border-[#1a1a1a] text-[12px] uppercase tracking-[0.18em] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-all duration-300"
              >
                Financing Options
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
