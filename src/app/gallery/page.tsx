import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHeader from '@/components/PageHeader'
import CategoryGallery from '@/components/CategoryGallery'

export const metadata = {
  title: 'Gallery | My Space Furniture',
  description: 'Explore our collection of beautiful furniture and inspiring interior designs.',
}

const images = [
  ...Array.from({ length: 84 }, (_, i) => `/products/gallery/gallery-${i + 1}.webp`),
  '/products/gallery/gallery (1).jpeg',
  '/products/gallery/gallery (2).jpeg',
  '/products/gallery/gallery (3).jpeg',
  '/products/gallery/gallery (4).jpeg',
  '/products/gallery/gallery (5).jpeg',
  '/products/gallery/gallery (6).jpeg',
].map((src) => ({ src, alt: 'Gallery' }))

export default function Gallery() {
  return (
    <>
      <Header />
      <PageHeader
        title="Gallery"
        subtitle="Explore our collection of beautiful furniture and inspiring interior designs"
        heroImage="/images/heroes/gallery-hero.webp"
        kicker="Inspiration"
      />

      <main className="bg-[#f8f6f3]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-24">
          <CategoryGallery images={images} title="Gallery" />
        </div>
      </main>

      <Footer />
    </>
  )
}
