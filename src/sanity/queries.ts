export const categoriesQuery = `*[_type == "category" && showInNav != false] | order(order asc) {
  _id,
  title,
  navLabel,
  "slug": slug.current,
  subtitle,
  pageUrl,
  "heroImage": coalesce(heroImage.asset->url, heroImageUrl),
  "menuImage": coalesce(menuImage.asset->url, menuImageUrl),
  order,
  showInNav,
  "gallery": gallery[]{
    "src": coalesce(image.asset->url, localSrc),
    "alt": coalesce(alt, ^.title)
  }
}`

export const categoryBySlugQuery = `*[_type == "category" && slug.current == $slug][0] {
  _id,
  title,
  navLabel,
  "slug": slug.current,
  subtitle,
  pageUrl,
  "heroImage": coalesce(heroImage.asset->url, heroImageUrl),
  "menuImage": coalesce(menuImage.asset->url, menuImageUrl),
  order,
  showInNav,
  "gallery": gallery[]{
    "src": coalesce(image.asset->url, localSrc),
    "alt": coalesce(alt, ^.title)
  }
}`

export const postsQuery = `*[_type == "post" && published != false] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  kicker,
  featured,
  featuredQuote,
  tags,
  seoTitle,
  seoDescription,
  "coverImage": coalesce(coverImage.asset->url, coverImageUrl),
  category,
  publishedAt,
  readTime,
  author,
  "content": bodyHtml,
  body,
  "relatedCategories": relatedCategories[]->{
    title,
    "slug": slug.current
  }
}`

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug && published != false][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  kicker,
  featured,
  featuredQuote,
  tags,
  seoTitle,
  seoDescription,
  "coverImage": coalesce(coverImage.asset->url, coverImageUrl),
  category,
  publishedAt,
  readTime,
  author,
  "content": bodyHtml,
  body,
  "relatedCategories": relatedCategories[]->{
    title,
    "slug": slug.current
  }
}`
