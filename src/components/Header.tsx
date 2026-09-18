'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useCategories } from '@/components/CategoriesProvider';

interface HeaderProps {
  transparent?: boolean;
}

const menuSections = [
  {
    title: 'Our Products',
    href: '/loveseats',
    image: '/products/sofa.webp',
    links: [
      { href: '/loveseats', label: 'Sofas & Loveseats' },
      { href: '/leather-sectionals', label: 'Leather Sectionals' },
      { href: '/fabric-sectionals', label: 'Fabric Selections' },
      { href: '/mattresses', label: 'Mattresses' },
      { href: '/vanities', label: 'Vanities' },
      { href: '/bunk-beds', label: 'Bunk Beds' },
    ],
  },
  {
    title: 'Our Places',
    href: '/gallery',
    image: '/products/gallery/gallery (1).jpeg',
    links: [
      { href: '/gallery', label: 'Gallery' },
      { href: '/about', label: 'Our Showroom' },
      { href: '/contact', label: 'Find Us' },
    ],
  },
  {
    title: 'Our Services',
    href: '/custom-furniture',
    image: '/products/custom-furniture/custom (1).jpeg',
    links: [
      { href: '/custom-furniture', label: 'Custom Furniture' },
      { href: '/financing', label: 'Financing' },
      { href: '/contact', label: 'Request a Consultation' },
    ],
  },
  {
    title: 'Our Spaces',
    href: '/bedroom-sets',
    image: '/products/bedroom.webp',
    links: [
      { href: '/loveseats', label: 'Living' },
      { href: '/bedroom-sets', label: 'Bedroom' },
      { href: '/dining-tables', label: 'Dining' },
      { href: '/bunk-beds', label: 'Kids' },
    ],
  },
];

