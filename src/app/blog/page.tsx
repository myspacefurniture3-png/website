import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JournalList from '@/components/JournalList'
import { getPosts } from '@/sanity/fetch'

export const revalidate = 60

export const metadata = {
  title: {
    absolute: 'Journal | Myy Space Furniture',
  },
  description:
    'Furniture buying guides, interior design trends, styling tips, and care advice from Myy Space Furniture in Roseville, CA.',
  keywords: [
    'furniture buying guide',
    'sofa buying tips',
    'bedroom furniture trends',
    'Roseville furniture blog',
    'home styling',
    'custom furniture tips',
    'Myy Space Journal',
  ],
}

export default async function BlogIndex() {
  const posts = await getPosts()

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f8f6f3]">
        <section className="px-6 pt-16 md:pt-24 pb-12 md:pb-16 text-center">
          <p className="uppercase tracking-[0.22em] text-[12px] mb-4 text-[#1a1a1a]/75 font-sans font-medium">Journal</p>
          <h1 className="font-serif text-5xl md:text-7xl font-light text-[#1a1a1a] tracking-wide">Stories for the home</h1>
          <p className="mt-5 max-w-xl mx-auto text-sm md:text-base text-[#1a1a1a]/75 font-light leading-relaxed">
            Buying guides, styling notes, and care from the Roseville showroom.
          </p>
        </section>

        <div className="max-w-6xl mx-auto px-6 pb-20 md:pb-28">
          <JournalList posts={posts} />
        </div>

        <section className="border-t border-black/10 py-20 md:py-24">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#1a1a1a]/75 mb-4 font-sans font-medium">Visit</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light mb-5">See the pieces in person</h2>
            <p className="text-[#1a1a1a]/75 font-light leading-relaxed mb-8">
              Our team can help you measure, choose fabrics, and plan a room around the ideas in these articles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-10 py-3.5 border border-[#1a1a1a] text-[11px] uppercase tracking-[0.22em] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition"
              >
                Contact the showroom
              </Link>
              <Link
                href="/gallery"
                className="px-10 py-3.5 border border-[#1a1a1a] text-[11px] uppercase tracking-[0.22em] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition"
              >
                View the gallery
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
