"use client";

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GoogleReviews from '@/components/GoogleReviews';
import Link from 'next/link';
import Typewriter from '@/components/Typewriter';
import { useCategories } from '@/components/CategoriesProvider';

// ── Moved outside Home so it's a proper component, not a function inside JSX ──
function EnableSoundButton() {
  const [visible, setVisible] = React.useState(true);

  const handleEnableSound = () => {
    const video = document.getElementById('hero-video') as HTMLVideoElement | null;
    if (video) {
      video.muted = false;
      video.play();
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <button
      className="absolute z-30 bottom-6 left-6 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200 flex items-center justify-center"
      style={{ minWidth: 0, minHeight: 0 }}
      onClick={handleEnableSound}
      aria-label="Enable Sound"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 32 32"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <circle cx="16" cy="16" r="14" stroke="white" strokeWidth="2" fill="none" />
        <polygon points="12,10 24,16 12,22" fill="white" />
      </svg>
      <span className="ml-2 text-xs font-semibold">Enable Sound</span>
    </button>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const categories = useCategories();
  const featured = categories.filter((item) => item.slug !== 'fabric-sectionals' && item.slug !== 'custom-furniture');
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
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

        <EnableSoundButton />

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 z-10 pointer-events-none" />

        <div className="relative z-20 text-center text-white px-6 max-w-4xl mx-auto">
          <div className="w-16 h-[1px] bg-white/50 mx-auto mb-8" />

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-light mb-6 leading-tight tracking-wide">
            MyySpace Furniture
          </h1>

          <p className="text-lg md:text-xl mb-10 text-white/80 font-light font-playfair">
            <Typewriter
              words={[
                "Premium Furniture for Your Perfect Home",
                "Custom Designs Tailored to You",
                "Luxury Comfort, Affordable Prices",
                "Expert Craftsmanship & Materials",
                "Fast Delivery & White-Glove Service",
              ]}
              typingSpeed={60}
              deletingSpeed={30}
              delay={1200}
              loop={true}
            />
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gallery"
              className="px-10 py-3.5 border border-white text-[12px] uppercase tracking-[0.2em] text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              Explore Collection
            </Link>
            <a
              href="https://www.google.com/maps/place/MyySpace+Furniture+%26+Mattress/@38.7465805,-121.2606694,17z/data=!4m8!3m7!1s0x678ab9b0c002b107:0xbff9cbf87975ed3c!8m2!3d38.7465805!4d-121.2606694!9m1!1b1!16s%2Fg%2F11yjlt_j7s"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-3.5 bg-white/10 backdrop-blur-sm border border-white/30 text-[12px] uppercase tracking-[0.2em] text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              Visit Showroom
            </a>
          </div>

          <div className="w-16 h-[1px] bg-white/50 mx-auto mt-12" />
        </div>

        <button
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce cursor-pointer"
          aria-label="Scroll down"
        >
          <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      </section>

      {/* Promo Banner Strip */}
      <section className="relative bg-[#1a1510] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djItSDJ2LTJoMzR6bTAtMzBWMkgydjJoMzR6TTIgMGgydjJIMlYwem0wIDZ2Mmg0VjZIMnptMCA2djJoNHYtMkgyem0wIDZ2Mmg0di0ySDJ6bTAgNnYyaDR2LTJIMnptMCA2djJoNHYtMkgyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-5 sm:py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:gap-8">
              <div className="flex items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 bg-white/[0.06] rounded-sm border border-white/[0.08]">
                <span className="text-[#e5c7a0] text-xl sm:text-2xl font-playfair font-semibold">50%</span>
                <div className="leading-tight">
                  <p className="text-white text-[11px] sm:text-xs font-semibold uppercase tracking-wider">Off</p>
                  <p className="text-white/50 text-[9px] sm:text-[10px] uppercase tracking-wider">Select Pieces</p>
                </div>
              </div>

              <div className="hidden lg:block w-px h-8 bg-white/10" />

              <div className="flex items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 bg-white/[0.06] rounded-sm border border-white/[0.08]">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#e5c7a0] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="leading-tight">
                  <p className="text-white text-[11px] sm:text-xs font-semibold uppercase tracking-wider">No Credit</p>
                  <p className="text-white/50 text-[9px] sm:text-[10px] uppercase tracking-wider">Financing Available</p>
                </div>
              </div>

              <div className="hidden lg:block w-px h-8 bg-white/10" />

              <div className="flex items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 bg-white/[0.06] rounded-sm border border-white/[0.08]">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#e5c7a0] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
                <div className="leading-tight">
                  <p className="text-white text-[11px] sm:text-xs font-semibold uppercase tracking-wider">Same Day</p>
                  <p className="text-white/50 text-[9px] sm:text-[10px] uppercase tracking-wider">Delivery Available</p>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/19166611073?text=Hi%21%20I%20am%20interested%20in%20getting%20a%20quote%20for%20furniture.%20Could%20you%20please%20help%20me%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3 bg-[#b8845c] hover:bg-[#a0725a] text-white text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 rounded-sm shadow-lg shadow-[#b8845c]/20"
            >
              Request a Quote
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </div>

        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#b8845c]/40 to-transparent" />
      </section>

      <main>
        <div className="bg-[#f8f6f3] px-2 md:px-3 py-2 md:py-3 space-y-2 md:space-y-3">
        {/* Custom Furniture */}
        <section className="relative w-full min-h-[72vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden">
          <img
            src="/products/custom-furniture/custom%20(3).jpeg"
            alt="Custom Furniture Hero"
            className="absolute inset-0 w-full h-full object-cover"
            width={1920}
            height={800}
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/25" />
          <div className="relative z-10 text-center text-white px-6 py-28 max-w-3xl mx-auto">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/60 mb-6">Bespoke Craftsmanship</p>
            <h2 className="text-3xl md:text-5xl font-playfair font-light mb-6 leading-tight">
              Custom Furniture
            </h2>
            <div className="w-12 h-[1px] bg-white/40 mx-auto mb-6" />
            <p className="text-base md:text-lg text-white/80 mb-10 leading-relaxed font-light max-w-xl mx-auto">
              Design your perfect furniture tailored to your unique needs and style. Choose your configuration, size, material, and color.
            </p>
            <Link
              href="/custom-furniture"
              className="inline-block px-10 py-3.5 border border-white text-[12px] uppercase tracking-[0.2em] text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              Discover More
            </Link>
          </div>
        </section>

        {/* Featured Collections — RH full-bleed mosaic */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
            {featured.map((category, idx) => (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className={`group relative overflow-hidden ${
                  idx === 0 || idx === featured.length - 1
                    ? 'md:col-span-2 h-[62vh] md:h-[82vh]'
                    : 'h-[48vh] md:h-[64vh]'
                }`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: `url('${category.menuImage || category.heroImage}')` }}
                />
                <div className="absolute inset-0 bg-black/15 group-hover:bg-black/35 transition-all duration-500" />
                <div className="absolute inset-0 flex items-end z-10">
                  <div className="w-full p-6 md:p-10">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-white/70 mb-2 font-sans">
                      Collection
                    </p>
                    <h3 className="text-2xl md:text-4xl font-serif font-light text-white tracking-wide">
                      {category.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Fabric Selections */}
        <section className="relative w-full h-[62vh] md:h-[85vh] overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            preload="auto"
            poster="/products/fabric-sectionals/hero3.webp"
          >
            <source src="/videos/hero3.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center text-white px-6 max-w-2xl">
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/60 mb-6">Handcrafted Collection</p>
              <h2 className="text-3xl md:text-5xl font-playfair font-light mb-6">
                Fabric Selections
              </h2>
              <div className="w-12 h-[1px] bg-white/40 mx-auto mb-6" />
              <Link
                href="/fabric-sectionals"
                className="inline-block px-10 py-3.5 border border-white text-[12px] uppercase tracking-[0.2em] text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </section>
        </div>

        {/* Why Choose Us */}
        <section className="py-20 md:py-28 bg-[#f8f6f3]">
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#b8845c] mb-4">The My Space Difference</p>
              <h2 className="text-3xl md:text-4xl font-playfair font-light text-gray-900 mb-4">
                Why Choose Us
              </h2>
              <div className="w-12 h-[1px] bg-[#b8845c] mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                { title: 'Premium Quality',    description: 'Carefully curated furniture that meets our high standards for quality and durability.' },
                { title: 'Expert Team',        description: 'Our knowledgeable staff is ready to help you find the perfect piece for your space.' },
                { title: 'Custom Design',      description: 'Design your own furniture exactly as you envision it with our custom services.' },
                { title: 'Competitive Prices', description: 'Premium quality at fair prices with flexible financing options available.' },
                { title: 'Fast Delivery',      description: 'Professional delivery service with white-glove handling and setup.' },
                { title: 'Customer Support',   description: 'Exceptional customer service and comprehensive warranty coverage.' },
              ].map((feature, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-[1px] bg-[#b8845c]/30 mx-auto mb-6 group-hover:w-24 group-hover:bg-[#b8845c] transition-all duration-500" />
                  <h3 className="text-lg font-playfair text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-light">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <GoogleReviews />

        {/* CTA Section */}
        <section className="relative py-24 md:py-32 bg-[#b8845c] overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
          <div className="relative max-w-3xl mx-auto px-6 text-center">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/50 mb-6">Your Home Awaits</p>
            <h2 className="text-3xl md:text-5xl font-playfair font-light text-white mb-6 leading-tight">
              Ready to Transform Your Space?
            </h2>
            <div className="w-12 h-[1px] bg-white/30 mx-auto mb-8" />
            <p className="text-base md:text-lg text-white/70 mb-10 font-light leading-relaxed">
              Visit our showroom or contact us today to explore our full collection of premium furniture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-10 py-3.5 border border-white text-[12px] uppercase tracking-[0.2em] text-white hover:bg-white hover:text-[#b8845c] transition-all duration-300"
              >
                Get in Touch
              </Link>
              <Link
                href="/financing"
                className="px-10 py-3.5 bg-white/10 border border-white/30 text-[12px] uppercase tracking-[0.2em] text-white hover:bg-white hover:text-[#b8845c] transition-all duration-300"
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