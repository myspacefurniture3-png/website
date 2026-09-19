'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useCategories } from '@/components/CategoriesProvider';
import { SHOWROOM_MAPS_URL } from '@/lib/site';

interface HeaderProps {
  transparent?: boolean;
}

const menuSections: {
  title: string
  href: string
  image: string
  links: { href: string; label: string; external?: boolean }[]
}[] = [
  {
    title: 'Our Products',
    href: '/loveseats',
    image: '/Website/IMG_4540.PNG',
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
    image: '/Website/IMG_4546.PNG',
    links: [
      { href: '/', label: 'Home' },
      { href: '/gallery', label: 'Gallery' },
      { href: SHOWROOM_MAPS_URL, label: 'Showroom', external: true },
      { href: '/contact', label: 'Find Us' },
    ],
  },
  {
    title: 'Our Services',
    href: '/custom-furniture',
    image: '/Website/IMG_4296.PNG',
    links: [
      { href: '/custom-furniture', label: 'Custom Furniture' },
      { href: '/contact', label: 'Request a Consultation' },
    ],
  },
  {
    title: 'Our Spaces',
    href: '/bedroom-sets',
    image: '/Website/IMG_4500.PNG',
    links: [
      { href: '/loveseats', label: 'Living' },
      { href: '/bedroom-sets', label: 'Bedroom' },
      { href: '/dining-tables', label: 'Dining' },
      { href: '/bunk-beds', label: 'Kids' },
    ],
  },
];

