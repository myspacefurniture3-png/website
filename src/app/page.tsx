'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GoogleReviews from '@/components/GoogleReviews'
import HomeHeroCinema from '@/components/HomeHeroCinema'
import HomeCollections from '@/components/HomeCollections'
import {
  PromoBanner,
  CustomFurnitureBanner,
  ServiceHighlights,
  ShowroomSection,
} from '@/components/HomePromoSections'

export default function Home() {
  return (
    <>
      <Header />
      <HomeHeroCinema />
      <PromoBanner />
      <main>
        <CustomFurnitureBanner />
        <HomeCollections />
        <ServiceHighlights />
        <GoogleReviews />
        <ShowroomSection />
      </main>
      <Footer />
    </>
  )
}
