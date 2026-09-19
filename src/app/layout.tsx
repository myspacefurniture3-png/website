import type { Metadata } from 'next'
import './globals.css'

import WhatsAppChat from '@/components/WhatsAppChat';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import ScrollToTop from '@/components/ScrollToTop';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';
import { CategoriesProvider } from '@/components/CategoriesProvider';
import { getCategories } from '@/sanity/fetch';


export const metadata: Metadata = {
  title: 'Myy Space Furniture - Quality Furniture for Every Room',
  description: 'Transform your space with Myy Space Furniture. Explore premium mattresses, sectionals, sofas, bedroom sets, dining room furniture, and custom furniture solutions.',
  keywords: 'furniture, mattresses, sofas, sectionals, bedroom sets, dining room, custom furniture, home decor',
  authors: [{ name: 'Myy Space Furniture' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://myyspacefurniture.com',
    siteName: 'Myy Space Furniture',
    title: 'Myy Space Furniture - Quality Furniture for Every Room',
    description: 'Transform your space with premium furniture including mattresses, sofas, sectionals, and custom options.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Myy Space Furniture',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Myy Space Furniture',
    description: 'Premium furniture solutions for every room',
    images: ['/og-image.jpg'],
  },
  robots: 'index, follow',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const revalidate = 60

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const categories = await getCategories()

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg?v=3" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico?v=3" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon.png?v=3" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=3" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href="https://myyspacefurniture.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Jost:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#f8f6f3" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Myy Space Furniture" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Myy Space Furniture',
              url: 'https://myyspacefurniture.com',
              logo: 'https://myyspacefurniture.com/logo.png',
              description: 'Premium furniture retailer offering mattresses, sofas, sectionals, bedroom sets, and custom furniture solutions.',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'US',
              },
            }),
          }}
        />
      </head>
      <body className="bg-[#f8f6f3] text-[#1a1a1a] font-sans font-light antialiased">
        <CategoriesProvider categories={categories}>
          <GoogleAnalytics />
          <PWAInstallPrompt />
          {children}
          <WhatsAppChat />
          <ScrollToTop />
        </CategoriesProvider>
      </body>
    </html>
  )
}