const utilityLinks = [
  { href: '/', label: 'Home' },
  { href: '/contact', label: 'Contact' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About Us' },
  { href: '/faq', label: 'FAQs' },
];

function BrandLogo({ invert = false, onClick }: { invert?: boolean; onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="absolute left-1/2 -translate-x-1/2">
      <span className="relative block h-[70px] w-[196px] sm:h-[84px] sm:w-[236px] lg:h-[96px] lg:w-[280px] overflow-hidden">
        <Image
          src="/logo.png"
          alt="Myy Space Furniture"
          fill
          sizes="280px"
          className={`object-contain scale-[1.72] ${invert ? 'brightness-0 invert drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]' : ''}`}
          priority
        />
      </span>
    </Link>
  );
}

export default function Header({ transparent = false }: HeaderProps) {
  const pathname = usePathname();
  const categories = useCategories();
  const shopLinks = categories.map((item) => ({
    href: `/${item.slug}`,
    label: item.navLabel,
  }));
  const collectionLinks = [
    { href: '/', label: 'Home' },
    ...shopLinks,
  ];
  const navLinks = [
    ...collectionLinks,
    { href: '/gallery', label: 'Gallery' },
  ];
  const productLinks = categories.map((item) => ({
    href: `/${item.slug}`,
    label: item.title,
  }));
  const menuColumns = [
    {
      title: 'Our Products',
      href: shopLinks[0]?.href || '/loveseats',
      image: categories[0]?.menuImage || '/products/loveseat (2).jpeg',
      links: productLinks,
    },
    ...menuSections.slice(1),
  ];
  const allSearchLinks = [
    ...navLinks,
    ...shopLinks,
    ...productLinks,
    ...menuColumns.flatMap((section) => section.links),
    ...utilityLinks,
  ].filter((item, index, list) => list.findIndex((entry) => entry.href === item.href) === index);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [headerHovered, setHeaderHovered] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  const isTransparent = transparent && !menuOpen && !searchOpen && !headerHovered;
  const iconClass = isTransparent ? 'text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)]' : 'text-[#1a1a1a]';
  const searchResults = searchQuery.trim()
    ? allSearchLinks.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.trim().toLowerCase())
      )
    : allSearchLinks.slice(0, 6);

  const openSearch = () => {
    setMenuOpen(false);
    setSearchOpen(true);
  };

  const line = isTransparent ? 'bg-white' : 'bg-[#1a1a1a]';
  const textShadow = isTransparent ? 'drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)]' : '';
  const linkClass = `hidden md:inline text-[12px] lg:text-[13px] uppercase tracking-[0.18em] font-sans font-medium hover:opacity-70 ${iconClass} ${textShadow}`;
  const categoryClass = (active: boolean) =>
    `text-[12px] xl:text-[13px] uppercase tracking-[0.14em] font-sans font-medium whitespace-nowrap hover:opacity-70 ${
      active ? 'opacity-100' : 'opacity-95'
    } ${textShadow}`;

  return (
    <>
      <header
        onMouseEnter={() => setHeaderHovered(true)}
        onMouseLeave={() => setHeaderHovered(false)}
        className={`w-full z-[60] relative transition-colors duration-300 ${
          transparent ? 'absolute top-0 left-0 right-0' : ''
        } ${
          isTransparent
            ? 'bg-gradient-to-b from-black/55 via-black/20 to-transparent'
            : 'bg-white'
        }`}
      >
        <div className={`relative flex items-center justify-between h-[84px] sm:h-[96px] lg:h-[108px] px-4 sm:px-8 lg:px-10 ${
          isTransparent ? 'border-b border-white/25' : 'border-b border-black/10'
        }`}>
          <div className="flex items-center gap-5 flex-1">
            <button
              className="p-1"
              onClick={() => {
                setSearchOpen(false);
                setMenuOpen(true);
              }}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <div className="flex flex-col gap-[7px]">
                <span className={`block w-6 h-[1.5px] ${line}`} />
                <span className={`block w-6 h-[1.5px] ${line}`} />
              </div>
            </button>
            <button
              onClick={openSearch}
              className={`${iconClass} p-1`}
              aria-label="Search"
              aria-expanded={searchOpen}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.3" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" />
                <path strokeLinecap="round" d="M20 20l-3-3" />
              </svg>
            </button>
          </div>

          <BrandLogo invert={isTransparent} />

          <div className="flex items-center justify-end gap-5 lg:gap-7 flex-1">
            <a
              href={SHOWROOM_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Showroom
            </a>
            <Link href="/gallery" className={linkClass}>Gallery</Link>
            <Link href="/financing" className={linkClass}>Financing</Link>
            <Link href="/contact" className={linkClass}>Contact</Link>
            <a href="tel:+19166611073" className={`${iconClass} p-1`} aria-label="Call us">
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </a>
          </div>
        </div>

        <nav
          className={`hidden lg:flex items-center justify-center flex-nowrap gap-x-4 xl:gap-x-6 px-4 lg:px-8 py-3.5 overflow-x-auto ${
            isTransparent ? 'text-white' : 'text-[#1a1a1a]'
          }`}
          aria-label="Shop categories"
        >
          {collectionLinks.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={categoryClass(active)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div
          className={`absolute inset-x-0 top-full z-[61] bg-[#f8f6f3] border-b border-black/10 transition-all duration-300 ${
            searchOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
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
            className="w-full bg-transparent text-base tracking-wide text-[#1a1a1a] placeholder:text-[#1a1a1a]/55 outline-none"
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/70 hover:text-[#1a1a1a]"
            >
              Close
            </button>
          </div>
          <ul className="mt-6 space-y-1">
            {searchResults.length === 0 ? (
              <li className="text-sm text-[#1a1a1a]/70 py-2">No matching collections</li>
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
      </header>
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
                {navLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between py-3.5 text-[16px] md:text-[17px] font-sans font-medium uppercase tracking-[0.14em] text-[#1a1a1a]"
                    >
                      <span>{item.label}</span>
                      <svg className="w-4 h-4 text-[#1a1a1a]/70" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href={SHOWROOM_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between py-3.5 text-[16px] md:text-[17px] font-sans font-medium uppercase tracking-[0.14em] text-[#1a1a1a]"
                  >
                    <span>Showroom</span>
                    <svg className="w-4 h-4 text-[#1a1a1a]/70" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </a>
                </li>
              </ul>

              <div className="border-t border-black/15 mt-4 pt-4">
                <ul>
                  {utilityLinks.filter((item) => !navLinks.some((nav) => nav.href === item.href)).map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="block py-3 text-[15px] md:text-[16px] font-sans font-normal uppercase tracking-[0.14em] text-[#1a1a1a]/80"
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
        <div className="relative flex items-center justify-between h-[84px] sm:h-[96px] lg:h-[108px] px-4 sm:px-8 lg:px-10 shrink-0 border-b border-black/10">
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

          <BrandLogo onClick={() => setMenuOpen(false)} />

          <div className="flex items-center justify-end gap-6 flex-1">
            <a
              href={SHOWROOM_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="hidden md:block text-[12px] lg:text-[13px] font-sans font-medium uppercase tracking-[0.18em] text-[#1a1a1a] hover:opacity-50"
            >
              Showroom
            </a>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="hidden md:block text-[12px] lg:text-[13px] font-sans font-medium uppercase tracking-[0.18em] text-[#1a1a1a] hover:opacity-50"
            >
              Contact
            </Link>
            <a href="tel:+19166611073" className="text-[#1a1a1a] p-1" aria-label="Call us">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </a>
          </div>
        </div>

        <nav
          className="hidden lg:flex items-center justify-center flex-nowrap gap-x-4 xl:gap-x-6 px-4 lg:px-8 py-3.5 text-[#1a1a1a] shrink-0 overflow-x-auto"
          aria-label="Shop categories"
        >
          {collectionLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`text-[12px] xl:text-[13px] uppercase tracking-[0.14em] font-sans font-medium whitespace-nowrap transition-opacity duration-300 hover:opacity-50 ${
                pathname === item.href ? 'opacity-100' : 'opacity-95'
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
                  className="block font-serif text-[22px] lg:text-[26px] font-light uppercase tracking-[0.1em] text-[#1a1a1a] mb-4 hover:opacity-50"
                >
                  {section.title}
                </Link>
                <ul className="space-y-2.5">
                  {section.links.map((item) => (
                    <li key={`${section.title}-${item.href}-${item.label}`}>
                      {'external' in item && item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setMenuOpen(false)}
                          className="font-sans text-[15px] lg:text-[16px] font-light text-[#1a1a1a] hover:opacity-50 transition-opacity"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className="font-sans text-[15px] lg:text-[16px] font-light text-[#1a1a1a] hover:opacity-50 transition-opacity"
                        >
                          {item.label}
                        </Link>
                      )}
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
                className="text-[12px] sm:text-[13px] font-sans uppercase tracking-[0.14em] text-[#1a1a1a]/80 hover:text-[#1a1a1a] hover:underline underline-offset-4"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <p className="text-[12px] font-sans uppercase tracking-[0.14em] text-[#1a1a1a]/70">Roseville, CA</p>
        </div>
      </div>
    </>
  );
}
