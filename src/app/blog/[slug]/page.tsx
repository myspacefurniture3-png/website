import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from 'next-sanity'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { notFound } from 'next/navigation'
import { getPostBySlug, getPosts } from '@/sanity/fetch'

export const revalidate = 60

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  if (!post) return { title: 'Journal | My Space Furniture' }
  return {
    title: `${post.title} | My Space Furniture`,
    description: post.excerpt,
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  if (!post) return notFound()
  const posts = await getPosts()
  const related = posts.filter((item) => item.slug !== post.slug).slice(0, 2)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f8f6f3]">
        <div className="relative h-[50vh] md:h-[60vh] w-full">
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:px-16 md:pb-14 max-w-4xl mx-auto w-full">
            <Link href="/blog" className="text-white/70 hover:text-white text-[11px] uppercase tracking-[0.18em] mb-6 w-fit">
              All Articles
            </Link>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/70 mb-3">{post.category}</p>
            <h1 className="text-white font-playfair text-3xl md:text-5xl font-light leading-tight max-w-3xl">{post.title}</h1>
            <div className="flex items-center gap-4 mt-5 text-white/60 text-xs">
              <span>{post.author}</span>
              <span>·</span>
              <span>{post.date}</span>
              {post.readTime && (
                <>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-14">
          <p className="text-[#1a1a1a]/80 text-lg leading-relaxed font-light mb-8 border-l border-black/20 pl-6">
            {post.excerpt}
          </p>
          {post.body && post.body.length > 0 ? (
            <article className="prose prose-lg max-w-none prose-headings:font-playfair prose-headings:font-light prose-headings:text-[#1a1a1a] prose-p:text-[#1a1a1a]">
              <PortableText value={post.body as never} />
            </article>
          ) : (
            <article
              className="prose prose-lg max-w-none prose-headings:font-playfair prose-headings:font-light prose-headings:text-[#1a1a1a] prose-p:text-[#1a1a1a]"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          )}
        </div>

        {related.length > 0 && (
          <section className="border-t border-black/10 py-14">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="font-playfair text-2xl font-light mb-8">More Articles</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {related.map((item) => (
                  <Link key={item.slug} href={`/blog/${item.slug}`} className="group flex gap-5">
                    <div className="relative w-28 h-24 flex-shrink-0 overflow-hidden">
                      <Image src={item.coverImage} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-[11px] uppercase tracking-[0.16em] text-[#1a1a1a]/50 mb-1">{item.category}</p>
                      <h3 className="font-playfair text-base font-light">{item.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
