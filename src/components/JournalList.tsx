'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Post } from '@/lib/types'

export default function JournalList({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState('All')

  const categories = useMemo(() => {
    const names = Array.from(new Set(posts.map((item) => item.category).filter(Boolean)))
    return ['All', ...names]
  }, [posts])

  const featured = posts.find((item) => item.featured) || posts[0]
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return posts.filter((item) => {
      if (featured && item.slug === featured.slug && !needle && active === 'All') return false
      if (active !== 'All' && item.category !== active) return false
      if (!needle) return true
      const haystack = [item.title, item.excerpt, item.category, ...(item.tags || [])].join(' ').toLowerCase()
      return haystack.includes(needle)
    })
  }, [posts, query, active, featured])

  const showFeatured = featured && active === 'All' && !query.trim()

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-12">
        <div className="flex flex-wrap gap-2 flex-1">
          {categories.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setActive(name)}
              className={`px-4 py-2 text-[10px] uppercase tracking-[0.18em] border transition ${
                active === name
                  ? 'border-[#1a1a1a] bg-[#1a1a1a] text-white'
                  : 'border-black/15 text-[#1a1a1a]/70 hover:border-[#1a1a1a]'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
        <label className="relative w-full lg:w-72">
          <span className="sr-only">Search journal</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles"
            className="w-full bg-transparent border-b border-black/20 py-2 text-sm text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:border-[#1a1a1a]"
          />
        </label>
      </div>

      {showFeatured && featured && (
        <Link href={`/blog/${featured.slug}`} className="group grid lg:grid-cols-2 gap-8 lg:gap-14 mb-20 items-center">
          <div className="relative h-[46vh] min-h-[280px] overflow-hidden bg-[#eeeae4]">
            <Image
              src={featured.coverImage}
              alt={featured.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#1a1a1a]/45 mb-4 font-sans">
              {featured.kicker || 'Featured'} · {featured.category}
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-light leading-tight text-[#1a1a1a] mb-5">
              {featured.title}
            </h2>
            <p className="text-[#1a1a1a]/65 font-light leading-relaxed mb-6 max-w-xl">{featured.excerpt}</p>
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#1a1a1a]/45">
              {featured.date}
              {featured.readTime ? ` · ${featured.readTime}` : ''}
            </p>
          </div>
        </Link>
      )}

      {filtered.length ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {filtered.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <div className="relative h-56 w-full overflow-hidden mb-5 bg-[#eeeae4]">
                <Image src={post.coverImage} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#1a1a1a]/45 mb-2 font-sans">{post.category}</p>
              <h2 className="font-serif text-2xl font-light text-[#1a1a1a] mb-3 leading-snug group-hover:opacity-60 transition">
                {post.title}
              </h2>
              <p className="text-sm text-[#1a1a1a]/60 leading-relaxed font-light line-clamp-3 mb-4">{post.excerpt}</p>
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#1a1a1a]/40">
                {post.date}
                {post.readTime ? ` · ${post.readTime}` : ''}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-[#1a1a1a]/50 py-16 text-sm tracking-[0.16em] uppercase">
          No articles match that search.
        </p>
      )}
    </div>
  )
}