const utilityLinks = [
  { href: '/contact', label: 'Contact' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About Us' },
  { href: '/faq', label: 'FAQs' },
  { href: '/financing', label: 'Financing' },
];

export default function Header({ transparent = false }: HeaderProps) {
  const pathname = usePathname();
  const categories = useCategories();
  const shopLinks = categories.map((item) => ({
    href: `/${item.slug}`,
    label: item.navLabel,
  }));
  const productLinks = categories.map((item) => ({
    href: `/${item.slug}`,
    label: item.title,
  }));
  const menuColumns = [
    {
      title: 'Our Products',
      href: shopLinks[0]?.href || '/loveseats',
      image: categories[0]?.menuImage || '/products/sofa.webp',
      links: productLinks,
    },
    ...menuSections.slice(1),
  ];
  const allSearchLinks = [
    ...shopLinks,
    ...productLinks,
    ...menuColumns.flatMap((section) => section.links),
    ...utilityLinks,
  ].filter((item, index, list) => list.findIndex((entry) => entry.href === item.href) === index);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!transparent) return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [transparent]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    } else {
      setSearchQuery('');
    }
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const isTransparent = transparent && !scrolled && !menuOpen && !searchOpen;
  const iconClass = isTransparent ? 'text-white' : 'text-[#1a1a1a]';
  const searchResults = searchQuery.trim()
    ? allSearchLinks.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.trim().toLowerCase())
      )
    : allSearchLinks.slice(0, 6);

  const openSearch = () => {
    setMenuOpen(false);
    setSearchOpen(true);
  };

  return (
    <>
      <header
        className={`w-full z-[60] transition-all duration-500 ${
          transparent ? 'fixed top-0 left-0 right-0' : 'sticky top-0'
        } ${
          isTransparent
            ? 'bg-transparent'
            : 'bg-[#f8f6f3] border-b border-black/10'
        }`}
      >
        <div className="flex items-center justify-between h-[96px] sm:h-[112px] lg:h-[140px] px-5 sm:px-8 lg:px-12">
          <div className="flex items-center flex-1">
            <button
              className="p-2 -ml-2"
              onClick={() => {
                setSearchOpen(false);
                setMenuOpen(true);
              }}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <div className="flex flex-col gap-[5px]">
                <span className={`block w-5 h-[1px] transition-colors duration-500 ${isTransparent ? 'bg-white' : 'bg-[#1a1a1a]'}`} />
                <span className={`block w-5 h-[1px] transition-colors duration-500 ${isTransparent ? 'bg-white' : 'bg-[#1a1a1a]'}`} />
                <span className={`block w-5 h-[1px] transition-colors duration-500 ${isTransparent ? 'bg-white' : 'bg-[#1a1a1a]'}`} />
              </div>
            </button>
          </div>

          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="My Space Furniture"
              width={280}
              height={100}
              className={`h-20 sm:h-28 lg:h-32 xl:h-36 w-auto object-contain transition-all duration-500 ${
                isTransparent ? 'brightness-0 invert' : ''
              }`}
              priority
            />
          </Link>

          <div className="flex items-center justify-end gap-3 sm:gap-5 flex-1">
            <button
              onClick={openSearch}
              className={`${iconClass} transition-colors duration-500 p-1`}
              aria-label="Search"
              aria-expanded={searchOpen}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" />
                <path strokeLinecap="round" d="M20 20l-3-3" />
              </svg>
            </button>
            <a
              href="tel:+19166611073"
              className={`${iconClass} transition-colors duration-500 p-1 hidden sm:block`}
              aria-label="Call us"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </a>
          </div>
        </div>

        <nav
          className={`hidden lg:flex items-center justify-center gap-6 xl:gap-8 pb-4 transition-colors duration-500 ${
            isTransparent ? 'text-white/80' : 'text-[#1a1a1a]'
          }`}
          aria-label="Shop categories"
        >
          {shopLinks.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-[14px] xl:text-[15px] uppercase tracking-[0.14em] font-bold transition-opacity duration-300 hover:opacity-100 ${
                  active ? 'opacity-100' : 'opacity-70'
                }`}
              >
                {item.label}
                <span
                  className={`absolute left-0 -bottom-1 h-px w-full transition-opacity duration-300 ${
                    isTransparent ? 'bg-white' : 'bg-[#1a1a1a]'
                  } ${active ? 'opacity-100' : 'opacity-0'}`}
                />
              </Link>
            );
          })}
        </nav>
      </header>

      <div
        className={`fixed inset-x-0 z-[60] bg-white border-b border-black/10 transition-all duration-300 ${
          searchOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        } top-[96px] sm:top-[112px] lg:top-[180px]`}
      >
        <div className="max-w-2xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 border-b border-black/20 pb-3">
            <svg className="w-5 h-5 text-[#1a1a1a] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" />
              <path strokeLinecap="round" d="M20 20l-3-3" />
            </svg>
            <input
              ref={searchInputRef}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search collections"
              className="w-full bg-transparent text-base tracking-wide text-[#1a1a1a] placeholder:text-black/40 outline-none"
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="text-[10px] uppercase tracking-[0.2em] text-black/50 hover:text-[#1a1a1a]"
            >
              Close
            </button>
          </div>
          <ul className="mt-6 space-y-1">
            {searchResults.length === 0 ? (
              <li className="text-sm text-black/40 py-2">No matching collections</li>
            ) : (
              searchResults.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setSearchOpen(false)}
                    className="block py-2.5 text-base font-semibold tracking-wide text-[#1a1a1a] hover:opacity-50 transition-opacity"
                  >
                    {item.label}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
      {searchOpen && (
        <div
          className="fixed inset-0 z-[55] bg-black/20"
          onClick={() => setSearchOpen(false)}
        />
      )}

      {/* Mobile & tablet: RH-style left drawer */}
      <div
        className={`xl:hidden fixed inset-0 z-[100] ${
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
          className={`absolute top-0 left-0 h-full w-[85%] max-w-[400px] md:max-w-[420px] bg-[#f7f5f0] flex flex-col shadow-2xl transition-transform duration-300 ease-out ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="flex items-center justify-end h-14 px-4 shrink-0">
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5 text-[#1a1a1a]" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-10">
            <nav>
              <ul>
                {shopLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between py-3.5 text-[15px] md:text-base font-bold uppercase tracking-[0.12em] text-[#1a1a1a]"
                    >
                      <span>{item.label}</span>
                      <svg className="w-4 h-4 text-[#1a1a1a]/70" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/gallery"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between py-3.5 text-[15px] md:text-base font-bold uppercase tracking-[0.12em] text-[#1a1a1a]"
                  >
                    <span>Gallery</span>
                    <svg className="w-4 h-4 text-[#1a1a1a]/70" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </Link>
                </li>
              </ul>

              <div className="border-t border-black/15 mt-4 pt-4">
                <ul>
                  {utilityLinks.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="block py-3 text-[14px] md:text-[15px] font-semibold uppercase tracking-[0.12em] text-[#1a1a1a]/80"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>
        </aside>
      </div>

      {/* Desktop: RH-style four-column mega menu */}
      <div
        className={`hidden xl:flex fixed inset-0 z-[100] bg-[#faf9f6] flex-col transition-all duration-500 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="relative flex items-center justify-between h-[96px] sm:h-[112px] lg:h-[140px] px-5 sm:px-8 lg:px-12 shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 -ml-2"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6 text-[#1a1a1a]" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <button
              onClick={openSearch}
              className="p-1 text-[#1a1a1a]"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" />
                <path strokeLinecap="round" d="M20 20l-3-3" />
              </svg>
            </button>
          </div>

          <Link href="/" onClick={() => setMenuOpen(false)} className="absolute left-1/2 -translate-x-1/2">
            <Image
              src="/logo.png"
              alt="My Space Furniture"
              width={200}
              height={70}
              className="h-20 sm:h-28 lg:h-32 w-auto object-contain"
            />
          </Link>

          <div className="flex items-center justify-end gap-6 flex-1">
            <Link
              href="/custom-furniture"
              onClick={() => setMenuOpen(false)}
              className="hidden md:block text-[12px] font-playfair font-bold uppercase tracking-[0.16em] text-[#1a1a1a] hover:opacity-50"
            >
              Custom
            </Link>
            <Link
              href="/gallery"
              onClick={() => setMenuOpen(false)}
              className="hidden md:block text-[12px] font-playfair font-bold uppercase tracking-[0.16em] text-[#1a1a1a] hover:opacity-50"
            >
              Gallery
            </Link>
            <a href="tel:+19166611073" className="text-[#1a1a1a] p-1" aria-label="Call us">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </a>
          </div>
        </div>

        <nav
          className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 pb-5 px-8 text-[#1a1a1a] shrink-0"
          aria-label="Shop categories"
        >
          {shopLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`text-[14px] xl:text-[15px] uppercase tracking-[0.14em] font-bold transition-opacity duration-300 hover:opacity-50 ${
                pathname === item.href ? 'opacity-100' : 'opacity-80'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 xl:gap-8 px-6 sm:px-10 lg:px-14 py-8 lg:py-10">
            {menuColumns.map((section) => (
              <div key={section.title}>
                <Link href={section.href} onClick={() => setMenuOpen(false)} className="block group">
                  <div className="relative w-full aspect-[16/10] overflow-hidden mb-5">
                    <Image
                      src={section.image}
                      alt={section.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    />
                  </div>
                </Link>
                <Link
                  href={section.href}
                  onClick={() => setMenuOpen(false)}
                  className="block font-playfair text-[18px] lg:text-[20px] font-bold uppercase tracking-[0.08em] text-[#1a1a1a] mb-4 hover:opacity-50"
                >
                  {section.title}
                </Link>
                <ul className="space-y-2.5">
                  {section.links.map((item) => (
                    <li key={`${section.title}-${item.href}-${item.label}`}>
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="font-playfair text-[15px] lg:text-base text-[#1a1a1a] hover:opacity-50 transition-opacity"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="shrink-0 bg-[#eceae4] px-6 sm:px-10 lg:px-14 py-4 flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {utilityLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-[12px] sm:text-[13px] font-playfair text-[#1a1a1a]/80 hover:text-[#1a1a1a] hover:underline underline-offset-4"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <p className="text-[12px] font-playfair text-[#1a1a1a]/70">Roseville, CA</p>
        </div>
      </div>
    </>
  );
}
