import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CategoryGallery from '@/components/CategoryGallery'
import { getCategories } from '@/sanity/fetch'

export const revalidate = 60

export const metadata = {
  title: 'Gallery | Myy Space Furniture',
  description: 'Explore our collection of beautiful furniture and inspiring interior designs.',
}

export default async function Gallery() {
  const categories = await getCategories()
  const images = categories.flatMap((category) =>
    (category.gallery || []).map((item) => ({
      src: item.src,
      alt: item.alt || category.title,
    }))
  )

  // Dedupe by src while keeping order
  const seen = new Set<string>()
  const unique = images.filter((item) => {
    if (!item.src || seen.has(item.src)) return false
    seen.add(item.src)
    return true
  })

  return (
    <>
      <Header />
      <main className="bg-[#f8f6f3]">
        <div className="text-center px-6 pt-16 md:pt-24 pb-10 md:pb-14">
          <p className="text-[12px] uppercase tracking-[0.22em] text-[#1a1a1a]/50 mb-4 font-sans">Inspiration</p>
          <h1 className="font-serif text-5xl md:text-7xl font-light tracking-wide">Gallery</h1>
          <p className="mt-5 max-w-xl mx-auto text-sm md:text-base text-[#1a1a1a]/65 font-light leading-relaxed">
            Showroom photography across sofas, bedrooms, dining, and more — from the Myy Space collection.
          </p>
        </div>
        <div className="px-2 md:px-4 pb-20 md:pb-28">
          <CategoryGallery images={unique} title="Gallery" />
        </div>
      </main>
      <Footer />
    </>
  )
}
