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
  WhyChooseUs,
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
        <WhyChooseUs />
        <GoogleReviews />
        <ShowroomSection />
      </main>
      <Footer />
    </>
  )
}
