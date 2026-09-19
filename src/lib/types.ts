export type GalleryItem = {
  src: string
  alt: string
}

export type Category = {
  _id?: string
  title: string
  navLabel: string
  slug: string
  subtitle: string
  pageUrl?: string
  heroImage: string
  menuImage: string
  order: number
  showInNav: boolean
  gallery: GalleryItem[]
}

export type RelatedCategory = {
  title: string
  slug: string
}

export type Post = {
  _id?: string
  title: string
  slug: string
  excerpt: string
  coverImage: string
  category: string
  date: string
  publishedAt?: string
  readTime: string
  author: string
  content: string
  body?: unknown[]
  kicker?: string
  featured?: boolean
  featuredQuote?: string
  tags?: string[]
  seoTitle?: string
  seoDescription?: string
  relatedCategories?: RelatedCategory[]
}
