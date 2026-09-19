import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CategoryGallery from '@/components/CategoryGallery'
import { getCategories, getCategoryBySlug } from '@/sanity/fetch'
import { filterAvailableImages } from '@/lib/publicImages'

export const revalidate = 60

const RESERVED = new Set([
  'about',
  'contact',
  'faq',
  'financing',
  'gallery',
  'blog',
  'studio',
  'api',
  'credits',
])

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories
    .filter((item) => item.slug && !RESERVED.has(item.slug))
    .map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const category = await getCategoryBySlug(params.slug)
  if (!category) return { title: 'Collection | Myy Space Furniture' }
  return {
    title: `${category.title} | Myy Space Furniture`,
    description: category.subtitle || `Explore ${category.title} at Myy Space Furniture.`,
  }
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  if (RESERVED.has(params.slug)) notFound()
  const category = await getCategoryBySlug(params.slug)
  if (!category) notFound()

  const images = filterAvailableImages(
    [
      ...(category.heroImage && !category.gallery.some((item) => item.src === category.heroImage)
        ? [{ src: category.heroImage, alt: category.title }]
        : []),
      ...category.gallery,
    ],
    12
  )

  return (
    <>
      <Header />
      <main className="bg-[#f8f6f3]">
        <div className="text-center px-6 pt-16 md:pt-24 pb-10 md:pb-14">
          <p className="text-[12px] uppercase tracking-[0.22em] text-[#1a1a1a]/50 mb-4 font-sans">Collection</p>
          <h1 className="font-serif text-5xl md:text-7xl font-light tracking-wide">{category.title}</h1>
          {category.subtitle && (
            <p className="mt-5 max-w-xl mx-auto text-sm md:text-base text-[#1a1a1a]/65 font-light leading-relaxed">
              {category.subtitle}
            </p>
          )}
        </div>
        <div className="px-2 md:px-4 pb-20 md:pb-28">
          <CategoryGallery images={images} title={category.title} shopHref={`/${category.slug}`} />
        </div>
      </main>
      <Footer />
    </>
  )
}
