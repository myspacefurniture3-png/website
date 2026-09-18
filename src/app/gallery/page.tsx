import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CategoryGallery from '@/components/CategoryGallery'

export const metadata = {
  title: 'Gallery | My Space Furniture',
  description: 'Explore our collection of beautiful furniture and inspiring interior designs.',
}

const images = [
  { src: '/images/heroes/gallery-hero.webp', alt: 'Gallery' },
  ...Array.from({ length: 84 }, (_, i) => `/products/gallery/gallery-${i + 1}.webp`),
  '/products/gallery/gallery (1).jpeg',
  '/products/gallery/gallery (2).jpeg',
  '/products/gallery/gallery (3).jpeg',
  '/products/gallery/gallery (4).jpeg',
  '/products/gallery/gallery (5).jpeg',
  '/products/gallery/gallery (6).jpeg',
].map((src) => (typeof src === 'string' ? { src, alt: 'Gallery' } : src))

export default function Gallery() {
  return (
    <>
      <Header />
      <main className="bg-[#f8f6f3]">
        <div className="text-center px-6 pt-16 md:pt-24 pb-10 md:pb-14">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#1a1a1a]/50 mb-4 font-sans">Inspiration</p>
          <h1 className="font-serif text-4xl md:text-6xl font-light tracking-wide">Gallery</h1>
          <p className="mt-5 max-w-xl mx-auto text-sm md:text-base text-[#1a1a1a]/65 font-light leading-relaxed">
            Explore our collection of beautiful furniture and inspiring interior designs
          </p>
        </div>
        <div className="px-2 md:px-4 pb-20 md:pb-28">
          <CategoryGallery images={images} title="Gallery" />
        </div>
      </main>
      <Footer />
    </>
  )
}
