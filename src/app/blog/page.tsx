import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getPosts } from '@/sanity/fetch'

export const revalidate = 60

export const metadata = {
  title: 'Journal | My Space Furniture',
  description: 'Furniture buying guides, interior design trends, and home styling tips from My Space Furniture in Roseville, CA.',
}

export default async function BlogIndex() {
  const posts = await getPosts()
  const [featured, ...rest] = posts

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f8f6f3]">
        <section className="py-20 px-6 text-center border-b border-black/10">
          <p className="uppercase tracking-[0.25em] text-[11px] mb-4 text-[#1a1a1a]/50">Our Journal</p>
          <h1 className="font-playfair text-4xl md:text-5xl font-light text-[#1a1a1a]">Furniture & Home Interiors</h1>
        </section>

        <div className="max-w-6xl mx-auto px-6 py-16">
          {featured && (
            <Link href={`/blog/${featured.slug}`} className="group block mb-16">
              <div className="relative h-80 md:h-[460px] w-full overflow-hidden">
                <Image src={featured.coverImage} alt={featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 md:p-12">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-white/70">{featured.category}</span>
                  <h2 className="text-white font-playfair text-2xl md:text-4xl font-light max-w-2xl leading-tight mt-3 mb-3">{featured.title}</h2>
                  <p className="text-white/70 text-sm hidden md:block max-w-xl">{featured.excerpt}</p>
                </div>
              </div>
            </Link>
          )}

          <div className="grid md:grid-cols-2 gap-10">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <div className="relative h-56 w-full overflow-hidden mb-5">
                  <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#1a1a1a]/50 mb-2">{post.category}</p>
                <h2 className="font-playfair text-xl font-light text-[#1a1a1a] mb-2">{post.title}</h2>
                <p className="text-sm text-[#1a1a1a]/60 leading-relaxed">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
