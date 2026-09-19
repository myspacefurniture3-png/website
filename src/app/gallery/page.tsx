import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GalleryExplorer, { type GalleryProduct } from '@/components/GalleryExplorer'
import { getCategories } from '@/sanity/fetch'

export const revalidate = 60

export const metadata = {
  title: 'Gallery | Myy Space Furniture',
  description: 'Browse Myy Space Furniture by collection — sofas, bedrooms, dining, and more.',
}

function productTitle(alt: string, categoryTitle: string, index: number) {
  const cleaned = (alt || '').trim()
  if (cleaned && cleaned.toLowerCase() !== categoryTitle.toLowerCase()) {
    return cleaned.toUpperCase()
  }
  return `${categoryTitle} ${String(index + 1).padStart(2, '0')}`.toUpperCase()
}

export default async function Gallery() {
  const categories = await getCategories()
  const filters = categories
    .filter((category) => category.showInNav !== false)
    .map((category) => ({
      slug: category.slug,
      label: category.navLabel || category.title,
    }))

  const seen = new Set<string>()
  const products: GalleryProduct[] = []

  for (const category of categories) {
    const gallery = category.gallery || []
    gallery.forEach((item, index) => {
      if (!item?.src || seen.has(item.src)) return
      seen.add(item.src)
      products.push({
        id: `${category.slug}-${index}-${item.src}`,
        src: item.src,
        title: productTitle(item.alt || '', category.title, index),
        categorySlug: category.slug,
        categoryLabel: category.navLabel || category.title,
      })
    })
  }

  return (
    <>
      <Header />
      <main className="bg-[#f8f6f3] min-h-screen">
        <div className="text-center px-6 pt-16 md:pt-24 pb-8 md:pb-10">
          <p className="text-[12px] uppercase tracking-[0.22em] text-[#1a1a1a]/50 mb-4 font-sans">Shop</p>
          <h1 className="font-serif text-5xl md:text-7xl font-light tracking-wide">Gallery</h1>
          <p className="mt-5 max-w-xl mx-auto text-sm md:text-base text-[#1a1a1a]/65 font-light leading-relaxed">
            Filter by collection, then open a piece or shop the full category.
          </p>
        </div>

        <div className="pb-24 md:pb-32">
          <GalleryExplorer products={products} filters={filters} />
        </div>
      </main>
      <Footer />
    </>
  )
}
