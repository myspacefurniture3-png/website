import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getCategories } from '../sanity/fetch'

export default async function NotFound() {
  const categories = await getCategories()

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f8f6f3] text-[#1a1a1a] py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#1a1a1a]/50 mb-4">404</p>
          <h1 className="text-5xl md:text-7xl font-playfair font-light mb-6">Page Not Found</h1>
          <p className="text-lg text-[#1a1a1a]/70 font-light mb-12 max-w-2xl mx-auto">
            The page you are looking for seems to have been moved or doesn&apos;t exist. Explore our collections or return home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link
              href="/"
              className="px-10 py-3.5 border border-[#1a1a1a] text-[12px] uppercase tracking-[0.2em] hover:bg-[#1a1a1a] hover:text-white transition"
            >
              Go to Homepage
            </Link>
            <Link
              href="/contact"
              className="px-10 py-3.5 border border-[#1a1a1a] text-[12px] uppercase tracking-[0.2em] hover:bg-[#1a1a1a] hover:text-white transition"
            >
              Contact Us
            </Link>
          </div>

          <h2 className="text-2xl font-playfair font-light mb-10">Explore Our Collections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((item) => (
              <Link
                key={item.slug}
                href={`/${item.slug}`}
                className="p-6 border border-black/10 hover:border-[#1a1a1a] transition"
              >
                <div className="font-playfair text-lg font-light mb-1">{item.title}</div>
                <div className="text-[11px] uppercase tracking-[0.16em] text-[#1a1a1a]/50">{item.navLabel}</div>
              </Link>
            ))}
            <Link href="/gallery" className="p-6 border border-black/10 hover:border-[#1a1a1a] transition">
              <div className="font-playfair text-lg font-light mb-1">Gallery</div>
              <div className="text-[11px] uppercase tracking-[0.16em] text-[#1a1a1a]/50">Inspiration</div>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
