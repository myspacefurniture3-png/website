import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Sanity Studio | Myy Space Furniture',
  robots: 'noindex',
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children
}
