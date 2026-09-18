import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHeader from '@/components/PageHeader'
import CategoryGallery from '@/components/CategoryGallery'
import { getCategories, getCategoryBySlug } from '@/sanity/fetch'

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
  if (!category) return { title: 'Collection | My Space Furniture' }
  return {
    title: `${category.title} | My Space Furniture`,
    description: category.subtitle || `Explore ${category.title} at My Space Furniture.`,
  }
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  if (RESERVED.has(params.slug)) notFound()
  const category = await getCategoryBySlug(params.slug)
  if (!category) notFound()

  return (
    <>
      <Header />
      <PageHeader title={category.title} subtitle={category.subtitle} heroImage={category.heroImage || category.menuImage} />
      <main className="bg-[#f8f6f3]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-24">
          <CategoryGallery images={category.gallery} title={category.title} />
        </div>
      </main>
      <Footer />
    </>
  )
}
