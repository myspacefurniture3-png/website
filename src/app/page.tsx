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
import { useCategories } from '@/components/CategoriesProvider'

export default function Home() {
  const categories = useCategories()

  return (
    <>
      <Header />
      <HomeHeroCinema />
      <PromoBanner />
      <main>
        <HomeCollections categories={categories} />
        <CustomFurnitureBanner />
        <ServiceHighlights />
        <GoogleReviews />
        <ShowroomSection />
      </main>
      <Footer />
    </>
  )
}
