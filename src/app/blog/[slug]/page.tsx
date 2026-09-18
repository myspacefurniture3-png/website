import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from 'next-sanity'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ShareButtons from '@/components/ShareButtons'
import { notFound } from 'next/navigation'
import { getPostBySlug, getPosts } from '@/sanity/fetch'
import { absoluteUrl } from '@/lib/site'

export const revalidate = 60

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  if (!post) return { title: 'Journal | My Space Furniture' }
  return {
    title: `${post.seoTitle || post.title} | My Space Furniture`,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      type: 'article',
      images: post.coverImage ? [{ url: absoluteUrl(post.coverImage) }] : undefined,
    },
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  if (!post) return notFound()
  const posts = await getPosts()
  const related = [
    ...posts.filter((item) => item.slug !== post.slug && item.category === post.category),
    ...posts.filter((item) => item.slug !== post.slug && item.category !== post.category),
  ].slice(0, 3)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f8f6f3]">
        <div className="relative h-[48vh] md:h-[62vh] w-full bg-[#eeeae4]">
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:px-16 md:pb-14 max-w-4xl mx-auto w-full">
            <Link href="/blog" className="text-white/70 hover:text-white text-[11px] uppercase tracking-[0.18em] mb-6 w-fit">
              Journal
            </Link>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/70 mb-3">
              {post.kicker || post.category}
            </p>
            <h1 className="text-white font-serif text-3xl md:text-5xl font-light leading-tight max-w-3xl">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-5 text-white/60 text-xs">
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

        <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
          <div className="mb-10">
            <ShareButtons title={post.title} excerpt={post.excerpt} path={`/blog/${post.slug}`} image={post.coverImage} />
          </div>

          {post.excerpt && (
            <p className="text-[#1a1a1a]/80 text-lg leading-relaxed font-light mb-10 border-l border-black/20 pl-6">
              {post.excerpt}
            </p>
          )}

          {post.featuredQuote && (
            <blockquote className="font-serif text-2xl md:text-3xl font-light leading-snug text-[#1a1a1a] my-12">
              {post.featuredQuote}
            </blockquote>
          )}

          {post.body && post.body.length > 0 ? (
            <article className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-light prose-headings:text-[#1a1a1a] prose-p:text-[#1a1a1a]">
              <PortableText value={post.body as never} />
            </article>
          ) : (
            <article
              className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-light prose-headings:text-[#1a1a1a] prose-p:text-[#1a1a1a]"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-12">
              {post.tags.map((tag) => (
                <span key={tag} className="text-[10px] uppercase tracking-[0.16em] border border-black/15 px-3 py-1.5 text-[#1a1a1a]/60">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {post.relatedCategories && post.relatedCategories.length > 0 && (
            <div className="mt-12 pt-10 border-t border-black/10">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#1a1a1a]/45 mb-4 font-sans">Shop the story</p>
              <div className="flex flex-wrap gap-3">
                {post.relatedCategories.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/${item.slug}`}
                    className="px-4 py-2 border border-[#1a1a1a] text-[11px] uppercase tracking-[0.16em] hover:bg-[#1a1a1a] hover:text-white transition"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 pt-10 border-t border-black/10">
            <ShareButtons title={post.title} excerpt={post.excerpt} path={`/blog/${post.slug}`} image={post.coverImage} />
          </div>
        </div>

        {related.length > 0 && (
          <section className="border-t border-black/10 py-16 md:py-20">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-10">More from the journal</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {related.map((item) => (
                  <Link key={item.slug} href={`/blog/${item.slug}`} className="group">
                    <div className="relative h-48 w-full overflow-hidden mb-4 bg-[#eeeae4]">
                      <Image src={item.coverImage} alt={item.title} fill className="object-cover" />
                    </div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-[#1a1a1a]/45 mb-2">{item.category}</p>
                    <h3 className="font-serif text-xl font-light leading-snug group-hover:opacity-60 transition">{item.title}</h3>
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
