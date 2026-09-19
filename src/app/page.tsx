"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GoogleReviews from '@/components/GoogleReviews';
import Link from 'next/link';
import { useCategories } from '@/components/CategoriesProvider';

export default function Home() {
  const categories = useCategories();
  const featured = categories.filter((item) => item.slug !== 'fabric-sectionals' && item.slug !== 'custom-furniture');
  return (
    <>
      <section className="relative w-full h-screen min-h-[640px] overflow-hidden">
        <Header transparent />

        <video
          autoPlay
          playsInline
          loop
          muted
          controls={false}
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover z-[1]"
          id="hero-video"
        >
          <source src="/videos/hero2.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/50 via-black/20 to-black/35" />

        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-6 pointer-events-none">
          <p className="text-[12px] md:text-[14px] uppercase tracking-[0.36em] font-sans font-medium mb-5 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)]">Roseville</p>
          <h1 className="font-serif font-light leading-none tracking-[0.16em] text-[56px] md:text-[92px] lg:text-[112px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
            MYY SPACE
          </h1>
          <p className="mt-5 text-[16px] md:text-[22px] lg:text-[24px] uppercase tracking-[0.28em] font-serif font-light text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
            Furniture
          </p>
        </div>

        <p className="absolute bottom-8 md:bottom-12 left-0 right-0 z-20 text-center px-6 text-[13px] md:text-[15px] uppercase tracking-[0.22em] text-white/85 font-sans">
          Roseville showroom · Furniture for every room
        </p>
      </section>

      <section className="bg-[#f8f6f3] border-y border-black/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-8 text-[12px] uppercase tracking-[0.18em] text-[#1a1a1a]/70 font-sans">
          <span>50% off select pieces</span>
          <span className="hidden sm:inline text-black/20">·</span>
          <span>Financing available</span>
          <span className="hidden sm:inline text-black/20">·</span>
          <span>Same-day delivery</span>
        </div>
      </section>

      <main>
        <div className="bg-[#f8f6f3] px-2 md:px-3 py-2 md:py-3 space-y-2 md:space-y-3">
          <Link href="/custom-furniture" className="relative block w-full min-h-[52vh] md:min-h-[64vh] overflow-hidden group">
            <img
              src="/Website/IMG_4365.PNG"
              alt="Custom Furniture"
              className="absolute inset-0 w-full h-full object-cover"
              width={1920}
              height={800}
              loading="eager"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10 h-full min-h-[52vh] md:min-h-[64vh] flex flex-col items-center justify-center text-center text-white px-6">
              <p className="text-[12px] uppercase tracking-[0.3em] text-white/70 mb-4 font-sans">Bespoke</p>
              <h2 className="text-5xl md:text-7xl font-serif font-light tracking-[0.14em]">CUSTOM</h2>
              <p className="mt-3 text-[16px] md:text-[18px] uppercase tracking-[0.26em] font-serif font-light text-white/85">Furniture</p>
              <p className="mt-5 max-w-md text-[13px] md:text-[14px] font-light tracking-wide text-white/80 normal-case">
                Designed for your room, your fabric, and how you live.
              </p>
            </div>
          </Link>

          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
              {featured.map((category, idx) => (
                <Link
                  key={category.slug}
                  href={`/${category.slug}`}
                  className={`group relative overflow-hidden ${
                    idx === 0 || idx === featured.length - 1
                      ? 'md:col-span-2 h-[42vh] md:h-[54vh]'
                      : 'h-[36vh] md:h-[46vh]'
                  }`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url("${encodeURI(category.menuImage || category.heroImage || '')}")`,
                    }}
                  />
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-black/35 transition-all duration-500" />
                  <div className="absolute inset-0 flex items-end z-10">
                    <div className="w-full p-6 md:p-10">
                      <p className="text-[12px] uppercase tracking-[0.22em] text-white/70 mb-2 font-sans">
                        Collection
                      </p>
                      <h3 className="text-3xl md:text-5xl font-serif font-light text-white tracking-wide">
                        {category.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <Link href="/fabric-sectionals" className="relative block w-full h-[48vh] md:h-[62vh] overflow-hidden group">
            <img
              src="/Website/IMG_4546.PNG"
              alt="Fabric Selections"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-center text-white px-6">
                <p className="text-[12px] uppercase tracking-[0.3em] text-white/70 mb-4 font-sans">Collection</p>
                <h2 className="text-5xl md:text-7xl font-serif font-light tracking-[0.12em]">FABRIC</h2>
                <p className="mt-3 text-[16px] md:text-[18px] uppercase tracking-[0.26em] font-serif font-light text-white/85">Selections</p>
                <p className="mt-5 max-w-md mx-auto text-[13px] md:text-[14px] font-light tracking-wide text-white/80 normal-case">
                  Soft textiles and modular shapes for rooms you live in every day.
                </p>
              </div>
            </div>
          </Link>
        </div>

        <section className="py-20 md:py-28 bg-[#f8f6f3]">
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <p className="text-[12px] uppercase tracking-[0.26em] text-[#1a1a1a]/50 mb-4 font-sans">The Myy Space Difference</p>
              <h2 className="text-4xl md:text-5xl font-serif font-light text-[#1a1a1a] mb-4">
                Why Choose Us
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                { title: 'Premium Quality', description: 'Carefully curated furniture that meets our high standards for quality and durability.' },
                { title: 'Expert Team', description: 'Our knowledgeable staff is ready to help you find the perfect piece for your space.' },
                { title: 'Custom Design', description: 'Design your own furniture exactly as you envision it with our custom services.' },
                { title: 'Competitive Prices', description: 'Premium quality at fair prices with flexible financing options available.' },
                { title: 'Fast Delivery', description: 'Professional delivery service with white-glove handling and setup.' },
                { title: 'Customer Support', description: 'Exceptional customer service and comprehensive warranty coverage.' },
              ].map((feature) => (
                <div key={feature.title} className="text-center">
                  <div className="w-10 h-px bg-[#1a1a1a]/30 mx-auto mb-6" />
                  <h3 className="text-xl font-serif font-light text-[#1a1a1a] mb-3">{feature.title}</h3>
                  <p className="text-sm text-[#1a1a1a]/60 leading-relaxed font-light">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <GoogleReviews />

        <section className="py-24 md:py-32 bg-[#f8f6f3] border-t border-black/10">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-[12px] uppercase tracking-[0.26em] text-[#1a1a1a]/50 mb-6 font-sans">Visit</p>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-[#1a1a1a] mb-6 leading-tight">
              Ready to Transform Your Space?
            </h2>
            <p className="text-base text-[#1a1a1a]/65 mb-10 font-light leading-relaxed">
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
  );
}
