import type { Metadata } from 'next'
import './globals.css'

import WhatsAppChat from '@/components/WhatsAppChat';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import ScrollToTop from '@/components/ScrollToTop';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';
import { CategoriesProvider } from '@/components/CategoriesProvider';
import { getCategories } from '@/sanity/fetch';


export const metadata: Metadata = {
  metadataBase: new URL('https://myyspacefurniture.com'),
  title: {
    default: 'Myy Space Furniture - Quality Furniture for Every Room',
    template: '%s | Myy Space Furniture',
  },
  description:
    'Transform your space with Myy Space Furniture in Roseville, CA. Premium mattresses, sectionals, sofas, bedroom sets, dining furniture, vanities, bunk beds, and custom pieces for Sacramento and Northern California.',
  keywords: [
    'Myy Space Furniture',
    'Roseville furniture store',
    'Sacramento furniture',
    'custom furniture Roseville',
    'sectionals',
    'sofas and loveseats',
    'bedroom sets',
    'dining tables',
    'leather sectionals',
    'fabric sectionals',
    'mattresses Roseville',
    'vanities',
    'bunk beds',
    'furniture financing',
    'Northern California furniture',
  ],
  authors: [{ name: 'Myy Space Furniture' }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://myyspacefurniture.com',
    siteName: 'Myy Space Furniture',
    title: 'Myy Space Furniture - Quality Furniture for Every Room',
    description:
      'Premium furniture showroom in Roseville — mattresses, sofas, sectionals, bedroom and dining, plus custom builds.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Myy Space Furniture Roseville showroom',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Myy Space Furniture | Roseville, CA',
    description: 'Premium furniture and custom pieces for every room — Roseville showroom.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
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
        <link rel="icon" href="/favicon.svg?v=7" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico?v=7" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon.png?v=7" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=7" />
        <link rel="manifest" href="/manifest.json" />
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
              '@type': 'FurnitureStore',
              name: 'Myy Space Furniture',
              alternateName: 'MyySpace Furniture & Mattress',
              url: 'https://myyspacefurniture.com',
              logo: 'https://myyspacefurniture.com/logo.png',
              image: 'https://myyspacefurniture.com/og-image.jpg',
              description:
                'Premium furniture retailer in Roseville, CA offering mattresses, sofas, sectionals, bedroom sets, dining furniture, and custom pieces for Sacramento and Northern California.',
              telephone: '+1-916-661-1073',
              email: 'info@myyspacefurniture.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '1811 Douglas Blvd',
                addressLocality: 'Roseville',
                addressRegion: 'CA',
                postalCode: '95661',
                addressCountry: 'US',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 38.7465805,
                longitude: -121.2606694,
              },
              sameAs: [
                'https://www.facebook.com/Myyspacefurniture/',
                'https://www.instagram.com/myyspacefurniture/',
                'https://www.google.com/maps/place/MyySpace+Furniture+%26+Mattress/@38.7465805,-121.2606694,17z',
              ],
              keywords:
                'Roseville furniture, Sacramento furniture, custom furniture, sectionals, mattresses, bedroom sets, dining tables',
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
