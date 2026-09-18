'use client'

import { createContext, useContext } from 'react'
import type { Category } from '@/lib/types'
import { FALLBACK_CATEGORIES } from '@/lib/fallbackCategories'

const CategoriesContext = createContext<Category[]>(FALLBACK_CATEGORIES)

export function CategoriesProvider({
  categories,
  children,
}: {
  categories: Category[]
  children: React.ReactNode
}) {
  return (
    <CategoriesContext.Provider value={categories.length ? categories : FALLBACK_CATEGORIES}>
      {children}
    </CategoriesContext.Provider>
  )
}

export function useCategories() {
  return useContext(CategoriesContext)
}
